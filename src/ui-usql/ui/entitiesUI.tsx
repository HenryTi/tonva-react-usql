import * as React from 'react';
import * as _ from 'lodash';
import {CenterApi, Api} from 'tonva-tools';
import {Entities, Entity, Tuid, Action, Sheet, Query, Book, History} from '../entities';
import {EntitiesMapper, FieldMapper, FieldMappers, MapperContainer, 
    EntityMapper, ActionMapper, QueryMapper, SheetMapper, TuidMapper, TuidInput,
    BookMapper, HistoryMapper
} from './mapper';
import {EntityUI} from './entityUI';
import {ActionUI} from './actionUI';
import {QueryUI} from './queryUI';
import {SheetUI} from './sheetUI';
import {TuidUI} from './tuidUI';
import {BookUI} from './bookUI';
import {HistoryUI} from './historyUI';

export const entitiesUICollection: {[api:string]: EntitiesUI} = {};

export class EntitiesUI {
    private defaultMapper:EntitiesMapper;
    private mapper?:EntitiesMapper;

    constructor(url:string, ws:string, api:string, access:string, defaultMapper:EntitiesMapper, mapper?:EntitiesMapper) {
        this.api = api;
        entitiesUICollection[api] = this;
        let token = undefined;
        let apiOwner:string, apiName:string;
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
        let hash = document.location.hash;
        let baseUrl = hash===undefined || hash===''? 
            'debug/':'tv/';
        let _api = new Api(baseUrl, url, ws, apiOwner, apiName, true);
        this.entities = new Entities(_api, access);
        this.defaultMapper = defaultMapper;
        this.mapper = mapper || {};
        this.typeFieldMappers = _.clone(defaultMapper.typeFieldMappers);
        _.merge(this.typeFieldMappers, this.mapper.typeFieldMappers);
    }

    api: string;

    async loadEntities() {
        await this.entities.loadEntities();
        this.buildUI();
    }

    close() {
        this.entities.close();
    }

    entities:Entities;
    mainPage:JSX.Element;
    caption:string;
    typeFieldMappers?: FieldMappers;
    action: EntitySet<Action, ActionUI>;
    query: EntitySet<Query, QueryUI>;
    sheet: EntitySet<Sheet, SheetUI>;
    tuid: EntitySet<Tuid, TuidUI>;
    book: EntitySet<Book, BookUI>;
    history: EntitySet<History, HistoryUI>;

    buildUI() {
        let d = this.defaultMapper;
        let m = this.mapper;
        this.caption = m.caption || (d.caption || 'Tonva Usql Entities');
        let MP = m.mainPage || d.mainPage;
        if (MP !== undefined) this.mainPage = <MP ui={this} />;
        else this.mainPage = <div>没有定义mainPage</div>;

        this.action = new ActionSetBuilder(this, this.entities.actionArr, d.action, m.action).build();
        this.query = new QuerySetBuilder(this, this.entities.queryArr, d.query, m.query).build();
        this.sheet = new SheetSetBuilder(this, this.entities.sheetArr, d.sheet, m.sheet).build();
        this.tuid = new TuidSetBuilder(this, this.entities.tuidArr, d.tuid, m.tuid).build();
        this.book = new BookSetBuilder(this, this.entities.bookArr, d.book, m.book).build();
        this.history = new HistorySetBuilder(this, this.entities.historyArr, d.history, m.history).build();
    }

    getTuidInput(name:string, tuidUrl:string):TuidInput {
        let arr = ['currency', 'innerorganization'];
        if (arr.find(v => name.toLocaleLowerCase() === v)) {
            let s = null;
        }
        if (tuidUrl !== undefined) {
            let entitiesUI = entitiesUICollection[tuidUrl];
            if (entitiesUI === undefined) return undefined;
            return entitiesUI.getTuidInput(name, undefined);
        }

        let ret:TuidInput = {component:undefined};
        let mapper:TuidMapper, mappers:{[name:string]:TuidMapper};
        if (this.defaultMapper !== undefined) {
            let tuid = this.defaultMapper.tuid;
            if (tuid !== undefined) {
                mapper = tuid.mapper;
                if (mapper !== undefined) {
                    _.merge(ret, mapper.input);
                }
            }
        }
        let mc = this.mapper.tuid;
        if (mc !== undefined) {
            mappers = mc.mappers;
            if (mappers !== undefined)
                mapper = mappers[name];
            else
                mapper = mc.mapper;
            if (mapper !== undefined) {
                _.merge(ret, mapper.input);
            }
        }
        return ret;
    }
}

export interface EntitySet<E extends Entity, U extends EntityUI<E>> {
    caption: string;
    icon: string;
    coll: {[name:string]: U};
    idColl: {[id:number]: U};
    list: U[];
}

