import * as React from 'react';
import * as _ from 'lodash';
import { UsqApi, nav } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq } from '../../entities';
import { VmLink, VmEntityLink } from '../link';
import { CrBook, BookUI } from '../book';
import { CrSheet, SheetUI } from '../sheet';
import { ActionUI, CrAction } from '../action';
import { QueryUI, CrQuery, CrQuerySelect } from '../query';
import { CrTuidMain, TuidUI, CrTuidMainSelect, CrTuid, CrTuidInfo } from '../tuid';
import { MapUI, CrMap } from '../map';
import { CrApp } from '../crApp';
import { CrEntity, EntityUI, Coordinator, CoordinatorUsq } from '../VM';
import { JSONContent, PureJSONContent } from '../viewModel';
import { VmUsq } from './vmUsq';

export type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book' | 'map';

export interface UsqUI {
    CrTuidMain?: typeof CrTuidMain;
    CrQuery?: typeof CrQuery;
    CrQuerySelect?: typeof CrQuerySelect;
    CrMap?: typeof CrMap;
    tuid?: {[name:string]: TuidUI};
    sheet?: {[name:string]: SheetUI};
    map?: {[name:string]: MapUI};
    query?: {[name:string]: QueryUI};
    res?: any;
}

export class CrUsq extends Coordinator implements Usq {
    private access:string;
    private ui:any;
    private CrTuidMain: typeof CrTuidMain;
    private CrQuery: typeof CrQuery;
    private CrQuerySelect: typeof CrQuerySelect;
    private CrMap: typeof CrMap;

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
        let usqApi = new UsqApi(baseUrl, usqOwner, usqName, acc, true);
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
        }
        catch(err) {
            debugger;
        }

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

    crFromName(entityType:EntityType, entityName:string): CrEntity<Entity, EntityUI> {
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

    vmLinkFromName(entityType:EntityType, entityName:string) {
        return this.vmLink(this.crFromName(entityType, entityName));
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

    vmLink(crEntity:CrEntity<Entity, EntityUI>) {
        return new VmEntityLink(crEntity);
    }

    get vmTuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => this.vmLink(this.crTuidMain(v)));
    }
    crTuidMain(tuid:TuidMain):CrTuidMain {
        let {ui, res} = this.getUI<TuidMain, TuidUI>(tuid);
        return new (ui && ui.CrTuidMain || this.CrTuidMain || CrTuidMain)(this, tuid, ui, res);
    }
    crTuidSelect(tuid:TuidMain):CrTuidMainSelect {
        let {ui, res} = this.getUI<Tuid, TuidUI>(tuid);
        return new (ui && ui.CrTuidSelect || CrTuidMainSelect)(this, tuid, ui, res);
    }
    crTuidInfo(tuid:Tuid):CrTuidInfo {
        let {ui, res} = this.getUI<Tuid, TuidUI>(tuid);
        return new (ui && ui.CrTuidInfo || CrTuidInfo)(this, tuid, ui, res);
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
    crSheet(sheet:Sheet):CrSheet {
        let {ui, res} = this.getUI<Sheet, SheetUI>(sheet);
        return new CrSheet(this, sheet, ui, res);
    }
    get vmSheetLinks() { 
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crSheet(v))
        });
    }

    crAction(action:Action):CrAction {
        let {ui, res} = this.getUI<Action, ActionUI>(action);
        return new CrAction(this, action, ui, res);
    }
    get vmActionLinks() { 
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crAction(v))
        });
    }

    crQuery(query:Query):CrQuery {
        let {ui, res} = this.getUI<Query, QueryUI>(query);
        return new (ui && ui.CrQuery || this.CrQuery || CrQuery)(this, query, ui, res);
    }
    crQuerySelect(queryName:string):CrQuerySelect {
        let query = this.entities.query(queryName);
        if (query === undefined) return;
        let {ui, res} = this.getUI<Query, QueryUI>(query);
        return new (ui && ui.CrQuerySelect || this.CrQuerySelect || CrQuerySelect)(this, query, ui, res);
    }
    get vmQueryLinks() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crQuery(v))
        });
    }
    
    //get bookTypeCaption() { return this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见' }
    //newVmBookLink(vmBook:CrBook) {
    //    return new VmEntityLink(vmBook);
    //}
    crBook(book:Book):CrBook {
        let {ui, res} = this.getUI<Book, BookUI>(book);
        return new CrBook(this, book, ui, res);
    }
    get vmBookLinks() { 
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crBook(v))
        });
    }
    
    /*
    get mapTypeCaption() { return this.getUITypeCaption('map') || '对照表' }
    newVmMapLink(vmMap:CrMap) {
        return new VmEntityLink(vmMap);
    }*/
    crMap(map:Map):CrMap {
        let {ui, res} = this.getUI<Map, MapUI>(map);
        return new (ui && ui.CrMap || this.CrMap || CrMap)(this, map, ui, res);
    }
    get vmMapLinks() { 
        return this.entities.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crMap(v));
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

    protected get VmUsq():typeof VmUsq {return VmUsq}

    render() {
        let vm = new (this.VmUsq)(this);
        return vm.render();
    }
}

