import {observable} from 'mobx';
import {Entity} from './entity';
import {UsqlApi} from './usqlApi';
import {Tuid} from './tuid';
import {Action} from './action';
import {Sheet, SheetState, SheetAction} from './sheet';
import {Query} from './query';
import {Book} from './book';
import {History} from './history';
import { ApiBase } from 'tonva-tools';

export interface Field {
    name: string;
    type: string;
    //tuidKey?: string;
    tuid?: string;
    url?: string;
    _tuid: Tuid;
}
interface Arr {
    name:string;
    fields: Field[];
}

const tab = '\t';
const ln = '\n';

// api: apiOwner/apiName
// access: acc1; acc2

//const entitiesCollection: {[api:string]: Entities} = {};

export class Entities {
    private api:ApiBase;
    private tvApi: UsqlApi;
    //private ws: WSChannel;
    private tuids: {[name:string]: Tuid} = {};
    private actions: {[name:string]: Action} = {};
    private sheets: {[name:string]: Sheet} = {};
    private queries: {[name:string]: Query} = {};
    private books: {[name:string]: Book} = {};
    private histories: {[name:string]: History} = {};
    private cacheTimer: any;

    constructor(api:ApiBase, access?:string) {
        this.api = api;
        this.loadIds = this.loadIds.bind(this);

        let acc: string[];
        if (access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(v => v.trim()).filter(v => v.length > 0);
        }
        this.tvApi = new UsqlApi(api, acc);
    }

    tuid(name:string):Tuid {return this.tuids[name.toLowerCase()]}
    action(name:string):Action {return this.actions[name.toLowerCase()]}
    sheet(name:string):Sheet {return this.sheets[name.toLowerCase()]}
    query(name:string):Query {return this.queries[name.toLowerCase()]}
    book(name:string):Book {return this.books[name.toLowerCase()]}
    history(name:string):History {return this.histories[name.toLowerCase()]}

    tuidArr: Tuid[] = [];
    actionArr: Action[] = [];
    sheetArr: Sheet[] = [];
    queryArr: Query[] = [];
    bookArr: Book[] = [];
    historyArr: History[] = [];

    async loadEntities() {
        let accesses = await this.tvApi.loadAccess();
        this.buildAccess(this.tvApi, accesses);
        //await this.wsConnect();
    }

    getTuid(name:string, tuidUrl:string) {return this.tuids[name];}

    async loadSchemas(...entityArr:Entity[]) {
        let schemas = await this.tvApi.schemas(entityArr.map(v=>v.name));
        for (let i in entityArr) {
            entityArr[i].schema = schemas[i];
        }
    }

    cacheTuids(defer:number) {
        this.clearCacheTimer();
        this.cacheTimer = setTimeout(this.loadIds, defer);
    }
    private clearCacheTimer() {
        if (this.cacheTimer === undefined) return;
        clearTimeout(this.cacheTimer);
        this.cacheTimer = undefined;
    }
    private loadIds() {
        this.clearCacheTimer();
        for (let i in this.tuids) {
            let tuid = this.tuids[i];
            tuid.cacheIds();
        }
    }

    private buildAccess(api:UsqlApi, access:any) {
        for (let a in access) {
            let v = access[a];
            switch (typeof v) {
                case 'string': this.fromType(api, a, v); break;
                case 'object': this.fromObj(api, a, v); break;
            }
        }
        for (let tuid of this.tuidArr) tuid.setProxies(this);
    }

    private fromType(api:UsqlApi, name:string, type:string) {
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
                    this.tuidArr.push(tuid = this.tuids[name] = new Tuid(this, api, name, id));
                    tuid.buidProxies(parts);
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
            case 'sheet':
                let sheet = this.sheets[name];
                if (sheet === undefined) {
                    this.sheetArr.push(this.sheets[name] = new Sheet(this, api, name, id));
                }
        }
    }
    private fromObj(api:UsqlApi, name:string, obj:any) {
        switch (obj['$']) {
            case 'sheet': this.buildSheet(api, name, obj); break;
        }
    }
    private buildSheet(api:UsqlApi, name:string, obj:any) {
        let sheet = this.sheets[name];
        if (sheet === undefined) {
            this.sheetArr.push(sheet = this.sheets[name] = new Sheet(this, api, name, obj.id));
        }

        let states = sheet.states;
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: states.push(this.createSheetState(p, obj[p])); break;
            }
        }
    }
    private createSheetState(name:string, obj:object):SheetState {
        let ret:SheetState = {name:name, actions:[]};
        let actions = ret.actions;
        for (let p in obj) {
            let action:SheetAction = {name: p};
            actions.push(action);
        }
        return ret;
    }
    schemaRefTuids(tuidSchemas:any[]) {
        if (tuidSchemas === undefined) return;
        for (let schema of tuidSchemas) {
            let {tuids, name} = schema;
            let tuid = this.tuids[name];
            if (tuid === undefined) {
                continue;
            }
            if (tuid.schema === undefined) tuid.schema = schema;
            this.schemaRefTuids(tuids);
        }
    }
    pack(schema:any, data:any):string {
        let ret:string[] = [];
        if (schema === undefined || data === undefined) return;
        let fields = schema.fields;
        if (fields !== undefined) this.packRow(ret, schema.fields, data);
        let arrs = schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                this.packArr(ret, arr.fields, data[arr.name]);
            }
        }
        return ret.join('');
    }
    
    private escape(d:any):any {
        switch (typeof d) {
            default: return d;
            case 'string':
                let len = d.length;
                let r = '', p = 0;
                for (let i=0;i<len;i++) {
                    let c = d.charCodeAt(i);
                    switch(c) {
                        case 9: r += d.substring(p, i) + '\\t'; p = i+1; break;
                        case 10: r += d.substring(p, i) + '\\n'; p = i+1; break;
                    }
                }
                return r + d.substring(p);
            case 'undefined': return '';
        }
    }
    
    private packRow(result:string[], fields:Field[], data:any) {
        let ret = '';
        let len = fields.length;
        ret += this.escape(data[fields[0].name]);
        for (let i=1;i<len;i++) {
            let f = fields[i];
            ret += tab + this.escape(data[f.name]);
        }
        result.push(ret + ln);
    }
    
    private packArr(result:string[], fields:Field[], data:any[]) {
        if (data !== undefined) {
            for (let row of data) {
                this.packRow(result, fields, row);
            }
        }
        result.push(ln);
    }
    
    unpackSheet(schema:any, data:string):any {
        let ret = {} as any;
        if (schema === undefined || data === undefined) return;
        let fields = schema.fields;
        let p = 0;
        if (fields !== undefined) p = this.unpackRow(ret, schema.fields, data, p);
        let arrs = schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    
    unpackReturns(schema:any, data:string):any {
        let ret = {} as any;
        if (schema === undefined || data === undefined) return;
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
    
    private unpackRow(ret:any, fields:Field[], data:string, p:number):number {
        let ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        for (;p<len;p++) {
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
                c = p+1;
                ++i;
                if (i>=fLen) break;
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

    private to(ret:any, v:string, f:Field):any {
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
                let {tuid:tuidKey, url:tuidUrl} = f;
                if (tuidKey !== undefined) {
                    let tuid = f._tuid;
                    if (tuid === undefined) {
                        f._tuid = tuid = this.getTuid(tuidKey, tuidUrl);
                    }
                    tuid.useId(Number(v), true);
                }
                return Number(v);
        }
    }

    private unpackArr(ret:any, arr:Arr, data:string, p:number):number {
        let vals:any[] = [], len = data.length;
        let {name, fields} = arr;
        while (p<len) {
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
