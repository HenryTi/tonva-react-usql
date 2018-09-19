import * as React from 'react';
import * as _ from 'lodash';
import { UsqApi, Controller, UnitxApi, meInFrame } from 'tonva-tools';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq } from '../../entities';
import { CLink } from '../link';
import { CBook, BookUI } from '../book';
import { CSheet, SheetUI } from '../sheet';
import { ActionUI, CAction } from '../action';
import { QueryUI, CQuery, CQuerySelect } from '../query';
import { CTuidMain, TuidUI, CTuidMainSelect, CTuid, CTuidInfo } from '../tuid';
import { MapUI, CMap } from '../map';
import { CEntity, EntityUI } from '../VM';
import { PureJSONContent } from '../viewModel';
import { VUsq } from './vUsq';

export type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book' | 'map';

export interface UsqUI {
    CrTuidMain?: typeof CTuidMain;
    CrQuery?: typeof CQuery;
    CrQuerySelect?: typeof CQuerySelect;
    CrMap?: typeof CMap;
    tuid?: {[name:string]: TuidUI};
    sheet?: {[name:string]: SheetUI};
    map?: {[name:string]: MapUI};
    query?: {[name:string]: QueryUI};
    res?: any;
}

export class CUsq extends Controller implements Usq {
    private access:string;
    private ui:any;
    private CrTuidMain: typeof CTuidMain;
    private CrQuery: typeof CQuery;
    private CrQuerySelect: typeof CQuerySelect;
    private CrMap: typeof CMap;

    constructor(usq:string, appId:number, usqId:number, access:string, ui:UsqUI) {
        super();
        this.usq = usq;
        this.id = usqId;
        if (ui === undefined)
            this.ui = {};
        else {
            this.ui = ui;
            if (ui.res !== undefined) {
                this.res = ui.res.zh.CN;
            }
        }

        if (ui !== undefined) {
            this.CrTuidMain = ui.CrTuidMain;
            this.CrQuery = ui.CrQuery;
            this.CrQuerySelect = ui.CrQuerySelect;
            this.CrMap = ui.CrMap;
        }

        this.res = this.res || {};
        this.access = access;

        let token = undefined;
        let usqOwner:string, usqName:string;
        let p = usq.split('/');
        switch (p.length) {
            case 1:
                usqOwner = '$$$';
                usqName = p[0];
                break;
            case 2:
                usqOwner = p[0];
                usqName = p[1];
                break;
            default:
                console.log('usq must be usqOwner/usqName format');
                return;
        }

        let hash = document.location.hash;
        let baseUrl = hash===undefined || hash===''? 
            'debug/':'tv/';

        let acc: string[];
        if (access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(v => v.trim()).filter(v => v.length > 0);
        }
        let usqApi:UsqApi;
        if (usq === '$$$/$unitx') {
            // 这里假定，点击home link之后，已经设置unit了
            // 调用 UnitxApi会自动搜索绑定 unitx service
            usqApi = new UnitxApi(meInFrame.unit);
        }
        else {
            usqApi = new UsqApi(baseUrl, usqOwner, usqName, acc, true);
        }
        this.entities = new Entities(this, usqApi, appId); //, crApp.id, usqId, usqApi);
    }

    protected async internalStart() {
    }

    usq: string;
    id: number;
    res: any;
    entities:Entities;

    async loadSchema() {
        try {
            await this.entities.load();
            if (this.id === undefined) this.id = this.entities.usqId;

            for (let i in this.ui) {
                let g = this.ui[i];
                if (g === undefined) continue;
                let {caption, collection} = g;
                if (collection === undefined) continue;
                for (let j in collection) {
                    if (this.entities[i](j) === undefined) {
                        console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                    }
                }
            }
        }
        catch(err) {
            debugger;
        }
    }

    getTuid(name:string) {return this.entities.tuid(name)}
    async getQuerySearch(name:string):Promise<Query> {
        let query = this.entities.query(name);
        if (query === undefined) 
            alert(`QUERY ${name} 没有定义!`);
        else {
            await query.loadSchema();
            let {returns} = query;
            if (returns.length > 1) {
                alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
            }
        }
        return query;
    }

    getTuidNullCaption(tuid:Tuid) {
        let {tuidNullCaption, entity} = this.res;
        let {name} = tuid;
        let type:string;
        if (entity !== undefined) {
            let en = entity[name];
            if (en !== undefined) {
                type = en.label;
            }
        }
        return (tuidNullCaption || 'Select ') + (type || name);
    }

    protected isSysVisible = false;
    protected isVisible(entity: Entity):boolean {
        return entity.sys !== true || this.isSysVisible;
    }

    async navSheet(sheetTypeId:number, sheetId:number) {
        let sheet = this.entities.sheetFromTypeId(sheetTypeId);
        if (sheet === undefined) {
            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
            return;
        }
        let crSheet = this.crSheet(sheet);
        await crSheet.startSheet(sheetId);
    }

