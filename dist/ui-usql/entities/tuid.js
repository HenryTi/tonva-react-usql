import * as React from 'react';
import { observable } from 'mobx';
import _ from 'lodash';
import { Entity } from './entity';
import { isNumber } from 'util';
export class BoxId {
}
const maxCacheSize = 1000;
export class Tuid extends Entity {
    constructor(entities, name, typeId) {
        super(entities, name, typeId);
        this.queue = []; // 每次使用，都排到队头
        this.waitingIds = []; // 等待loading的
        this.cache = observable.map({}, { deep: false }); // 已经缓冲的
        this.buildIdBoxer();
    }
    get typeName() { return 'tuid'; }
    buildIdBoxer() {
        this.idBoxer = function () { };
        let prototype = this.idBoxer.prototype;
        Object.defineProperty(prototype, '_$tuid', {
            value: this,
            writable: false,
            enumerable: false,
        });
        prototype.content = function (templet, x) {
            let t = this._$tuid;
            let com = templet || t.entities.usq.getTuidContent(t);
            let val = t.valueFromId(this.id);
            if (typeof val === 'number')
                val = { id: val };
            if (templet !== undefined)
                return templet(val, x);
            //return com(val, x);
            return React.createElement(com, val);
        };
        Object.defineProperty(prototype, 'obj', {
            enumerable: false,
            get: function () {
                if (this.id === undefined || this.id <= 0)
                    return undefined;
                return this._$tuid.valueFromId(this.id);
            }
        });
        prototype.valueFromFieldName = function (fieldName) {
            let t = this._$tuid;
            return t.valueFromFieldName(fieldName, this.obj);
        };
        prototype.toJSON = function () { return this.id; };
    }
    boxId(id) {
        let ret = new this.idBoxer();
        ret.id = id;
        return ret;
    }
    getIdFromObj(item) {
        return item[this.idName];
    }
    setSchema(schema) {
        super.setSchema(schema);
        let { id, unique } = schema;
        this.idName = id;
        this.unique = unique;
    }
    moveToHead(id) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }
    valueFromId(id) {
        let v = this.cache.get(id);
        if (this.owner !== undefined && typeof v === 'object') {
            v.$owner = this.owner.boxId(v.owner); // this.owner.valueFromId(v.owner);
        }
        return v;
    }
    valueFromFieldName(fieldName, obj) {
        if (obj === undefined)
            return;
        let f = this.fields.find(v => v.name === fieldName);
        if (f === undefined)
            return;
        let v = obj[fieldName];
        let { _tuid } = f;
        if (_tuid === undefined)
            return v;
        let id = typeof v === 'object' ? v.id : v;
        return _tuid.valueFromId(id);
    }
    resetCache(id) {
        this.cache.delete(id);
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.useId(id);
    }
    useId(id, defer) {
        if (id === undefined || id === 0)
            return;
        if (isNumber(id) === false)
            return;
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        this.entities.cacheTuids(defer === true ? 70 : 20);
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
    async proxied(name, id) {
        let proxyTuid = this.entities.getTuid(name, undefined);
        proxyTuid.useId(id);
        let proxied = await this.tvApi.proxied(this.name, name, id);
        this.cacheValue(proxied);
        return proxied;
    }
    cacheValue(val) {
        if (val === undefined)
            return false;
        let id = this.getIdFromObj(val);
        if (id === undefined)
            return false;
        let index = this.waitingIds.findIndex(v => v === id);
        if (index >= 0)
            this.waitingIds.splice(index, 1);
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
    afterCacheId(tuidValue) {
        for (let f of this.fields) {
            let { _tuid } = f;
            if (_tuid === undefined)
                continue;
            _tuid.useId(tuidValue[f.name]);
        }
    }
    async cacheIds() {
        if (this.waitingIds.length === 0)
            return;
        let name, arr;
        if (this.owner === undefined) {
            name = this.name;
        }
        else {
            name = this.owner.name;
            arr = this.name;
        }
        let tuids = await this.tvApi.tuidIds(name, arr, this.waitingIds);
        for (let tuidValue of tuids) {
            if (this.cacheValue(tuidValue) === false)
                continue;
            this.cacheTuidFieldValues(tuidValue);
            this.afterCacheId(tuidValue);
        }
    }
    async load(id) {
        if (id === undefined || id === 0)
            return;
        let values = await this.tvApi.tuidGet(this.name, id);
        this.cacheValue(values);
        this.cacheTuidFieldValues(values);
        return values;
    }
    cacheTuidFieldValues(values) {
        let { fields, arrs } = this.schema;
        this.cacheFieldsInValue(values, fields);
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let { name, fields } = arr;
                let arrValues = values[name];
                if (arrValues === undefined)
                    continue;
                for (let row of arrValues) {
                    row.$owner = this.boxId(row.owner);
                    this.cacheFieldsInValue(row, fields);
                }
            }
        }
    }
    cacheFieldsInValue(values, fields) {
        for (let f of fields) {
            let { name, _tuid } = f;
            if (_tuid === undefined)
                continue;
            let id = values[name];
            _tuid.useId(id);
            values[name] = _tuid.boxId(id);
        }
    }
    async save(id, props) {
        let params = _.clone(props);
        params["$id"] = id;
        return await this.tvApi.tuidSave(this.name, params);
    }
    async search(key, pageStart, pageSize) {
        let ret = await this.searchArr(undefined, key, pageStart, pageSize);
        return ret;
    }
    async searchArr(owner, key, pageStart, pageSize) {
        let { fields } = this.schema;
        let name, arr;
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
            if (this.owner !== undefined)
                row.$owner = this.owner.boxId(row.owner);
        }
        return ret;
    }
    async loadArr(arr, owner, id) {
        if (id === undefined || id === 0)
            return;
        return await this.tvApi.tuidArrGet(this.name, arr, owner, id);
    }
    /*
    async loadArrAll(owner:number):Promise<any[]> {
        return this.all = await this.tvApi.tuidGetAll(this.name);
    }*/
    async saveArr(arr, owner, id, props) {
        let params = _.clone(props);
        params["$id"] = id;
        return await this.tvApi.tuidArrSave(this.name, arr, owner, params);
    }
    async posArr(arr, owner, id, order) {
        return await this.tvApi.tuidArrPos(this.name, arr, owner, id, order);
    }
    // cache放到Tuid里面之后，这个函数不再需要公开调用了
    //private async ids(idArr:number[]) {
    //    return await this.tvApi.tuidIds(this.name, idArr);
    //}
    async showInfo(id) {
        await this.entities.usq.showTuid(this, id);
    }
}
export class TuidMain extends Tuid {
    get Main() { return this; }
    setSchema(schema) {
        super.setSchema(schema);
        let { arrs } = schema;
        if (arrs !== undefined) {
            this.divs = {};
            for (let arr of arrs) {
                let { name } = arr;
                let tuidDiv = new TuidDiv(this.entities, name, this.typeId);
                tuidDiv.owner = this;
                this.divs[name] = tuidDiv;
                tuidDiv.setSchema(arr);
            }
        }
    }
    async cacheIds() {
        await super.cacheIds();
        if (this.divs === undefined)
            return;
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
    afterCacheId(tuidValue) {
        super.afterCacheId(tuidValue);
        if (this.proxies === undefined)
            return;
        let { type, $proxy } = tuidValue;
        let pTuid = this.proxies[type];
        pTuid.useId($proxy);
    }
}
export class TuidDiv extends Tuid {
    get Main() { return this.owner; }
}
//# sourceMappingURL=tuid.js.map