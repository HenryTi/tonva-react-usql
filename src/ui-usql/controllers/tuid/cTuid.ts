import _ from 'lodash';
import { TypeVPage, PageItems } from 'tonva-tools';
import { CEntity, EntityUI } from "../CVEntity";
import { TuidMain, Tuid, TuidDiv } from "../../entities";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { CUsq } from "../usq/cUsq";
import { CLink } from "../link";
import { VTuidInfo } from "./vTuidInfo";
import { TuidPageItems } from "./pageItems";
import { VTuidMainList } from './vTuidList';

export interface TuidUI extends EntityUI {
    CTuidMain?: typeof CTuidMain;
    CTuidSelect?: typeof CTuidSelect;
    CTuidInfo?: typeof CTuidInfo;
    inputContent?: React.StatelessComponent<any>;
    rowContent?: React.StatelessComponent<any>;
    divs?: {
        [div:string]: {
            CTuidSelect?: typeof CTuidSelect;
            inputContent?: React.StatelessComponent<any>;
            rowContent?: React.StatelessComponent<any>;
        }
    }
}

export abstract class CTuid<T extends Tuid> extends CEntity<T, TuidUI> {
    /*
    constructor(cUsq: CUsq, entity: T, ui: TuidUI, res) {
        super(cUsq, entity, ui, res);
    }*/

    PageItems:PageItems<any>;

    protected buildPageItems():PageItems<any> {
        return new TuidPageItems(this.entity.owner || this.entity);
    }

    async searchMain(key:string) {
        if (this.PageItems === undefined) {
            this.PageItems = this.buildPageItems();
        }
        if (key !== undefined) await this.PageItems.first(key);
    }

    async getDivItems(ownerId:number):Promise<any[]> {
        let ret = await this.entity.searchArr(ownerId, undefined, 0, 1000);
        return ret;
    }
}

export class CTuidMain extends CTuid<TuidMain> {
    constructor(cUsq: CUsq, entity: TuidMain, ui: TuidUI, res:any) {
        super(cUsq, entity, ui, res);
        let tuid = this.entity;
        this.proxies = tuid.proxies;
        if (this.proxies !== undefined) {
            this.proxyLinks = [];
            for (let i in this.proxies) {
                let link = this.cUsq.linkFromName('tuid', i);
                this.proxyLinks.push(link);
            }
        }
    }

    getLable(tuid:Tuid):string {
        if (tuid === this.entity) return this.label;
        let {name} = tuid;
        let {arrs} = this.res;
        if (arrs !== undefined) {
            let arr = arrs[name];
            if (arr !== undefined) {
                let label = arr.label;
                if (label !== undefined) return label;
            }
        }
        return name;
    }

    proxies: {[name:string]: TuidMain};
    proxyLinks: CLink[];

    protected get VTuidMain():typeof VTuidMain {return VTuidMain}
    protected get VTuidEdit():typeof VTuidEdit {return VTuidEdit}
    protected get VTuidList():typeof VTuidMainList {return VTuidMainList}

    protected async internalStart():Promise<void> {
        await this.showVPage(this.VTuidMain);
    }

    protected async onEvent(type:string, value:any) {
        let v: TypeVPage<CTuidMain>;
        switch (type) {
            default: return;
            case 'new': v = this.VTuidEdit; break;
            case 'list': v = this.VTuidList; break;
            case 'edit': await this.edit(value); return;
            case 'item-changed': this.itemChanged(value); return;
        }
        await this.showVPage(v, value);
    }

    protected async edit(id:number) {
        let ret = await this.entity.load(id);
        let v = this.VTuidEdit;
        await this.showVPage(v, ret);
    }

    private itemChanged({id, values}:{id:number, values: any}) {
        if (this.PageItems === undefined) return;
        let items = this.PageItems.items;
        let item = items.find(v => v.id === id);
        if (item !== undefined) {
            _.merge(item, values);
        }
    }
}
export class CTuidDiv extends CTuid<TuidDiv> {
    protected async internalStart():Promise<void> {
        alert('tuid div: ' + this.entity.name);
    }
}

export class CTuidSelect extends CTuid<Tuid> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VTuidSelect, param);
    }
    protected async beforeStart() {
        await super.beforeStart();
        if (this.PageItems !== undefined) this.PageItems.reset();
    }
    protected get VTuidSelect():typeof VTuidSelect {return VTuidSelect}
    idFromItem(item:any) {
        return item.id;
    }
}

export class CTuidInfo extends CTuid<Tuid> {
    protected async internalStart(id: any):Promise<void> {
        let data = await this.entity.load(id)
        await this.showVPage(this.VTuidInfo, data);
    }
    protected get VTuidInfo():typeof VTuidInfo {return VTuidInfo}
}
