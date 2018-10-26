import { UsqApi, Controller, UnitxApi, meInFrame, resLang, nav } from 'tonva-tools';
import { Entities } from '../../entities';
import { CLink } from '../link';
import { CBook } from '../book';
import { CSheet } from '../sheet';
import { CAction } from '../action';
import { CQuery, CQuerySelect } from '../query';
import { CTuidMain, CTuidInfo, CTuidSelect } from '../tuid';
import { CMap } from '../map';
import { PureJSONContent } from '../form/viewModel';
import { VUsq } from './vUsq';
export class CUsq extends Controller {
    constructor(usq, appId, usqId, access, ui) {
        super(resLang(ui.res, nav.language, nav.culture));
        this.isSysVisible = false;
        this.usq = usq;
        this.id = usqId;
        this.ui = ui;
        this.access = access;
        this.CTuidMain = ui.CTuidMain || CTuidMain;
        this.CTuidSelect = ui.CTuidSelect || CTuidSelect;
        this.CTuidInfo = ui.CTuidInfo || CTuidInfo;
        this.CQuery = ui.CQuery || CQuery;
        this.CQuerySelect = ui.CQuerySelect || CQuerySelect;
        this.CMap = ui.CMap || CMap;
        this.CAction = ui.CAction || CAction;
        this.CSheet = ui.CSheet || CSheet;
        this.CBook = ui.CBook || CBook;
        let token = undefined;
        let usqOwner, usqName;
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
        let baseUrl = hash === undefined || hash === '' ?
            'debug/' : 'tv/';
        let acc;
        if (access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(v => v.trim()).filter(v => v.length > 0);
        }
        let usqApi;
        if (usq === '$$$/$unitx') {
            // 这里假定，点击home link之后，已经设置unit了
            // 调用 UnitxApi会自动搜索绑定 unitx service
            usqApi = new UnitxApi(meInFrame.unit);
        }
        else {
            usqApi = new UsqApi(baseUrl, usqOwner, usqName, acc, true);
        }
        this.entities = new Entities(this, usqApi, appId);
    }
    async internalStart() {
    }
    async loadSchema() {
        try {
            await this.entities.load();
            if (this.id === undefined)
                this.id = this.entities.usqId;
            for (let i in this.ui) {
                let g = this.ui[i];
                if (g === undefined)
                    continue;
                let { caption, collection } = g;
                if (collection === undefined)
                    continue;
                for (let j in collection) {
                    if (this.entities[i](j) === undefined) {
                        console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                    }
                }
            }
        }
        catch (err) {
            debugger;
        }
    }
    getTuid(name) { return this.entities.tuid(name); }
    async getQuerySearch(name) {
        let query = this.entities.query(name);
        if (query === undefined)
            alert(`QUERY ${name} 没有定义!`);
        else {
            await query.loadSchema();
            let { returns } = query;
            if (returns.length > 1) {
                alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
            }
        }
        return query;
    }
    getTuidPlaceHolder(tuid) {
        let { tuidPlaceHolder, entity } = this.res;
        let { name } = tuid;
        let type;
        if (entity !== undefined) {
            let en = entity[name];
            if (en !== undefined) {
                type = en.label;
            }
        }
        return (tuidPlaceHolder || 'Select');
    }
    getNone() {
        let { none } = this.res;
        return none || 'none';
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    async navSheet(sheetTypeId, sheetId) {
        let sheet = this.entities.sheetFromTypeId(sheetTypeId);
        if (sheet === undefined) {
            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
            return;
        }
        let cSheet = this.cSheet(sheet);
        await cSheet.startSheet(sheetId);
    }
    cFromName(entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                let sheet = this.entities.sheet(entityName);
                if (sheet === undefined)
                    return;
                return this.cSheet(sheet);
            case 'action':
                let action = this.entities.action(entityName);
                if (action === undefined)
                    return;
                return this.cAction(action);
            case 'tuid':
                let tuid = this.entities.tuid(entityName);
                if (tuid === undefined)
                    return;
                return this.cTuidMain(tuid);
            case 'query':
                let query = this.entities.query(entityName);
                if (query === undefined)
                    return;
                return this.cQuery(query);
            case 'book':
                let book = this.entities.book(entityName);
                if (book === undefined)
                    return;
                return this.cBook(book);
            case 'map':
                let map = this.entities.map(entityName);
                if (map === undefined)
                    return;
                return this.cMap(map);
        }
    }
    linkFromName(entityType, entityName) {
        return this.link(this.cFromName(entityType, entityName));
    }
    getUI(t) {
        let ui, res;
        let { name, typeName } = t;
        if (this.ui !== undefined) {
            let tUI = this.ui[typeName];
            if (tUI !== undefined) {
                ui = tUI[name];
            }
        }
        let { entity } = this.res;
        if (entity !== undefined) {
            res = entity[name];
        }
        return { ui: ui || {}, res: res || {} };
    }
    link(cEntity) {
        return new CLink(cEntity);
    }
    get tuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => this.link(this.cTuidMain(v)));
    }
    cTuidMain(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new (ui && ui.CTuidMain || this.CTuidMain)(this, tuid, ui, res);
    }
    cTuidSelect(tuid) {
        let { ui, res } = this.getUI(tuid.owner || tuid);
        return new (ui && ui.CTuidSelect || this.CTuidSelect)(this, tuid, ui, res);
    }
    cTuidInfo(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new (ui && ui.CTuidInfo || this.CTuidInfo)(this, tuid, ui, res);
    }
    cSheet(sheet /*, sheetUI?:SheetUI, sheetRes?:any*/) {
        let { ui, res } = this.getUI(sheet);
        //if (sheetUI !== undefined) ui = sheetUI;
        //if (sheetRes !== undefined) res = sheetRes;
        //return new (ui && ui.CSheet || this.CSheet)(this, sheet, sheetUI, sheetRes);
        return new (ui && ui.CSheet || this.CSheet)(this, sheet, ui, res);
    }
    get sheetLinks() {
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cSheet(v));
        });
    }
    cAction(action) {
        let { ui, res } = this.getUI(action);
        return new (ui && ui.CAction || this.CAction)(this, action, ui, res);
    }
    get actionLinks() {
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cAction(v));
        });
    }
    cQuery(query) {
        let { ui, res } = this.getUI(query);
        return new (ui && ui.CQuery || this.CQuery)(this, query, ui, res);
    }
    cQuerySelect(queryName) {
        let query = this.entities.query(queryName);
        if (query === undefined)
            return;
        let { ui, res } = this.getUI(query);
        return new (ui && ui.CQuerySelect || this.CQuerySelect)(this, query, ui, res);
    }
    get queryLinks() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cQuery(v));
        });
    }
    cBook(book) {
        let { ui, res } = this.getUI(book);
        return new (ui && ui.CBook || this.CBook)(this, book, ui, res);
    }
    get bookLinks() {
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cBook(v));
        });
    }
    cMap(map) {
        let { ui, res } = this.getUI(map);
        return new (ui && ui.CMap || this.CMap)(this, map, ui, res);
    }
    get mapLinks() {
        return this.entities.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cMap(v));
        });
    }
    getTuidContent(tuid) {
        let { owner } = tuid;
        if (owner === undefined) {
            let { ui } = this.getUI(tuid);
            return (ui && ui.inputContent) || PureJSONContent;
        }
        else {
            let { ui } = this.getUI(owner);
            return (ui && ui.divs && ui.divs[tuid.name].inputContent) || PureJSONContent;
        }
    }
    async showTuid(tuid, id) {
        let { owner } = tuid;
        let c = this.cTuidInfo(owner || tuid);
        await c.start(id);
    }
    get VUsq() { return VUsq; }
    render() {
        let v = new (this.VUsq)(this);
        return v.render();
    }
}
//# sourceMappingURL=cUsq.js.map