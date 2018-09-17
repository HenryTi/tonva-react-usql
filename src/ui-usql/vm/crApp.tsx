import * as React from 'react';
import _ from 'lodash';
import { setXLang, Page, loadAppUsqs, nav, getUrlOrDebug, meInFrame} from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import {Entities} from '../entities';
import res from '../res';
import { CrUsq, EntityType } from './usq';
import { centerApi } from '../centerApi';
import { Coordinator } from './VM';
//import { OpCoordinator  } from '../op';

export const entitiesCollection: {[api:string]: Entities} = {};

export class CrApp extends Coordinator {
    static instance:CrApp;
    private appOwner:string;
    private appName:string;
    private ui:any;
    private res:any;
    private isProduction:boolean;    
    id: number;
    appUnits:any[];

    constructor(tonvaApp:string, ui:any) {
        super();
        CrApp.instance = this;
        this.init(tonvaApp, ui);
    }
    private init(tonvaApp:string, ui:any) {
        setXLang('zh', 'CN');
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
        this.res = _.clone(res);
        if (ui !== undefined) _.merge(this.res, ui.res);
        this.caption = this.res.caption || 'Tonva';
    }

    crUsqCollection: {[api:string]: CrUsq} = {};
    async loadUsqs(): Promise<void> {
        let unit = meInFrame.unit;
        let app = await loadAppUsqs(this.appOwner, this.appName);
        let {id, usqs} = app;
        this.id = id;
        for (let appUsq of usqs) {
            let {id:usqId, usqOwner, usqName, url, urlDebug, ws, access, token} = appUsq;
            let usq = usqOwner + '/' + usqName;
            let ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
            //let crUsq = this.newCrUsq(usqId, api, access, ui);
            let crUsq = this.newCrUsq(usq, usqId, access, ui);
            await crUsq.loadSchema();
            this.crUsqCollection[usq] = crUsq;
        }
    }

    //protected newCrUsq(usqId:number, usq:string, access:string, ui:any) {
    protected newCrUsq(usq:string, usqId:number, access:string, ui:any) {
        // 这里是可以重载的，写自己的CrUsq
        //return new CrUsq(this, usqId, usq, access, ui);
        return new CrUsq(usq, this.id, usqId, access, ui);
    }

    protected caption: string; // = 'View Model 版的 Usql App';

    get crUsqArr():CrUsq[] {
        let ret:CrUsq[] = [];
        for (let i in this.crUsqCollection) {
            ret.push(this.crUsqCollection[i]);
        }
        return ret;
    }

    getCrUsq(apiName:string):CrUsq {
        return this.crUsqCollection[apiName];
    }

    async internalStart() {
        try {
            let hash = document.location.hash;
            if (hash.startsWith('#tvdebug')) {
                await this.showMainPage();
                return;
            }
            this.isProduction = hash.startsWith('#tv');
            let {unit} = meInFrame;
            if (this.isProduction === false && (unit===undefined || unit<=0)) {
                let app = await loadAppUsqs(this.appOwner, this.appName);
                let {id} = app;
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
                        nav.push(<this.selectUnitPage />)
                        return;
                }
            }
            await this.showMainPage();
        }
        catch(err) {
            nav.push(<Page header="App start error!">
                <pre>
                    {typeof err === 'string'? err : err.message}
                </pre>
            </Page>);
        }
    }

    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    protected clearPrevPages() {
        nav.clear();
    }

    private async showMainPage() {
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
                let crUsq = this.getCrUsqFromId(usqId);
                if (crUsq === undefined) {
                    alert('unknown usqId: ' + usqId);
                    return;
                }
                this.clearPrevPages();
                //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                await crUsq.navSheet(sheetTypeId, sheetId);
                return;
            }
        }
        this.clearPrevPages();
        nav.push(<this.appPage />);
    }
    /*
    opClick = async () => {
        let coord = new OpCoordinator;
        let ret = await coord.call();
        alert('call returned in vmApp: ' + ret);
    }
    */
    private getCrUsqFromId(usqId:number): CrUsq {
        for (let i in this.crUsqCollection) {
            let crUsq = this.crUsqCollection[i];
            if (crUsq.id === usqId) return crUsq;
        }
        return;
    }

    private async loadAppUnits() {
        let ret = await centerApi.userAppUnits(this.id);
        this.appUnits = ret;
        if (ret.length === 1) {
            meInFrame.unit = ret[0].id;
        }
    }

    renderRow = (item: any, index: number):JSX.Element => {
        let {id, nick, name} = item;
        return <LMR className="p-2" right={'id: ' + id}>
            <div>{nick || name}</div>
        </LMR>;
    }
    onRowClick = async (item: any) => {
        meInFrame.unit = item.id; // 25;
        await this.start();
    }

    protected appPage = () => {
        return <Page header={this.caption} logout={()=>{meInFrame.unit = undefined}}>
            {this.crUsqArr.map((v,i) => <div key={i}>{v.render()}</div>)}
        </Page>;
    };
    //<LMR className="px-3 py-2 my-2 bg-light"
    //left={<FA name='cog' fixWidth={true} className="text-info mr-2 pt-1" />}
    //onClick={this.opClick}>设置操作权限</LMR>

    protected selectUnitPage = () => {
        return <Page header="选择小号" logout={true}>
            <List items={this.appUnits} item={{render: this.renderRow, onClick: this.onRowClick}}/>
        </Page>
    }
}
