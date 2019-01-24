var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page, loadAppUsqs, nav, meInFrame, Controller, VPage, resLang } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { CUsq } from './usq';
import { centerApi } from '../centerApi';
export class CApp extends Controller {
    constructor(tonvaApp, ui) {
        super(resLang(ui && ui.res));
        this.cImportUsqs = {};
        this.cUsqCollection = {};
        this.renderRow = (item, index) => {
            let { id, nick, name } = item;
            return React.createElement(LMR, { className: "px-3 py-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        this.onRowClick = (item) => __awaiter(this, void 0, void 0, function* () {
            meInFrame.unit = item.id; // 25;
            yield this.start();
        });
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
        this.ui = ui || { usqs: {} };
        this.caption = this.res.caption || 'Tonva';
    }
    startDebug() {
        return __awaiter(this, void 0, void 0, function* () {
            let appName = this.appOwner + '/' + this.appName;
            let cApp = new CApp(appName, { usqs: {} });
            let keepNavBackButton = true;
            yield cApp.start(keepNavBackButton);
        });
    }
    loadUsqs() {
        return __awaiter(this, void 0, void 0, function* () {
            let retErrors = [];
            let unit = meInFrame.unit;
            let app = yield loadAppUsqs(this.appOwner, this.appName);
            let { id, usqs } = app;
            this.id = id;
            let promises = [];
            let promiseChecks = [];
            for (let appUsq of usqs) {
                let { id: usqId, usqOwner, usqName, url, urlDebug, ws, access, token } = appUsq;
                let usq = usqOwner + '/' + usqName;
                let ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
                let cUsq = this.newCUsq(usq, usqId, access, ui || {});
                this.cUsqCollection[usq] = cUsq;
                promises.push(cUsq.loadSchema());
                promiseChecks.push(cUsq.entities.usqApi.checkAccess());
            }
            let results = yield Promise.all(promises);
            Promise.all(promiseChecks).then((checks) => {
                for (let c of checks) {
                    if (c === false) {
                        nav.start();
                        return;
                    }
                }
            });
            for (let result of results) {
                let retError = result; // await cUsq.loadSchema();
                if (retError !== undefined) {
                    retErrors.push(retError);
                    continue;
                }
            }
            if (retErrors.length === 0)
                return;
            return retErrors;
        });
    }
    getImportUsq(usqOwner, usqName) {
        return __awaiter(this, void 0, void 0, function* () {
            let usq = usqOwner + '/' + usqName;
            let cUsq = this.cImportUsqs[usq];
            if (cUsq !== undefined)
                return cUsq;
            let ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
            let usqId = -1; // unknown
            this.cImportUsqs[usq] = cUsq = this.newCUsq(usq, usqId, undefined, ui || {});
            let retError = yield cUsq.loadSchema();
            if (retError !== undefined) {
                console.error(retError);
                debugger;
                return;
            }
            return cUsq;
        });
    }
    newCUsq(usq, usqId, access, ui) {
        let cUsq = new (this.ui.CUsq || CUsq)(this, usq, this.id, usqId, access, ui);
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
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            //if (await super.beforeStart() === false) return false;
            try {
                let hash = document.location.hash;
                if (hash.startsWith('#tvdebug')) {
                    this.isProduction = false;
                    //await this.showMainPage();
                    //return;
                }
                else {
                    this.isProduction = hash.startsWith('#tv');
                }
                let { unit } = meInFrame;
                if (this.isProduction === false && (unit === undefined || unit <= 0)) {
                    let app = yield loadAppUsqs(this.appOwner, this.appName);
                    let { id } = app;
                    this.id = id;
                    yield this.loadAppUnits();
                    switch (this.appUnits.length) {
                        case 0:
                            this.showUnsupport();
                            return false;
                        case 1:
                            unit = this.appUnits[0].id;
                            if (unit === undefined || unit < 0) {
                                this.showUnsupport();
                                return false;
                            }
                            meInFrame.unit = unit;
                            break;
                        default:
                            //nav.clear();
                            nav.push(React.createElement(this.selectUnitPage, null));
                            return false;
                    }
                }
                let retErrors = yield this.loadUsqs();
                if (retErrors !== undefined) {
                    this.openPage(React.createElement(Page, { header: "ERROR" },
                        React.createElement("div", { className: "m-3" },
                            React.createElement("div", null, "Load Usqs \u53D1\u751F\u9519\u8BEF\uFF1A"),
                            retErrors.map((r, i) => React.createElement("div", { key: i }, r)))));
                    return false;
                }
                return true;
            }
            catch (err) {
                nav.push(React.createElement(Page, { header: "App start error!" },
                    React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
                return false;
            }
        });
    }
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (param !== true) {
                this.clearPrevPages();
            }
            yield this.showMainPage();
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.beforeStart();
        });
    }
    render() {
        return this.renderView(this.VAppMain);
    }
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    clearPrevPages() {
        nav.clear();
    }
    showUnsupport() {
        this.clearPrevPages();
        this.openPage(React.createElement(Page, { header: "APP\u65E0\u6CD5\u8FD0\u884C", logout: true },
            React.createElement("div", { className: "m-3 text-danger container" },
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" },
                        React.createElement(FA, { name: "exclamation-triangle" })),
                    React.createElement("div", { className: "col" }, "\u7528\u6237\u4E0D\u652F\u6301APP")),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "\u7528\u6237: "),
                    React.createElement("div", { className: "col" }, `${nav.user.name}`)),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "App:"),
                    React.createElement("div", { className: "col" }, `${this.appOwner}/${this.appName}`)))));
    }
    showMainPage() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    yield cUsq.navSheet(sheetTypeId, sheetId);
                    return;
                }
            }
            this.showVPage(this.VAppMain);
        });
    }
    getCUsqFromId(usqId) {
        for (let i in this.cUsqCollection) {
            let cUsq = this.cUsqCollection[i];
            if (cUsq.id === usqId)
                return cUsq;
        }
        return;
    }
    loadAppUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield centerApi.userAppUnits(this.id);
            this.appUnits = ret;
            if (ret.length === 1) {
                meInFrame.unit = ret[0].id;
            }
        });
    }
}
class VAppMain extends VPage {
    constructor() {
        super(...arguments);
        this.appContent = () => {
            let { cUsqArr } = this.controller;
            let content;
            if (cUsqArr.length === 0) {
                content = React.createElement("div", { className: "text-danger" },
                    React.createElement(FA, { name: "" }),
                    " \u6B64APP\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u7684USQ");
            }
            else {
                content = cUsqArr.map((v, i) => React.createElement("div", { key: i }, v.render()));
            }
            return React.createElement(React.Fragment, null, content);
        };
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPage(this.appPage);
        });
    }
    render(param) {
        return this.appContent();
    }
    appPage() {
        let { caption } = this.controller;
        return React.createElement(Page, { header: caption, logout: () => { meInFrame.unit = undefined; } }, this.appContent());
    }
}
//# sourceMappingURL=CApp.js.map