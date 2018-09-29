import * as React from 'react';
import {observable} from 'mobx';
import _ from 'lodash';
import { Entity } from './entity';
import { Entities, Field, ArrFields } from './entities';
import { isNumber } from 'util';

export class IdBox {
    id: number;
    obj?: any;
    content: (templet?:React.StatelessComponent<any>)=>JSX.Element;
    valueFromFieldName: (fieldName:string)=>IdBox;
}

const maxCacheSize = 1000;
export abstract class Tuid extends Entity {
    private idCreater: ()=>void;
    get typeName(): string { return 'tuid';}
    private queue: number[] = [];               // 每次使用，都排到队头
    private waitingIds: number[] = [];          // 等待loading的
    private cache = observable.map({}, {deep: false});    // 已经缓冲的
    idName: string;
    owner: TuidMain;                    // 用这个值来区分是不是TuidArr
    unique: string[];

    constructor(entities:Entities, name:string, typeId:number) {
        super(entities, name, typeId);
        this.buildIdCreater();
    }

    abstract get Main();

    private buildIdCreater() {
        this.idCreater = function():void {};
        let prototype = this.idCreater.prototype;
        Object.defineProperty(prototype, '_$tuid', {
            value: this,
            writable: false,
            enumerable: false,
        });
        prototype.content = function(templet?:React.StatelessComponent<any>) {
            let t:Tuid = this._$tuid;
            let com = templet || t.entities.usq.getTuidContent(t);
            let val = t.valueFromId(this.id);
            if (typeof val === 'number') val = {id: val};
            return React.createElement(com, val);
        }
        Object.defineProperty(prototype, 'obj', {
            enumerable: false,
            get: function() {
                return this._$tuid.valueFromId(this.id);
            }
        });
        prototype.valueFromFieldName = function(fieldName:string):IdBox {
            let t:Tuid = this._$tuid;
            return t.valueFromFieldName(fieldName, this.obj);
        };
        prototype.toJSON = function() {return this.id}
    }
    createID(id:number):IdBox {
        let ret:IdBox = new this.idCreater();
        ret.id = id;
        return ret;
    }

    getIdFromObj(item:any):number {
        return item[this.idName];
    }

    setSchema(schema:any) {
        super.setSchema(schema);
        let {id, unique} = schema;
        this.idName = id;
        this.unique = unique;
    }

