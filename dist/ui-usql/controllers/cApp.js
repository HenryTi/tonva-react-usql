import * as React from 'react';
import { Page, loadAppUsqs, nav, meInFrame, Controller, VPage, resLang } from 'tonva-tools';
import { List, LMR } from 'tonva-react-form';
import { CUsq } from './usq';
import { centerApi } from '../centerApi';
export class CApp extends Controller {
    constructor(tonvaApp, ui) {
        super(resLang(ui.res, nav.language, nav.culture));
        this.cUsqCollection = {};
        this.renderRow = (item, index) => {
            let { id, nick, name } = item;
            return React.createElement(LMR, { className: "px-3 py-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        this.onRowClick = async (item) => {
            meInFrame.unit = item.id; // 25;
            await this.start();
        };
        /*
        protected appPage = () => {
            return <Page header={this.caption} logout={()=>{meInFrame.unit = undefined}}>
                {this.cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>)}
            </Page>;
        };
        */
        //<LMR className="px-3 py-2 my-2 bg-light"
        //left={<FA name='cog' fixWidth={true} className="text-info mr-2 pt-1" />}
        //onClick={this.opClick}>设置操作权限</LMR>
        this.selectUnitPage = () => {
            return React.createElement(Page, { header: "\u9009\u62E9\u5C0F\u53F7", logout: true },
                React.createElement(List, { items: this.appUnits, item: { render: this.renderRow, onClick: this.onRowClick } }));
        };
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
        this.caption = this.res.caption || 'Tonva';
    }
    async loadUsqs() {
        let unit = meInFrame.unit;
        let app = await loadAppUsqs(this.appOwner, this.appName);
        let { id, usqs } = app;
        this.id = id;
        for (let appUsq of usqs) {
            let { id: usqId, usqOwner, usqName, url, urlDebug, ws, access, token } = appUsq;
            let usq = usqOwner + '/' + usqName;
            let ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
            let cUsq = this.newCUsq(usq, usqId, access, ui || {});
            await cUsq.loadSchema();
            this.cUsqCollection[usq] = cUsq;
        }
    }
    newCUsq(usq, usqId, access, ui) {
        let cUsq = new (this.ui.CUsq || CUsq)(usq, this.id, usqId, access, ui);
        Object.setPrototypeOf(cUsq.x, this.x);
        return cUsq;
    }
    get cUsqArr() {
        let ret = [];
        for (let i in this.cUsqCollection) {
            ret.push(this.cUsqCollection[i]);
        }
        return ret;
    }
    getCUsq(apiName) {
        return this.cUsqCollection[apiName];
    }
    get VAppMain() { return (this.ui && this.ui.main) || VAppMain; }
    async internalStart() {
        try {
            let hash = document.location.hash;
            if (hash.startsWith('#tvdebug')) {
                await this.showMainPage();
                return;
            }
            this.isProduction = hash.startsWith('#tv');
            let { unit } = meInFrame;
            if (this.isProduction === false && (unit === undefined || unit <= 0)) {
                let app = await loadAppUsqs(this.appOwner, this.appName);
                let { id } = app;
                this.id = id;
                await this.loadAppUnits();
                switch (this.appUnits.length) {
                    case 0:
                        alert('当前登录的用户不支持当前的APP');
                        await nav.logout();
                        return;
                    case 1:
                        unit = this.appUnits[0].id;
                        if (unit === undefined || unit < 0) {
                            alert('当前unit不支持app操作，请重新登录');
                            await nav.logout();
                            return;
                        }
                        meInFrame.unit = unit;
                        break;
                    default:
                        nav.clear();
                        nav.push(React.createElement(this.selectUnitPage, null));
                        return;
                }
            }
            await this.showMainPage();
        }
        catch (err) {
            nav.push(React.createElement(Page, { header: "App start error!" },
                React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
        }
    }
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    clearPrevPages() {
        nav.clear();
    }
    async showMainPage() {
        await this.loadUsqs();
        // #tvRwPBwMef-23-sheet-api-108
        let parts = document.location.hash.split('-');
        if (parts.length > 2) {
            let action = parts[2];
            // sheet_debug 表示centerUrl是debug方式的
            if (action === 'sheet' || action === 'sheet_debug') {
                let usqId = Number(parts[3]);
                let sheetTypeId = Number(parts[4]);
                let sheetId = Number(parts[5]);
                let cUsq = this.getCUsqFromId(usqId);
                if (cUsq === undefined) {
                    alert('unknown usqId: ' + usqId);
                    return;
                }
                this.clearPrevPages();
                //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                await cUsq.navSheet(sheetTypeId, sheetId);
                return;
            }
        }
        this.clearPrevPages();
        //nav.push(<this.appPage />);
        this.showVPage(this.VAppMain);
    }
    getCUsqFromId(usqId) {
        for (let i in this.cUsqCollection) {
            let cUsq = this.cUsqCollection[i];
            if (cUsq.id === usqId)
                return cUsq;
        }
        return;
    }
    async loadAppUnits() {
        let ret = await centerApi.userAppUnits(this.id);
        this.appUnits = ret;
        if (ret.length === 1) {
            meInFrame.unit = ret[0].id;
        }
    }
}
class VAppMain extends VPage {
    constructor() {
        super(...arguments);
        this.appPage = () => {
            let { caption, cUsqArr } = this.controller;
            return React.createElement(Page, { header: caption, logout: () => { meInFrame.unit = undefined; } }, cUsqArr.map((v, i) => React.createElement("div", { key: i }, v.render())));
        };
    }
    async showEntry(param) {
        this.openPage(this.appPage);
    }
}
//# sourceMappingURL=cApp.js.map