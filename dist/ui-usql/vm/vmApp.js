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
import { Page, loadAppApis, nav } from 'tonva-tools';
import { ViewModel } from './viewModel';
import { VmApi } from './vmApi';
export const entitiesCollection = {};
export class VmApp extends ViewModel {
    constructor(tonvaApp, ui) {
        super();
        this.vmApiCollection = {};
        this.caption = 'View Model 版的 Usql App';
        this.view = AppPage;
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
    }
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            let isDebug = process.env.NODE_ENV === 'development';
            let appApis = yield loadAppApis(this.appOwner, this.appName);
            for (let appApi of appApis) {
                let { apiOwner, apiName, url, urlDebug, ws, access, token } = appApi;
                let api = apiOwner + '/' + apiName;
                if (isDebug === true && urlDebug !== undefined) {
                    let lud = urlDebug.toLowerCase();
                    if (lud.startsWith('http://') || lud.startsWith('https://')) {
                        try {
                            console.log('try urlDebug %s', urlDebug);
                            if (!lud.endsWith('/'))
                                lud += '/';
                            let resp = yield fetch(lud + 'hello', {
                                method: "GET",
                                mode: "no-cors",
                                headers: {
                                    "Content-Type": "text/plain"
                                },
                            });
                            let text = yield resp.text();
                            console.log('respond from %s: %s', urlDebug, text);
                            url = urlDebug;
                            console.log('urlDebug %s works ok', urlDebug);
                        }
                        catch (e) {
                            console.log('url %s not working', urlDebug);
                        }
                    }
                }
                let vmApi = this.newVmApi(url, api, access, this.ui && this.ui[api]);
                yield vmApi.loadSchema();
                this.vmApiCollection[api] = vmApi;
            }
        });
    }
    newVmApi(url, api, access, ui) {
        // 这里是可以重载的，写自己的VmApi
        return new VmApi(this, url, api, access, ui);
    }
    /*
        renderView(): JSX.Element {
            return <AppPage vm={this} />;
        }
    */
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
                yield this.loadSchema();
                console.log('schema loaded');
                nav.clear();
                nav.replace(this.render());
            }
            catch (err) {
                nav.push(React.createElement(Page, { header: "App start error!" },
                    React.createElement("pre", null, err.message)));
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
    let { caption, vmApiArr, vmApiCollection } = vm;
    let api = 'DevApp/devappApi';
    let sheets = ['order', '单据'];
    return React.createElement(Page, { header: caption },
        sheets.map(v => React.createElement(SheetLink, { key: v, vm: vm, apiName: api, type: "sheet", entityName: v })),
        vmApiArr.map((v, i) => React.createElement("div", { key: i }, v.render())));
});
//# sourceMappingURL=vmApp.js.map