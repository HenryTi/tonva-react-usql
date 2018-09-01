var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { Page, loadAppApis, nav, meInFrame } from 'tonva-tools';
import { ViewModel } from './viewModel';
import { VmApi } from './vmApi';
import { centerApi } from '../centerApi';
import { List, LMR } from '../../../node_modules/tonva-react-form';
export const entitiesCollection = {};
export class VmApp extends ViewModel {
    constructor(tonvaApp, ui) {
        super();
        this.vmApiCollection = {};
        this.caption = 'View Model 版的 Usql App';
        this.view = AppPage;
        this.renderRow = (item, index) => {
            let { id, nick, name } = item;
            return React.createElement(LMR, { className: "p-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        this.onRowClick = (item) => __awaiter(this, void 0, void 0, function* () {
            meInFrame.unit = item.id; // 25;
            //await store.loadUnit();
            nav.clear();
            nav.replace(this.render());
        });
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
    }
    loadApis() {
        return __awaiter(this, void 0, void 0, function* () {
            let app = yield loadAppApis(this.appOwner, this.appName);
            let { id, apis } = app;
            this.id = id;
            for (let appApi of apis) {
                let { id: apiId, apiOwner, apiName, url, urlDebug, ws, access, token } = appApi;
                let api = apiOwner + '/' + apiName;
                let vmApi = this.newVmApi(apiId, api, access, this.ui && this.ui[api]);
                yield vmApi.loadSchema();
                this.vmApiCollection[api] = vmApi;
            }
        });
    }
    newVmApi(apiId, api, access, ui) {
        // 这里是可以重载的，写自己的VmApi
        return new VmApi(this.id, apiId, api, access, ui);
    }
    get vmApiArr() {
        let ret = [];
        for (let i in this.vmApiCollection) {
            ret.push(this.vmApiCollection[i]);
        }
        return ret;
    }
    getVmApi(apiName) {
        return this.vmApiCollection[apiName];
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hash = document.location.hash;
                this.isProduction = hash.startsWith('#tv');
                let { unit } = meInFrame;
                if (this.isProduction === false && (unit === undefined || unit <= 0)) {
                    let app = yield loadAppApis(this.appOwner, this.appName);
                    let { id } = app;
                    this.id = id;
                    yield this.loadAppUnits();
                    switch (this.appUnits.length) {
                        case 0:
                            alert('当前登录的用户不支持当前的APP');
                            return;
                        case 1:
                            meInFrame.unit = this.appUnits[0].id;
                            break;
                        default:
                            nav.clear();
                            nav.push(React.createElement(SelectUnit, { vm: this }));
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
            yield this.loadApis();
            // #tvRwPBwMef-23-sheet-api-108
            let parts = document.location.hash.split('-');
            if (parts.length > 2) {
                let action = parts[2];
                // sheet_debug 表示centerUrl是debug方式的
                if (action === 'sheet' || action === 'sheet_debug') {
                    let apiId = Number(parts[3]);
                    let sheetTypeId = Number(parts[4]);
                    let sheetId = Number(parts[5]);
                    let vmApi = this.getVmApiFromId(apiId);
                    if (vmApi === undefined) {
                        alert('unknown apiId: ' + apiId);
                        return;
                    }
                    this.clearPrevPages();
                    //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                    yield vmApi.navSheet(sheetTypeId, sheetId);
                    return;
                }
            }
            this.clearPrevPages();
            nav.push(this.render());
        });
    }
    getVmApiFromId(apiId) {
        for (let i in this.vmApiCollection) {
            let vmApi = this.vmApiCollection[i];
            if (vmApi.id === apiId)
                return vmApi;
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
const SheetLink = ({ vm, apiName, type, entityName }) => {
    let vmApi = vm.getVmApi(apiName);
    if (vmApi === undefined) {
        return React.createElement("div", null,
            "unkown api: ",
            apiName);
    }
    let vmLink = vmApi.vmLinkFromName(type, entityName);
    let key = apiName + ':' + entityName;
    if (vmLink === undefined) {
        return React.createElement("div", { key: key },
            "unkown ",
            apiName,
            ":",
            entityName);
    }
    return React.createElement("div", { key: key, className: "bg-white cursor-pointer border-bottom", onClick: vmLink.onClick }, vmLink.render());
};
const AppPage = observer(({ vm }) => {
    let { caption, vmApiArr } = vm;
    return React.createElement(Page, { header: caption }, vmApiArr.map((v, i) => React.createElement("div", { key: i }, v.render())));
});
const logout = () => {
    // nothing to do
};
const SelectUnit = ({ vm }) => {
    let { appUnits, renderRow, onRowClick } = vm;
    return React.createElement(Page, { header: "\u9009\u62E9\u5C0F\u53F7", logout: logout },
        React.createElement(List, { items: appUnits, item: { render: renderRow, onClick: onRowClick } }));
};
//# sourceMappingURL=vmApp.js.map