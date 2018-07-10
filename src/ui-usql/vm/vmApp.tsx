import * as React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Page, loadAppApis} from 'tonva-tools';
import {Entities} from '../entities';
import {ViewModel} from './viewModel';
import { VmApi, EntityType } from './vmApi';
import { VmLink } from './link';

export const entitiesCollection: {[api:string]: Entities} = {};

export class VmApp extends ViewModel {
    private appOwner:string;
    private appName:string;
    private ui:any;

    constructor(tonvaApp:string, ui:any) {
        super();
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
    }
    vmApiCollection: {[api:string]: VmApi} = {};
    async loadSchema(): Promise<void> {
        let isDebug = process.env.NODE_ENV==='development';
        let appApis = await loadAppApis(this.appOwner, this.appName);
        for (let appApi of appApis) {
            let {apiOwner, apiName, url, urlDebug, ws, access, token} = appApi;
            let api = apiOwner + '/' + apiName;
            if (isDebug === true && urlDebug !== undefined) {
                let lud = urlDebug.toLowerCase();
                if (lud.startsWith('http://') || lud.startsWith('https://')) {
                    try {
                        console.log('try urlDebug %s', urlDebug);
                        if (!lud.endsWith('/')) lud += '/';
                        let resp = await fetch(lud + 'hello');
                        let text = await resp.text();
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
            await vmApi.loadSchema();
            this.vmApiCollection[api] = vmApi;
        }
    }

    protected newVmApi(url:string, api:string, access:string, ui:any) {
        // 这里是可以重载的，写自己的VmApi
        return new VmApi(this, url, api, access, ui);
    }

    caption = 'View Model 版的 Usql App';

    protected view = AppPage;
/*
    renderView(): JSX.Element {
        return <AppPage vm={this} />;
    }
*/
    get vmApiArr():VmApi[] {
        let ret:VmApi[] = [];
        for (let i in this.vmApiCollection) {
            ret.push(this.vmApiCollection[i]);
        }
        return ret;
    }

    getVmApi(apiName:string):VmApi {
        return this.vmApiCollection[apiName];
    }
}

interface SheetLinkProps {
    vm: VmApp;
    apiName: string;
    type: EntityType;
    entityName: string;
}
const SheetLink = ({vm, apiName, type, entityName}:SheetLinkProps) => {
    let vmApi = vm.getVmApi(apiName);
    if (vmApi === undefined) {
        return <div>unkown api: {apiName}</div>;
    }
    let vmLink = vmApi.vmLinkFromName(type, entityName);
    let key = apiName + ':' + entityName;
    if (vmLink === undefined) {
        return <div key={key}>unkown {apiName}:{entityName}</div>;
    }
    return <div key={key}
        className="bg-white cursor-pointer border-bottom" 
        onClick={vmLink.onClick}>
        {vmLink.render()}
    </div>;
}

const AppPage = observer(({vm}:{vm:VmApp}) => {
    let {caption, vmApiArr, vmApiCollection} = vm;
    let api = 'DevApp/devappApi';
    let sheets = ['order', '单据'];
    return <Page header={caption}>
        {sheets.map(v => <SheetLink key={v} vm={vm} apiName={api} type="sheet" entityName={v} />)}
        {vmApiArr.map((v,i) => <div key={i}>{v.render()}</div>)}
    </Page>;
});
