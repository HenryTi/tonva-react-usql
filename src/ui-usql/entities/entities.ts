import {UsqlApi} from './usqlApi';
import {TuidMain, Tuid} from './tuid';
import {Action} from './action';
import {Sheet, SheetState, SheetAction} from './sheet';
import {Query} from './query';
import {Book} from './book';
import {History} from './history';
import { ApiBase, Api } from 'tonva-tools';
import { Map } from './map';

export interface Usq {
    getTuidContent(tuid:Tuid): React.StatelessComponent<any>;
}

export interface Field {
    name: string;
    type: 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'char' | 'text' 
        | 'datetime' | 'date' | 'time';
    tuid?: string;
    arr?: string;
    url?: string;
    null?: boolean;
    size?: number;
    _tuid: Tuid;
}
export interface ArrFields {
    name:string;
    fields: Field[];
}

// api: apiOwner/apiName
// access: acc1; acc2

//const entitiesCollection: {[api:string]: Entities} = {};

export class Entities {
    private tuids: {[name:string]: TuidMain} = {};
    private actions: {[name:string]: Action} = {};
    private sheets: {[name:string]: Sheet} = {};
    private queries: {[name:string]: Query} = {};
    private books: {[name:string]: Book} = {};
    private maps: {[name:string]: Map} = {};
    private histories: {[name:string]: History} = {};
    private cacheTimer: any;
    usq:Usq;
    tvApi: UsqlApi;
    appId: number;
    apiId: number;

    constructor(usq:Usq, appId:number, apiId:number, api:Api, access?:string) {
        this.usq = usq;
        this.appId = appId;
        this.apiId = apiId;
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

    tuid(name:string):TuidMain {return this.tuids[name.toLowerCase()]}
    action(name:string):Action {return this.actions[name.toLowerCase()]}
    sheet(name:string):Sheet {return this.sheets[name.toLowerCase()]}
    query(name:string):Query {return this.queries[name.toLowerCase()]}
    book(name:string):Book {return this.books[name.toLowerCase()]}
    map(name:string):Map {return this.maps[name.toLowerCase()]}
    history(name:string):History {return this.histories[name.toLowerCase()]}

    sheetFromTypeId(typeId:number):Sheet {
        for (let i in this.sheets) {
            let sheet = this.sheets[i];
            if (sheet.typeId === typeId) return sheet;
        }
    }

    tuidArr: TuidMain[] = [];
    actionArr: Action[] = [];
    sheetArr: Sheet[] = [];
    queryArr: Query[] = [];
    bookArr: Book[] = [];
    mapArr: Map[] = [];
    historyArr: History[] = [];

    async load() {
        let accesses = await this.tvApi.loadAccess();
        let {access, tuids} = accesses;
        this.buildTuids(tuids);
        this.buildAccess(access);
    }

    getTuid(name:string, arr?:string, tuidUrl?:string): Tuid {
        let tuid = this.tuids[name];
        if (tuid === undefined) return;
        if (arr === undefined) return tuid;
        return tuid.divs[arr];
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

    private buildTuids(tuids:any) {
        let proxyColl = {} as any;
        for (let i in tuids) {
            let schema = tuids[i];
            let {name, typeId, proxies} = schema;
            let tuid = this.newTuid(name, typeId);
            tuid.sys = true;
            //tuid.setSchema(schema);
            if (proxies !== undefined) proxyColl[i] = proxies;
        }
        for (let i in tuids) {
            let schema = tuids[i];
            let {name} = schema;
            let tuid = this.getTuid(name);
            //tuid.sys = true;
            tuid.setSchema(schema);
        }
        for (let i in proxyColl) {
            let proxies:string[] = proxyColl[i];
            let tuid = this.tuids[i];
            tuid.proxies = {};
            for (let p of proxies) {
                tuid.proxies[p] = this.tuids[p];
            }
        }
    }

    private buildAccess(access:any) {
        for (let a in access) {
            let v = access[a];
            switch (typeof v) {
                case 'string': this.fromType(a, v); break;
                case 'object': this.fromObj(a, v); break;
            }
        }
        /*
        for (let tuid of this.tuidArr) {
            tuid.setProxies(this);
        }*/
    }

    newAction(name:string, id:number):Action {
        let action = this.actions[name];
        if (action !== undefined) return action;
        action = this.actions[name] = new Action(this, name, id)
        this.actionArr.push(action);
        return action;
    }
    newTuid(name:string, id:number):TuidMain {
        let tuid = this.tuids[name];
        if (tuid !== undefined) return tuid;
        tuid = this.tuids[name] = new TuidMain(this, name, id);
        this.tuidArr.push(tuid);
        return tuid;
    }
    newQuery(name:string, id:number):Query {
        let query = this.queries[name];
        if (query !== undefined) return query;
        query = this.queries[name] = new Query(this, name, id)
        this.queryArr.push(query);
        return query;
    }
    newBook(name:string, id:number):Book {
        let book = this.books[name];
        if (book !== undefined) return book;
        book = this.books[name] = new Book(this, name, id);
        this.bookArr.push(book);
        return book;
    }
    newMap(name:string, id:number):Map {
        let map = this.maps[name];
        if (map !== undefined) return map;
        map = this.maps[name] = new Map(this, name, id)
        this.mapArr.push(map);
        return map;
    }
    newHistory(name:string, id:number):History {
        let history = this.histories[name];
        if (history !== undefined) return;
        history = this.histories[name] = new History(this, name, id)
        this.historyArr.push(history);
        return history;
    }
    newSheet(name:string, id:number):Sheet {
        let sheet = this.sheets[name];
        if (sheet !== undefined) return sheet;
        sheet = this.sheets[name] = new Sheet(this, name, id);
        this.sheetArr.push(sheet);
        return sheet;
    }
    private fromType(name:string, type:string) {
        let parts = type.split('|');
        type = parts[0];
        let id = Number(parts[1]);
        switch (type) {
            case 'tuid': 
                let tuid = this.newTuid(name, id);
                tuid.sys = false;
                break;
            case 'action': this.newAction(name, id); break;
            case 'query': this.newQuery(name, id); break;
            case 'book': this.newBook(name, id); break;
            case 'map': this.newMap(name, id); break;
            case 'history': this.newHistory(name, id); break;
            case 'sheet':this.newSheet(name, id); break;
        }
    }
    private fromObj(name:string, obj:any) {
        switch (obj['$']) {
            case 'sheet': this.buildSheet(name, obj); break;
        }
    }
    private buildSheet(name:string, obj:any) {
        let sheet = this.sheets[name];
        if (sheet === undefined) sheet = this.newSheet(name, obj.id);
        sheet.build(obj);
        /*
        let states = sheet.states;
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    }
    /*
    private createSheetState(name:string, obj:object):SheetState {
        let ret:SheetState = {name:name, actions:[]};
        let actions = ret.actions;
        for (let p in obj) {
            let action:SheetAction = {name: p};
            actions.push(action);
        }
        return ret;
    }*/
    buildFieldTuid(fields:Field[]) {
        if (fields === undefined) return;
        for (let f of fields) {
            let {tuid, arr, url} = f;
            if (tuid === undefined) continue;
            f._tuid = this.getTuid(tuid, arr, url);
        }
    }
    buildArrFieldsTuid(arrFields:ArrFields[]) {
        if (arrFields === undefined) return;
        for (let af of arrFields) {
            let {fields} = af;
            if (fields === undefined) continue;
            this.buildFieldTuid(fields);
        }
    }
    /*
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
    }*/
}
