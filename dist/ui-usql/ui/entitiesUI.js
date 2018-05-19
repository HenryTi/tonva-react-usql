var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import * as _ from 'lodash';
import { Entities } from '../entities';
import { ActionUI } from './actionUI';
import { QueryUI } from './queryUI';
import { SheetUI } from './sheetUI';
import { TuidUI } from './tuidUI';
import { BookUI } from './bookUI';
import { HistoryUI } from './historyUI';
export const entitiesUICollection = {};
export class EntitiesUI {
    constructor(url, ws, api, access, defaultMapper, mapper) {
        this.api = api;
        entitiesUICollection[api] = this;
        let token = undefined;
        this.entities = new Entities(url, ws, token, api, access);
        this.defaultMapper = defaultMapper;
        this.mapper = mapper || {};
        this.typeFieldMappers = _.clone(defaultMapper.typeFieldMappers);
        _.merge(this.typeFieldMappers, this.mapper.typeFieldMappers);
    }
    loadEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entities.loadEntities();
            this.buildUI();
        });
    }
    close() {
        this.entities.close();
    }
    buildUI() {
        let d = this.defaultMapper;
        let m = this.mapper;
        this.caption = m.caption || (d.caption || 'Tonva Usql Entities');
        let MP = m.mainPage || d.mainPage;
        if (MP !== undefined)
            this.mainPage = React.createElement(MP, { ui: this });
        else
            this.mainPage = React.createElement("div", null, "\u6CA1\u6709\u5B9A\u4E49mainPage");
        this.action = new ActionSetBuilder(this, this.entities.actionArr, d.action, m.action).build();
        this.query = new QuerySetBuilder(this, this.entities.queryArr, d.query, m.query).build();
        this.sheet = new SheetSetBuilder(this, this.entities.sheetArr, d.sheet, m.sheet).build();
        this.tuid = new TuidSetBuilder(this, this.entities.tuidArr, d.tuid, m.tuid).build();
        this.book = new BookSetBuilder(this, this.entities.bookArr, d.book, m.book).build();
        this.history = new HistorySetBuilder(this, this.entities.historyArr, d.history, m.history).build();
    }
    getTuidInput(name, tuidUrl) {
        if (tuidUrl !== undefined) {
            let entitiesUI = entitiesUICollection[tuidUrl];
            if (entitiesUI === undefined)
                return undefined;
            return entitiesUI.getTuidInput(name, undefined);
        }
        let ret = { component: undefined };
        let mc = this.mapper.tuid;
        let mapper, mappers;
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
        if (this.defaultMapper !== undefined) {
            let tuid = this.defaultMapper.tuid;
            if (tuid !== undefined) {
                mapper = tuid.mapper;
                if (mapper !== undefined) {
                    _.merge(ret, mapper.input);
                }
            }
        }
        return ret;
    }
}
class EntitySetBuilder {
    constructor(entitiesUI, entityArr, d, m) {
        this.entitiesUI = entitiesUI;
        this.entityArr = entityArr;
        this.d = d || {};
        this.m = m || {};
        this.typeFieldMappers = this.buildTypeFieldMappers(this.entitiesUI.typeFieldMappers, this.d.mapper, this.m.mapper);
    }
    buildTypeFieldMappers(tfm, mapper1, mapper2) {
        let dtfm = mapper1 && mapper1.typeFieldMappers;
        let mtfm = mapper2 && mapper2.typeFieldMappers;
        if (dtfm === undefined && mtfm === undefined)
            return tfm;
        let ret = _.clone(tfm);
        _.merge(ret, dtfm);
        _.merge(ret, mtfm);
        return ret;
    }
    build() {
        function getMapper(name, mc) {
            let { mapper, mappers } = mc;
            if (mappers !== undefined)
                return mappers[name] || mapper;
            return mapper;
        }
        let ret = { caption: undefined, icon: undefined, coll: {}, idColl: {}, list: [] };
        let { coll, idColl, list } = ret;
        for (let entity of this.entityArr) {
            let { id, name } = entity;
            let mapper1 = getMapper(name, this.d);
            let mapper2 = getMapper(name, this.m);
            let u = this.buildUI(entity, mapper1 || {}, mapper2 || {});
            u.entitySet = ret;
            coll[name] = u;
            idColl[id] = u;
        }
        let nameList = this.d.list;
        if (nameList === undefined) {
            for (let n in coll)
                list.push(coll[n]);
            list.sort((a, b) => a.entity.name.localeCompare(b.entity.name));
        }
        else {
            for (let n in nameList)
                list.push(coll[n]);
        }
        ret.caption = this.m.caption || this.d.caption;
        ret.icon = this.m.icon || this.d.icon;
        return ret;
    }
    buildUI(entity, mapper1, mapper2) {
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
}
class ActionSetBuilder extends EntitySetBuilder {
    build() {
        let ret = super.build();
        return ret;
    }
    createUI() { return new ActionUI(); }
    buildUI(entity, mapper1, mapper2) {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class QuerySetBuilder extends EntitySetBuilder {
    build() {
        let ret = super.build();
        return ret;
    }
    createUI() { return new QueryUI(); }
    buildUI(entity, mapper1, mapper2) {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class BookSetBuilder extends EntitySetBuilder {
    build() {
        let ret = super.build();
        return ret;
    }
    createUI() { return new BookUI(); }
    buildUI(entity, mapper1, mapper2) {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class HistorySetBuilder extends EntitySetBuilder {
    build() {
        let ret = super.build();
        return ret;
    }
    createUI() { return new HistoryUI(); }
    buildUI(entity, mapper1, mapper2) {
        let ret = super.buildUI(entity, mapper1, mapper2);
        ret.listRow = mapper2.listRow || mapper1.listRow;
        return ret;
    }
}
class SheetSetBuilder extends EntitySetBuilder {
    build() {
        let ret = super.build();
        return ret;
    }
    createUI() { return new SheetUI(); }
    buildUI(entity, mapper1, mapper2) {
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
        return ret;
    }
}
class TuidSetBuilder extends EntitySetBuilder {
    build() {
        let ret = super.build();
        return ret;
    }
    createUI() { return new TuidUI(); }
    buildUI(entity, mapper1, mapper2) {
        let ret = super.buildUI(entity, mapper1, mapper2);
        ret.editPage = mapper2.editPage || mapper1.editPage;
        ret.listPage = mapper2.listPage || mapper1.listPage;
        ret.slaveInput = mapper2.slaveInput || mapper1.slaveInput;
        ret.input = _.merge({}, mapper1.input, mapper2.input);
        return ret;
    }
}
//# sourceMappingURL=entitiesUI.js.map