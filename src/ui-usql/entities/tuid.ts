import {observable} from 'mobx';
import * as _ from 'lodash';
import {Entity} from './entity';
import {Entities} from './entities';
import { debug, isNumber } from 'util';
import { Book } from './book';
import { Query } from './query';
import { Action } from './action';

const maxCacheSize = 1000;
export class Tuid extends Entity {
    private queue: number[] = [];               // 每次使用，都排到队头
    private waitingIds: number[] = [];          // 等待loading的
    private cache = observable.map({}, {deep: false});    // 已经缓冲的
    @observable all:any[] = undefined;
    proxies: {[name:string]: Tuid};    
    slaves:{[name:string]:Slave};

    public setSchema(schema:any) {
        super.setSchema(schema);
        let {slaves} = schema;
        if (slaves === undefined) return;
        this.slaves = {};
        for (let i in slaves) {
            let slave = slaves[i];
            this.slaves[i] = this.buildSlave(slave);
        }
    }

    private buildSlave(slave:any):Slave {
        let {tuid, book, page, pageSlave, all, add, del} = slave;
        let tuidTuid:Tuid = this.entities.tuid(tuid.name);
        tuidTuid.setSchema(tuid);
        let bookBook:Book = this.entities.book(book.name);
        bookBook.setSchema(book);
        let pageQuery:Query = this.entities.query(page.name);
        pageQuery.setSchema(page);
        let pageSlaveQuery:Query = this.entities.query(pageSlave.name);
        pageSlaveQuery.setSchema(pageSlave);
        let allQuery:Query = this.entities.query(all.name);
        allQuery.setSchema(all);
        let addAction:Action = this.entities.action(add.name);
        addAction.setSchema(add);
        let delAction:Action = this.entities.action(del.name);
        delAction.setSchema(del);
        return {
            tuid: tuidTuid,
            book: bookBook,
            page: pageQuery,
            pageSlave: pageSlaveQuery,
            all: allQuery,
            add: addAction,
            del: delAction,
        };
    }

    private moveToHead(id:number) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }
    setItemObservable() {
        this.cache = observable.map({}, {deep: true});
    }
    buidProxies(parts:string[]) {
        let len = parts.length;
        if (len <= 2) return;
        this.proxies = {};
        for (let i=2;i<len;i++) this.proxies[parts[i]] = null;
    }
    setProxies(entities:Entities) {
        if (this.proxies === undefined) return;
        for (let i in this.proxies) this.proxies[i] = entities.getTuid(i, undefined);
    }
    getId(id:number):any {
        return this.cache.get(String(id));
    }
    resetCache(id:number) {
        this.cache.delete(String(id));
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.useId(id);
    }
    cacheItem(id:number, item:any) {
        this.cache.set(String(id), item);
    }
    useId(id:number, defer?:boolean):void {
        if (isNumber(id) === false) return;
        let key = String(id);
        if (this.cache.has(key) === true) {
            this.moveToHead(id);
            return;
        }
        this.entities.cacheTuids(defer===true?70:20);
        this.cache.set(key, id);
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

            let rKey = String(r);
            if (this.cache.has(rKey) === true) {
                // 如果移除r已经缓存
                this.cache.delete(rKey);
            }
            else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex(v => v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
    }
    async proxied(name:string, id:number):Promise<any> {
        let proxyTuid = this.entities.getTuid(name, undefined);
        proxyTuid.useId(id);
        let proxied = await this.tvApi.proxied(this.name, name, id);
        this.cacheValue(proxied);
        return proxied;
    }
    private cacheValue(val:any):boolean {
        if (val === undefined) return false;
        let id = val.id;
        if (id === undefined) return false;
        let index = this.waitingIds.findIndex(v => v === id);
        if (index>=0) this.waitingIds.splice(index, 1);
        this.cache.set(String(id), val);
        let {tuids, fields} = this.schema;
        if (tuids !== undefined && fields !== undefined) {
            for (let f of fields) {
                let {name, tuid} = f;
                if (tuid === undefined) continue;
                let t = this.entities.tuid(tuid);
                if (t === undefined) continue;
                t.useId(val[name]);
            }
        }
        return true;
    }
    async cacheIds():Promise<void> {
        if (this.waitingIds.length === 0) return;
        await this.loadSchema();
        let tuids = await this.tvApi.tuidIds(this.name, this.waitingIds);
        for (let tuid of tuids) {
            if (this.cacheValue(tuid) === false) continue;
            if (this.proxies !== undefined) {
                let {type, $proxy} = tuid;
                let pTuid = this.proxies[type];
                pTuid.useId($proxy);
            }
        }
    }
    async load(id:number):Promise<any> {
        if (id === undefined || id === 0) return;
        return await this.tvApi.tuidGet(this.name, id);
    }
    async loadAll():Promise<any[]> {
        return this.all = await this.tvApi.tuidGetAll(this.name);
    }
    async save(id:number, props:any) {
        let params = _.clone(props);
        params["$id"] = id;
        return await this.tvApi.tuidSave(this.name, params);
    }
    async search(key:string, pageStart:string|number, pageSize:number):Promise<any> {
        let ret = await this.tvApi.tuidSearch(this.name, key, pageStart, pageSize);
        return ret;
    }
    async loadArr(arr:string, owner:number, id:number):Promise<any> {
        if (id === undefined || id === 0) return;
        return await this.tvApi.tuidArrGet(this.name, arr, owner, id);
    }
    async loadArrAll(owner:number):Promise<any[]> {
        return this.all = await this.tvApi.tuidGetAll(this.name);
    }
    async saveArr(arr:string, owner:number, id:number, props:any) {
        let params = _.clone(props);
        params["$id"] = id;
        return await this.tvApi.tuidArrSave(this.name, arr, owner, params);
    }
    async posArr(arr:string, owner:number, id:number, order:number) {
        return await this.tvApi.tuidArrPos(this.name, arr, owner, id, order);
    }
    async bindSlaveSave(slave:string, first:number, masterId:number, id:number, props:any) {
        let params = _.clone(props);
        params["$master"] = masterId;
        params["$first"] = first;
        params["$id"] = id;
        return await this.tvApi.tuidBindSlaveSave(this.name, slave, params);
    }
    async bindSlaves(slave:string, masterId:number, order:number, pageSize):Promise<any[]> {
        return await this.tvApi.tuidBindSlaves(this.name, slave, masterId, order, pageSize);
    }
    
    // cache放到Tuid里面之后，这个函数不再需要公开调用了
    private async ids(idArr:number[]) {
        return await this.tvApi.tuidIds(this.name, idArr);
    }
}

export interface Slave {
    tuid: Tuid,
    book: Book;
    page: Query;
    pageSlave: Query;
    all: Query;
    add: Action;
    del: Action;
}