    crFromName(entityType:EntityType, entityName:string): CEntity<Entity, EntityUI> {
        switch (entityType) {
            case 'sheet':
                let sheet = this.entities.sheet(entityName);
                if (sheet === undefined) return;
                return this.crSheet(sheet);
            case 'action':
                let action = this.entities.action(entityName);
                if (action === undefined) return;
                return this.crAction(action);
            case 'tuid':
                let tuid = this.entities.tuid(entityName);
                if (tuid === undefined) return;
                return this.crTuidMain(tuid);
            case 'query':
                let query = this.entities.query(entityName);
                if (query === undefined) return;
                return this.crQuery(query);
            case 'book':
                let book = this.entities.book(entityName);
                if (book === undefined) return;
                return this.crBook(book);
            case 'map':
                let map = this.entities.map(entityName);
                if (map === undefined) return;
                return this.crMap(map);
            }
        }

    linkFromName(entityType:EntityType, entityName:string) {
        return this.link(this.crFromName(entityType, entityName));
    }

    private getUI<T extends Entity, UI extends EntityUI>(t:T):{ui:UI, res:any} {
        let ui, res;
        let {name, typeName} = t;
        if (this.ui !== undefined) {
            let tUI = this.ui[typeName];
            if (tUI !== undefined) {
                ui = tUI[name];
            }
        }
        let {entity} = this.res;
        if (entity !== undefined) {
            res = entity[name];
        }
        return {ui: ui || {}, res: res };
    }

    /*
    private getUITypeCaption(type:EntityType):any {
        if (this.res === undefined) return;
        return this.res[type];
    }
    */

    link(crEntity:CEntity<Entity, EntityUI>) {
        return new CLink(crEntity);
    }

    get tuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => this.link(this.crTuidMain(v)));
    }
    crTuidMain(tuid:TuidMain):CTuidMain {
        let {ui, res} = this.getUI<TuidMain, TuidUI>(tuid);
        return new (ui && ui.CrTuidMain || this.CrTuidMain || CTuidMain)(this, tuid, ui, res);
    }
    crTuidSelect(tuid:TuidMain):CTuidMainSelect {
        let {ui, res} = this.getUI<Tuid, TuidUI>(tuid);
        return new (ui && ui.CrTuidSelect || CTuidMainSelect)(this, tuid, ui, res);
    }
    crTuidInfo(tuid:Tuid):CTuidInfo {
        let {ui, res} = this.getUI<Tuid, TuidUI>(tuid);
        return new (ui && ui.CrTuidInfo || CTuidInfo)(this, tuid, ui, res);
    }
    /*
    newVmTuidView(tuid:Tuid):VmTuidView {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let vm = ui && ui.view;
        if (vm === undefined) vm = VmTuidView;
        return new vm(this, tuid, ui);
    }*/

    //get sheetTypeCaption() { return this.getUITypeCaption('sheet') || '凭单'; }
    //protected newVmSheetLink(vmSheet:CrSheet) {
    //    return new VmEntityLink(vmSheet);
    //}
    crSheet(sheet:Sheet):CSheet {
        let {ui, res} = this.getUI<Sheet, SheetUI>(sheet);
        return new CSheet(this, sheet, ui, res);
    }
    get sheetLinks() { 
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crSheet(v))
        });
    }

    crAction(action:Action):CAction {
        let {ui, res} = this.getUI<Action, ActionUI>(action);
        return new CAction(this, action, ui, res);
    }
    get actionLinks() { 
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crAction(v))
        });
    }

    crQuery(query:Query):CQuery {
        let {ui, res} = this.getUI<Query, QueryUI>(query);
        return new (ui && ui.CrQuery || this.CrQuery || CQuery)(this, query, ui, res);
    }
    crQuerySelect(queryName:string):CQuerySelect {
        let query = this.entities.query(queryName);
        if (query === undefined) return;
        let {ui, res} = this.getUI<Query, QueryUI>(query);
        return new (ui && ui.CrQuerySelect || this.CrQuerySelect || CQuerySelect)(this, query, ui, res);
    }
    get queryLinks() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crQuery(v))
        });
    }
    
    //get bookTypeCaption() { return this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见' }
    //newVmBookLink(vmBook:CrBook) {
    //    return new VmEntityLink(vmBook);
    //}
    crBook(book:Book):CBook {
        let {ui, res} = this.getUI<Book, BookUI>(book);
        return new CBook(this, book, ui, res);
    }
    get bookLinks() { 
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crBook(v))
        });
    }
    
    /*
    get mapTypeCaption() { return this.getUITypeCaption('map') || '对照表' }
    newVmMapLink(vmMap:CrMap) {
        return new VmEntityLink(vmMap);
    }*/
    crMap(map:Map):CMap {
        let {ui, res} = this.getUI<Map, MapUI>(map);
        return new (ui && ui.CrMap || this.CrMap || CMap)(this, map, ui, res);
    }
    get mapLinks() { 
        return this.entities.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crMap(v));
        });
    }

    getTuidContent(tuid:Tuid): React.StatelessComponent<any> {
        let {owner} = tuid;
        if (owner === undefined) {
            let {ui} = this.getUI<Tuid, TuidUI>(tuid);
            return (ui && ui.content) || PureJSONContent;
        }
        else {
            let {ui} = this.getUI<Tuid, TuidUI>(owner);
            return (ui && ui.divs && ui.divs[tuid.name].content) || PureJSONContent;
        }
    }

    async showTuid(tuid:Tuid, id:number):Promise<void> {
        let cr = this.crTuidInfo(tuid);
        await cr.start(id);
    }

    protected get VmUsq():typeof VUsq {return VUsq}

    render() {
        let vm = new (this.VmUsq)(this);
        return vm.render();
    }
}