abstract class EntitySetBuilder<E extends Entity, U extends EntityUI<E>, T extends EntityMapper<E, U>> {
    protected entitiesUI:EntitiesUI;
    protected entityArr:E[];
    protected d:MapperContainer<E, U, T>;
    protected m:MapperContainer<E, U, T>;
    protected typeFieldMappers:FieldMappers;
    constructor(entitiesUI:EntitiesUI, entityArr:E[], d:MapperContainer<E, U, T>, m:MapperContainer<E, U, T>) {
        this.entitiesUI = entitiesUI;
        this.entityArr = entityArr;
        this.d = d || {};
        this.m = m || {};
        this.typeFieldMappers = this.buildTypeFieldMappers(this.entitiesUI.typeFieldMappers, this.d.mapper, this.m.mapper);
    }
    protected buildTypeFieldMappers(tfm:FieldMappers, mapper1:T, mapper2:T):FieldMappers {
        let dtfm = mapper1 && mapper1.typeFieldMappers;
        let mtfm = mapper2 && mapper2.typeFieldMappers;
        if (dtfm === undefined && mtfm === undefined)
            return tfm;
        let ret  = _.clone(tfm);
        _.merge(ret, dtfm);
        _.merge(ret, mtfm);
        return ret;
    }
    build():EntitySet<E, U> {
        function getMapper(name:string, mc: MapperContainer<E, U, T>):T {
            let {mapper, mappers} = mc;
            if (mappers !== undefined) return mappers[name] || mapper;
            return mapper;
        }
        let ret: EntitySet<E, U> = {caption:undefined, icon:undefined, coll:{}, idColl:{}, list:[]};
        let {coll, idColl, list} = ret;
        for (let entity of this.entityArr) {
            let {id, name} = entity;
            let mapper1:T = getMapper(name, this.d);
            let mapper2:T = getMapper(name, this.m);
            let u = this.buildUI(entity, mapper1 || {} as T, mapper2 || {} as T);
            u.entitySet = ret;
            coll[name] = u;
            idColl[id] = u;
        }
        let nameList = this.d.list;
        if (nameList === undefined) {
            for (let n in coll) list.push(coll[n]);
            list.sort((a, b) => a.entity.name.localeCompare(b.entity.name));
        }
        else {
            for (let n in nameList) list.push(coll[n]);
        }
        ret.caption = this.m.caption || this.d.caption;
        ret.icon = this.m.icon || this.d.icon;
        return ret;
    }

    protected buildUI(entity:E, mapper1:T, mapper2:T):U {
        let ret = this.createUI();
        ret.entitiesUI = this.entitiesUI;
        ret.entity = entity;
        ret.caption = mapper2.caption || mapper1.caption || entity.name;
        ret.icon = mapper2.icon || mapper1.icon;
        ret.link = mapper2.link || mapper1.link;
        ret.mainPage = mapper2.mainPage || mapper1.mainPage;
        ret.typeFieldMappers = this.buildTypeFieldMappers(this.typeFieldMappers, mapper1, mapper2);

        let nfm1 = mapper1.fieldFaces;
        let nfm2 = mapper2.fieldFaces;
        if (nfm1 === undefined) {
            if (nfm2 !== undefined) 
                ret.fieldFaces = nfm2;
        }
        else {
            if (nfm2 === undefined)
                ret.fieldFaces = nfm1;
            else {
                ret.fieldFaces = _.merge({}, nfm1, nfm2);
            }
        }
        return ret;
    }

    protected abstract createUI():U;
}

class ActionSetBuilder extends EntitySetBuilder<Action, ActionUI, ActionMapper> {
    build():EntitySet<Action, ActionUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():ActionUI {return new ActionUI();}
    protected buildUI(entity:Action, mapper1:ActionMapper, mapper2:ActionMapper):ActionUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class QuerySetBuilder extends EntitySetBuilder<Query, QueryUI, QueryMapper> {
    build():EntitySet<Query, QueryUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():QueryUI {return new QueryUI();}
    protected buildUI(entity:Query, mapper1:QueryMapper, mapper2:QueryMapper):QueryUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class BookSetBuilder extends EntitySetBuilder<Book, BookUI, BookMapper> {
    build():EntitySet<Book, BookUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():BookUI {return new BookUI();}
    protected buildUI(entity:Book, mapper1:BookMapper, mapper2:BookMapper):BookUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class HistorySetBuilder extends EntitySetBuilder<History, HistoryUI, HistoryMapper> {
    build():EntitySet<History, HistoryUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():HistoryUI {return new HistoryUI();}
    protected buildUI(entity:History, mapper1:HistoryMapper, mapper2:HistoryMapper):HistoryUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        ret.listRow = mapper2.listRow || mapper1.listRow;
        return ret;
    }
}
class SheetSetBuilder extends EntitySetBuilder<Sheet, SheetUI, SheetMapper> {
    build():EntitySet<Sheet, SheetUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():SheetUI {return new SheetUI();}
    protected buildUI(entity:Sheet, mapper1:SheetMapper, mapper2:SheetMapper):SheetUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        let nfm1 = mapper1.detailFaces;
        let nfm2 = mapper2.detailFaces;
        if (nfm1 === undefined) {
            if (nfm2 !== undefined) 
                ret.detialFaces = nfm2;
        }
        else {
            if (nfm2 === undefined)
                ret.detialFaces = nfm1;
            else {
                ret.detialFaces = _.merge({}, nfm1, nfm2);
            }
        }
        ret.view = mapper2.view || mapper1.view;
        ret.archivedList = mapper2.archivedList || mapper1.archivedList;
        ret.archivedSheet = mapper2.archivedSheet || mapper1.archivedSheet;
        ret.sheetAction = mapper2.sheetAction || mapper1.sheetAction;
        ret.sheetNew = mapper2.sheetNew || mapper1.sheetNew;
        ret.stateSheetList = mapper2.stateSheetList || mapper1.stateSheetList;
        return ret;
    }
}
class TuidSetBuilder extends EntitySetBuilder<Tuid, TuidUI, TuidMapper> {
    build():EntitySet<Tuid, TuidUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():TuidUI {return new TuidUI();}
    protected buildUI(entity:Tuid, mapper1:TuidMapper, mapper2:TuidMapper):TuidUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        ret.editPage = mapper2.editPage || mapper1.editPage;
        ret.listPage = mapper2.listPage || mapper1.listPage;
        ret.slaveInput = mapper2.slaveInput || mapper1.slaveInput;
        ret.input = _.merge({}, mapper1.input, mapper2.input);
        return ret;
    }
}