    private moveToHead(id:number) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }

    valueFromId(id:number):any {
        let v = this.cache.get(id);
        if (this.owner !== undefined && typeof v === 'object') {
            v.$owner = this.owner.createID(v.owner); // this.owner.valueFromId(v.owner);
        }
        return v;
    }
    valueFromFieldName(fieldName:string, obj:any):IdBox {
        if (obj === undefined) return;
        let f = this.fields.find(v => v.name === fieldName);
        if (f === undefined) return;
        let v = obj[fieldName];
        let {_tuid} = f;
        if (_tuid === undefined) return v;
        let id = typeof v === 'object'? v.id : v;
        return _tuid.valueFromId(id);
    }
    resetCache(id:number) {
        this.cache.delete(id);
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.useId(id);
    }
    useId(id:number, defer?:boolean) {
        if (id === undefined || id === 0) return;
        if (isNumber(id) === false) return;
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        this.entities.cacheTuids(defer===true?70:20);
        //let idVal = this.createID(id);
        this.cache.set(id, id);
        if (this.waitingIds.findIndex(v => v === id) >= 0) {
            this.moveToHead(id);
            return;
        }

        // 如果没有缓冲, 或者没有waiting
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            let r = this.queue.shift();
            if (r === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r);
                return;
            }

            //let rKey = String(r);
            if (this.cache.has(r) === true) {
                // 如果移除r已经缓存
                this.cache.delete(r);
            }
            else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex(v => v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
        return;
    }
    async proxied(name:string, id:number):Promise<any> {
        let proxyTuid = this.entities.getTuid(name, undefined);
        proxyTuid.useId(id);
        let proxied = await this.tvApi.proxied(this.name, name, id);
        this.cacheValue(proxied);
        return proxied;
    }
    cacheValue(val:any):boolean {
        if (val === undefined) return false;
        let id = this.getIdFromObj(val);
        if (id === undefined) return false;
        let index = this.waitingIds.findIndex(v => v === id);
        if (index>=0) this.waitingIds.splice(index, 1);
        //let cacheVal = this.createID(id, val);
        this.cache.set(id, val);
        // 下面的代码应该是cache proxy id, 需要的时候再写吧
        /*
        let {tuids, fields} = this.schema;
        if (tuids !== undefined && fields !== undefined) {
            for (let f of fields) {
                let {name, tuid} = f;
                if (tuid === undefined) continue;
                let t = this.entities.tuid(tuid);
                if (t === undefined) continue;
                t.useId(val[name]);
            }
        }*/
        return true;
    }
    protected afterCacheId(tuidValue:any) {
        for (let f of this.fields) {
            let {_tuid} = f;
            if (_tuid === undefined) continue;
            _tuid.useId(tuidValue[f.name]);
        }
    }
    async cacheIds():Promise<void> {
        if (this.waitingIds.length === 0) return;
        let name:string, arr:string;
        if (this.owner === undefined) {
            name = this.name;
        }
        else {
            name = this.owner.name;
            arr = this.name;
        }
        let tuids = await this.tvApi.tuidIds(name, arr, this.waitingIds);
        for (let tuidValue of tuids) {
            if (this.cacheValue(tuidValue) === false) continue;
            this.cacheTuidFieldValues(tuidValue);
            this.afterCacheId(tuidValue);
        }
    }
    async load(id:number):Promise<any> {
        if (id === undefined || id === 0) return;
        let values = await this.tvApi.tuidGet(this.name, id);
        this.cacheValue(values);
        this.cacheTuidFieldValues(values);
        return values;
    }
    private cacheTuidFieldValues(values:any) {
        let {fields, arrs} = this.schema;
        this.cacheFieldsInValue(values, fields);
        if (arrs !== undefined) {
            for (let arr of arrs as ArrFields[]) {
                let {name, fields} = arr;
                let arrValues = values[name];
                if (arrValues === undefined) continue;
                for (let row of arrValues) {
                    row.$owner = this.createID(row.owner); 
                    this.cacheFieldsInValue(row, fields);
                }
            }
        }
    }
    private cacheFieldsInValue(values:any, fields:Field[]) {
        for (let f of fields as Field[]) {
            let {name, _tuid} = f;
            if (_tuid === undefined) continue;
            let id = values[name];
            _tuid.useId(id);
            values[name] = _tuid.createID(id);
        }
    }
    async save(id:number, props:any) {
        let params = _.clone(props);
        params["$id"] = id;
        return await this.tvApi.tuidSave(this.name, params);
    }
    async search(key:string, pageStart:string|number, pageSize:number):Promise<any> {
        let ret:any[] = await this.searchArr(undefined, key, pageStart, pageSize);
        return ret;
    }
    async searchArr(owner:number, key:string, pageStart:string|number, pageSize:number):Promise<any> {
        let {fields} = this.schema;
        let name:string, arr:string;
        if (this.owner !== undefined) {
            name = this.owner.name;
            arr = this.name;
        }
        else {
            name = this.name;
            arr = undefined;
        }
        let ret = await this.tvApi.tuidSearch(name, arr, owner, key, pageStart, pageSize);
        for (let row of ret) {
            this.cacheFieldsInValue(row, fields);
            if (this.owner !== undefined) row.$owner = this.owner.createID(row.owner);
        }
        return ret;
    }
    async loadArr(arr:string, owner:number, id:number):Promise<any> {
        if (id === undefined || id === 0) return;
        return await this.tvApi.tuidArrGet(this.name, arr, owner, id);
    }
    /*
    async loadArrAll(owner:number):Promise<any[]> {
        return this.all = await this.tvApi.tuidGetAll(this.name);
    }*/
    async saveArr(arr:string, owner:number, id:number, props:any) {
        let params = _.clone(props);
        params["$id"] = id;
        return await this.tvApi.tuidArrSave(this.name, arr, owner, params);
    }
    async posArr(arr:string, owner:number, id:number, order:number) {
        return await this.tvApi.tuidArrPos(this.name, arr, owner, id, order);
    }
    
    // cache放到Tuid里面之后，这个函数不再需要公开调用了
    //private async ids(idArr:number[]) {
    //    return await this.tvApi.tuidIds(this.name, idArr);
    //}
    async showInfo(id:number) {
        await this.entities.usq.showTuid(this, id);
    }
}

export class TuidMain extends Tuid {
    get Main() {return this}

    divs: {[name:string]: TuidDiv};
    proxies: {[name:string]: TuidMain};

    public setSchema(schema:any) {
        super.setSchema(schema);
        let {arrs} = schema;
        if (arrs !== undefined) {
            this.divs = {};
            for (let arr of arrs) {
                let {name} = arr;
                let tuidDiv = new TuidDiv(this.entities, name, this.typeId);
                tuidDiv.owner = this;
                this.divs[name] = tuidDiv;
                tuidDiv.setSchema(arr);
            }
        }
    }

    async cacheIds():Promise<void> {
        await super.cacheIds();
        if (this.divs === undefined) return;
        for (let i in this.divs) {
            await this.divs[i].cacheIds();
        }
    }

    /*
    buidProxies(parts:string[]) {
        let len = parts.length;
        if (len <= 2) return;
        this.proxies = {};
        for (let i=2;i<len;i++) this.proxies[parts[i]] = null;
    }
    setProxies(entities:Entities) {
        if (this.proxies === undefined) return;
        for (let i in this.proxies) this.proxies[i] = entities.getTuid(i) as Tuid;
    }
    */
    protected afterCacheId(tuidValue:any) {
        super.afterCacheId(tuidValue);
        if (this.proxies === undefined) return;
        let {type, $proxy} = tuidValue;
        let pTuid = this.proxies[type];
        pTuid.useId($proxy);
    }
}

export class TuidDiv extends Tuid {
    get Main() {return this.owner}
}
