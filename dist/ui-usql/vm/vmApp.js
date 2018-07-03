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
import { Page, loadAppApis } from 'tonva-tools';
import { ViewModel } from './viewModel';
import { VmApi } from './vmApi';
export const entitiesCollection = {};
export class VmApp extends ViewModel {
    constructor(tonvaApp, ui) {
        super();
        this.vmApiCollection = {};
        this.caption = 'View Model 版的 Usql App';
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
    }
    load() {
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
                            let resp = yield fetch(lud + 'hello');
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
                yield vmApi.load();
                this.vmApiCollection[api] = vmApi;
            }
        });
    }
    newVmApi(url, api, access, ui) {
        // 这里是可以重载的，写自己的VmApi
        return new VmApi(this, url, api, access, ui);
    }
    renderView() {
        return React.createElement(AppPage, { vm: this });
    }
    apiViews() {
        let ret = [];
        for (let i in this.vmApiCollection) {
            ret.push(React.createElement("div", { key: i }, this.vmApiCollection[i].renderView()));
        }
        return ret;
    }
    tuidLink(name) {
        return React.createElement("div", null, name);
    }
    tuidView(name) {
        return React.createElement("div", null,
            "view: ",
            name);
    }
}
const AppPage = observer((props) => {
    let { vm } = props;
    let { caption } = vm;
    return React.createElement(Page, { header: caption }, vm.apiViews());
});
//# sourceMappingURL=vmApp.js.map