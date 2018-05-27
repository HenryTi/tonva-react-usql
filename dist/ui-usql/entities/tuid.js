var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { observable } from 'mobx';
import * as _ from 'lodash';
import { Entity } from './entity';
const maxCacheSize = 1000;
export class Tuid extends Entity {
    constructor() {
        super(...arguments);
        this.queue = []; // 每次使用，都排到队头
        this.waitingIds = []; // 等待loading的
        this.cache = observable.map({}, { deep: false }); // 已经缓冲的
        this.all = undefined;
    }
    moveToHead(id) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }
    buidProxies(parts) {
        let len = parts.length;
        if (len <= 2)
            return;
        this.proxies = {};
        for (let i = 2; i < len; i++)
            this.proxies[parts[i]] = null;
    }
    setProxies(entities) {
        if (this.proxies === undefined)
            return;
        for (let i in this.proxies)
            this.proxies[i] = entities.getTuid(i, undefined);
    }
    getId(id) {
        return this.cache.get(String(id));
    }
    resetCache(id) {
        this.cache.delete(String(id));
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.useId(id);
    }
    useId(id, defer) {
        let key = String(id);
        if (this.cache.has(key) === true) {
            this.moveToHead(id);
            return;
        }
        this.entities.cacheTuids(defer === true ? 100 : 20);
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
    proxied(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let proxyTuid = this.entities.getTuid(name, undefined);
            proxyTuid.useId(id);
            let proxied = yield this.tvApi.proxied(this.name, name, id);
            this.cacheValue(proxied);
            return proxied;
        });
    }
    cacheValue(val) {
        if (val === undefined)
            return false;
        let id = val.id;
        if (id === undefined)
            return false;
        let index = this.waitingIds.findIndex(v => v === id);
        if (index >= 0)
            this.waitingIds.splice(index, 1);
        this.cache.set(String(id), val);
        return true;
    }
    cacheIds() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.waitingIds.length === 0)
                return;
            let tuids = yield this.tvApi.tuidIds(this.name, this.waitingIds);
            for (let tuid of tuids) {
                if (this.cacheValue(tuid) === false)
                    continue;
                if (this.proxies !== undefined) {
                    let { type, $proxy } = tuid;
                    let pTuid = this.proxies[type];
                    pTuid.useId($proxy);
                }
            }
        });
    }
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined || id === 0)
                return;
            return yield this.tvApi.tuidGet(this.name, id);
        });
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.all = yield this.tvApi.tuidGetAll(this.name);
        });
    }
    save(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = _.clone(props);
            params["$id"] = id;
            return yield this.tvApi.tuidSave(this.name, params);
        });
    }
    search(key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tvApi.tuidSearch(this.name, key, pageStart, pageSize);
            return ret;
        });
    }
    slaveSave(slave, first, masterId, id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = _.clone(props);
            params["$master"] = masterId;
            params["$first"] = first;
            params["$id"] = id;
            return yield this.tvApi.tuidSlaveSave(this.name, slave, params);
        });
    }
    slaves(slave, masterId, order, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tvApi.tuidSlaves(this.name, slave, masterId, order, pageSize);
        });
    }
    // cache放到Tuid里面之后，这个函数不再需要公开调用了
    ids(idArr) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tvApi.tuidIds(this.name, idArr);
        });
    }
}
__decorate([
    observable
], Tuid.prototype, "all", void 0);
//# sourceMappingURL=tuid.js.map