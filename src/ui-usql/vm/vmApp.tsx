import * as React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Page, loadAppApis} from 'tonva-tools';
import {Entities} from '../entities';
import {ViewModel} from './viewModel';
import { VmApi } from './vmApi';

export const entitiesCollection: {[api:string]: Entities} = {};

export class VmApp extends ViewModel {
    private appOwner:string;
    private appName:string;
    private ui:any;
    private vmApiCollection: {[api:string]: VmApi} = {};

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
    async load(): Promise<void> {
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
            await vmApi.load();
            this.vmApiCollection[api] = vmApi;
        }
    }

    protected newVmApi(url:string, api:string, access:string, ui:any) {
        // 这里是可以重载的，写自己的VmApi
        return new VmApi(this, url, api, access, ui);
    }

    caption = 'View Model 版的 Usql App';

    renderView(): JSX.Element {
        return <AppPage vm={this} />;
    }

    apiViews():JSX.Element[] {
        let ret:JSX.Element[] = [];
        for (let i in this.vmApiCollection) {
            ret.push(<div key={i}>{this.vmApiCollection[i].renderView()}</div>);
        }
        return ret;
    }

    tuidLink(name:string): JSX.Element {
        return <div>{name}</div>;
    }

    tuidView(name:string): JSX.Element {
        return <div>view: {name}</div>
    }
}

const AppPage = observer((props:{vm:VmApp}) => {
    let {vm} = props;
    let {caption} = vm;
    return <Page header={caption}>
        {vm.apiViews()}
    </Page>;
});
