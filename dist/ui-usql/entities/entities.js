var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsqlApi } from './usqlApi';
import { Tuid } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { WSChannel } from 'tonva-tools';
const tab = '\t';
const ln = '\n';
// api: apiOwner/apiName
// access: acc1; acc2
const entitiesCollection = {};
export class Entities {
    // api: apiOwner/apiName
    // access: acc1;acc2 or *
    //constructor(api:string, access:string) {
    constructor(url, ws, token, api, access) {
        this.tuids = {};
        this.actions = {};
        this.sheets = {};
        this.queries = {};
        this.books = {};
        this.histories = {};
        this.tuidArr = [];
        this.actionArr = [];
        this.sheetArr = [];
        this.queryArr = [];
        this.bookArr = [];
        this.historyArr = [];
        entitiesCollection[api] = this;
        //this.token = token;
        if (ws !== undefined)
            this.ws = new WSChannel(ws, token);
        this.loadIds = this.loadIds.bind(this);
        let acc;
        if (access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(v => v.trim()).filter(v => v.length > 0);
        }
        let apiOwner, apiName;
        let p = api.split('/');
        switch (p.length) {
            case 1:
                apiOwner = '$$$';
                apiName = p[0];
                break;
            case 2:
                apiOwner = p[0];
                apiName = p[1];
                break;
            default:
                console.log('api must be apiOwner/apiName format');
                return;
        }
        this.tvApi = new UsqlApi(p[0], p[1], url, acc);
    }
    //async loadEntites(api:string, access:string) {
    loadEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ws !== undefined)
                this.ws.connect();
            /*
            let p = api.split('/');
            if (p.length !== 2) {
                console.log('api must be apiOwner/apiName format');
                return;
            }
            let acc = access === undefined? ['*'] : access.split(';').map(v=>v.trim());
            if (acc.length === 1 && acc[0] === '*') acc = [];
            let tvApi = new UsqlApi(p[0], p[1], acc);
            */
            let accesses = yield this.tvApi.loadAccess();
            this.buildAccess(this.tvApi, accesses);
            //let apis = this.apis[api];
            //if (apis === undefined) {
            //    apis = this.apis[api] = {};
            //}
            //apis[access] = tvApi;
        });
    }
    close() {
        if (this.ws !== undefined)
            this.ws.close();
    }
    wsConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ws.connect();
        });
    }
    onWsReceive(type, onWsReceive) {
        if (this.ws === undefined)
            return 0;
        return this.ws.onWsReceive(type, onWsReceive);
    }
    onWsReceiveAny(onWsReceive) {
        if (this.ws === undefined)
            return 0;
        return this.ws.onWsReceiveAny(onWsReceive);
    }
    endWsReceive(handlerId) {
        if (this.ws !== undefined)
            this.ws.endWsReceive(handlerId);
    }
    getTuid(name, tuidUrl) { return this.tuids[name]; }
    cacheTuids() {
        this.clearCacheTimer();
        this.cacheTimer = setTimeout(this.loadIds, 100);
    }
    clearCacheTimer() {
        if (this.cacheTimer === undefined)
            return;
        clearTimeout(this.cacheTimer);
        this.cacheTimer = undefined;
    }
    loadIds() {
        this.clearCacheTimer();
        for (let i in this.tuids) {
            let tuid = this.tuids[i];
            tuid.cacheIds();
        }
    }
    // load access
    /*
    async loadAccess():Promise<boolean> {
        let ret = await this.tvApi.loadAccess();
        this.buildAccess(this.tvApi, ret);
        return true;
    }*/
    buildAccess(api, access) {
        for (let a in access) {
            let v = access[a];
            switch (typeof v) {
                case 'string':
                    this.fromType(api, a, v);
                    break;
                case 'object':
                    this.fromObj(api, a, v);
                    break;
            }
        }
    }
    fromType(api, name, type) {
        let parts = type.split('|');
        type = parts[0];
        let id = Number(parts[1]);
        switch (type) {
            case 'action':
                let action = this.actions[name];
                if (action === undefined) {
                    this.actionArr.push(this.actions[name] = new Action(this, api, name, id));
                }
                break;
            case 'tuid':
                let tuid = this.tuids[name];
                if (tuid === undefined) {
                    this.tuidArr.push(this.tuids[name] = new Tuid(this, api, name, id));
                }
                break;
            case 'query':
                let query = this.queries[name];
                if (query === undefined) {
                    this.queryArr.push(this.queries[name] = new Query(this, api, name, id));
                }
                break;
            case 'book':
                let book = this.books[name];
                if (book === undefined) {
                    this.bookArr.push(this.books[name] = new Book(this, api, name, id));
                }
                break;
            case 'history':
                let history = this.histories[name];
                if (history === undefined) {
                    this.historyArr.push(this.histories[name] = new History(this, api, name, id));
                }
                break;
        }
    }
    fromObj(api, name, obj) {
        switch (obj['$']) {
            case 'sheet':
                this.buildSheet(api, name, obj);
                break;
        }
    }
    buildSheet(api, name, obj) {
        let sheet = this.sheets[name];
        if (sheet === undefined) {
            this.sheetArr.push(sheet = this.sheets[name] = new Sheet(this, api, name, obj.id));
        }
        let states = sheet.states;
        for (let p in obj) {
            switch (p) {
                case '#':
                case '$': continue;
                default:
                    states.push(this.createSheetState(p, obj[p]));
                    break;
            }
        }
    }
    createSheetState(name, obj) {
        let ret = { name: name, actions: [] };
        let actions = ret.actions;
        for (let p in obj) {
            let action = { name: p };
            actions.push(action);
        }
        return ret;
    }
    pack(schema, data) {
        let ret = [];
        if (schema === undefined || data === undefined)
            return;
        let fields = schema.fields;
        if (fields !== undefined)
            this.packRow(ret, schema.fields, data);
        let arrs = schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                this.packArr(ret, arr.fields, data[arr.name]);
            }
        }
        return ret.join('');
    }
    escape(d) {
        switch (typeof d) {
            default: return d;
            case 'string':
                let len = d.length;
                let r = '', p = 0;
                for (let i = 0; i < len; i++) {
                    let c = d.charCodeAt(i);
                    switch (c) {
                        case 9:
                            r += d.substring(p, i) + '\\t';
                            p = i + 1;
                            break;
                        case 10:
                            r += d.substring(p, i) + '\\n';
                            p = i + 1;
                            break;
                    }
                }
                return r + d.substring(p);
            case 'undefined': return '';
        }
    }
    packRow(result, fields, data) {
        let ret = '';
        let len = fields.length;
        ret += this.escape(data[fields[0].name]);
        for (let i = 1; i < len; i++) {
            let f = fields[i];
            ret += tab + this.escape(data[f.name]);
        }
        result.push(ret + ln);
    }
    packArr(result, fields, data) {
        if (data !== undefined) {
            for (let row of data) {
                this.packRow(result, fields, row);
            }
        }
        result.push(ln);
    }
    unpackSheet(schema, data) {
        let ret = {};
        if (schema === undefined || data === undefined)
            return;
        let fields = schema.fields;
        let p = 0;
        if (fields !== undefined)
            p = this.unpackRow(ret, schema.fields, data, p);
        let arrs = schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    unpackReturns(schema, data) {
        let ret = {};
        if (schema === undefined || data === undefined)
            return;
        //let fields = schema.fields;
        let p = 0;
        //if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
        let arrs = schema['returns'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    unpackRow(ret, fields, data, p) {
        let ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        for (; p < len; p++) {
            ch0 = ch;
            ch = data.charCodeAt(p);
            if (ch === 9) {
                let f = fields[i];
                if (ch0 !== 8) {
                    let v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    let s = null;
                }
                c = p + 1;
                ++i;
                if (i >= fLen)
                    break;
            }
            else if (ch === 10) {
                let f = fields[i];
                if (ch0 !== 8) {
                    let v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    let s = null;
                }
                ++p;
                ++i;
                break;
            }
        }
        return p;
    }
    to(ret, v, f) {
        switch (f.type) {
            default: return v;
            case 'datetime':
            case 'date':
            case 'time':
                let date = new Date(Number(v));
                return date;
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'dec': return Number(v);
            case 'bigint':
                let { tuid: tuidKey, url: tuidUrl } = f;
                if (tuidKey !== undefined) {
                    let tuid = f._tuid;
                    if (tuid === undefined) {
                        f._tuid = tuid = this.getTuid(tuidKey, tuidUrl);
                    }
                    tuid.useId(Number(v));
                }
                return Number(v);
        }
    }
    unpackArr(ret, arr, data, p) {
        let vals = [], len = data.length;
        let { name, fields } = arr;
        while (p < len) {
            let ch = data.charCodeAt(p);
            if (ch === 10) {
                ++p;
                break;
            }
            let val = {};
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    }
}
//# sourceMappingURL=entities.js.map