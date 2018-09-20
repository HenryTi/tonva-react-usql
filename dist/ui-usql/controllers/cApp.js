var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import _ from 'lodash';
import { setXLang, Page, loadAppUsqs, nav, meInFrame, Controller } from 'tonva-tools';
import { List, LMR } from 'tonva-react-form';
import res from '../res';
import { CUsq } from './usq';
import { centerApi } from '../centerApi';
export const entitiesCollection = {};
export class CApp extends Controller {
    constructor(tonvaApp, ui) {
        super();
        this.cUsqCollection = {};
        this.renderRow = (item, index) => {
            let { id, nick, name } = item;
            return React.createElement(LMR, { className: "p-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        this.onRowClick = (item) => __awaiter(this, void 0, void 0, function* () {
            meInFrame.unit = item.id; // 25;
            yield this.start();
        });
        this.appPage = () => {
            return React.createElement(Page, { header: this.caption, logout: () => { meInFrame.unit = undefined; } }, this.cUsqArr.map((v, i) => React.createElement("div", { key: i }, v.render())));
        };
        //<LMR className="px-3 py-2 my-2 bg-light"
        //left={<FA name='cog' fixWidth={true} className="text-info mr-2 pt-1" />}
        //onClick={this.opClick}>设置操作权限</LMR>
        this.selectUnitPage = () => {
            return React.createElement(Page, { header: "\u9009\u62E9\u5C0F\u53F7", logout: true },
                React.createElement(List, { items: this.appUnits, item: { render: this.renderRow, onClick: this.onRowClick } }));
        };
        this.init(tonvaApp, ui);
    }
    init(tonvaApp, ui) {
        setXLang('zh', 'CN');
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
        this.res = _.clone(res);
        if (ui !== undefined)
            _.merge(this.res, ui.res);
        this.caption = this.res.caption || 'Tonva';
    }
    loadUsqs() {
        return __awaiter(this, void 0, void 0, function* () {
            let unit = meInFrame.unit;
            let app = yield loadAppUsqs(this.appOwner, this.appName);
            let { id, usqs } = app;
            this.id = id;
            for (let appUsq of usqs) {
                let { id: usqId, usqOwner, usqName, url, urlDebug, ws, access, token } = appUsq;
                let usq = usqOwner + '/' + usqName;
                let ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
                let cUsq = this.newCUsq(usq, usqId, access, ui);
                yield cUsq.loadSchema();
                this.cUsqCollection[usq] = cUsq;
            }
        });
    }
    newCUsq(usq, usqId, access, ui) {
        return new CUsq(usq, this.id, usqId, access, ui);
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
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hash = document.location.hash;
                if (hash.startsWith('#tvdebug')) {
                    yield this.showMainPage();
                    return;
                }
                this.isProduction = hash.startsWith('#tv');
                let { unit } = meInFrame;
                if (this.isProduction === false && (unit === undefined || unit <= 0)) {
                    let app = yield loadAppUsqs(this.appOwner, this.appName);
                    let { id } = app;
                    this.id = id;
                    yield this.loadAppUnits();
                    switch (this.appUnits.length) {
                        case 0:
                            alert('当前登录的用户不支持当前的APP');
                            yield nav.logout();
                            return;
                        case 1:
                            unit = this.appUnits[0].id;
                            if (unit === undefined || unit < 0) {
                                alert('当前unit不支持app操作，请重新登录');
                                yield nav.logout();
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
                yield this.showMainPage();
            }
            catch (err) {
                nav.push(React.createElement(Page, { header: "App start error!" },
                    React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
            }
        });
    }
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    clearPrevPages() {
        nav.clear();
    }
    showMainPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadUsqs();
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
                    yield cUsq.navSheet(sheetTypeId, sheetId);
                    return;
                }
            }
            this.clearPrevPages();
            nav.push(React.createElement(this.appPage, null));
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
//# sourceMappingURL=cApp.js.map