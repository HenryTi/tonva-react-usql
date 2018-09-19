import _ from 'lodash';
import { TypeVPage } from 'tonva-tools';
import { CEntity, EntityUI } from "../VM";
import { TuidMain, Tuid, TuidDiv } from "../../entities";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { CUsq } from "../usq/cUsq";
import { CLink } from "../link";
import { VTuidList } from "./vTuidList";
import { entitiesRes } from '../../res';
import { VTuidInfo } from "./vTuidInfo";
import { TuidPagedItems } from "./pagedItems";

export interface TuidUI extends EntityUI {
    CrTuidMain?: typeof CTuidMain;
    CrTuidSelect?: typeof CTuidMainSelect;
    CrTuidInfo?: typeof CTuidInfo;
    content?: React.StatelessComponent<any>;
    divs?: {
        [div:string]: {
            CrTuidDivSelect?: typeof CTuidDivSelect;
            content?: React.StatelessComponent<any>;
        }
    }
}

export abstract class CTuid<T extends Tuid> extends CEntity<T, TuidUI> {
    constructor(cUsq: CUsq, entity: T, ui: TuidUI, res) {
        super(cUsq, entity, ui, res);
    }

    get icon() {return entitiesRes['tuid'].icon}

    pagedItems:TuidPagedItems;

    async search(key:string) {
        if (this.pagedItems === undefined) {
            this.pagedItems = new TuidPagedItems(this.entity);
        }
        await this.pagedItems.first(key);
    }
}

export class CTuidMain extends CTuid<TuidMain> {
    constructor(crUsq: CUsq, entity: TuidMain, ui: TuidUI, res) {
        super(crUsq, entity, ui, res);
        let tuid = this.entity;
        this.proxies = tuid.proxies;
        if (this.proxies !== undefined) {
            this.proxyLinks = [];
            for (let i in this.proxies) {
                let link = this.crUsq.linkFromName('tuid', i);
                this.proxyLinks.push(link);
            }
        }
    }

    getLable(tuid:Tuid):string {
        if (tuid === this.entity) return this.label;
        let {name} = tuid;
        if (this.res !== undefined) {
            let {arrs} = this.res;
            if (arrs !== undefined) {
                let arr = arrs[name];
                if (arr !== undefined) {
                    let label = arr.label;
                    if (label !== undefined) return label;
                }
            }
        }
        return name;
    }

    proxies: {[name:string]: TuidMain};
    proxyLinks: CLink[];

    protected get VTuidMain():typeof VTuidMain {return VTuidMain}
    protected get VTuidEdit():typeof VTuidEdit {return VTuidEdit}
    protected get VTuidList():typeof VTuidList {return VTuidList}

    protected async internalStart():Promise<void> {
        await this.showVPage(this.VTuidMain);
    }

    protected async onEvent(type:string, value:any) {
        let vm: TypeVPage<CTuidMain>;
        switch (type) {
            default: return;
            case 'new': vm = this.VTuidEdit; break;
            case 'list': vm = this.VTuidList; break;
            case 'edit': await this.edit(value); return;
            case 'item-changed': this.itemChanged(value); return;
        }
        await this.showVPage(vm, value);
    }

    protected async edit(id:number) {
        let ret = await this.entity.load(id);
        let vm = this.VTuidEdit;
        await this.showVPage(vm, ret);
    }

    private itemChanged({id, values}:{id:number, values: any}) {
        let items = this.pagedItems.items;
        let item = items.find(v => v.id === id);
        if (item !== undefined) {
            _.merge(item, values);
        }
    }
}

export class CTuidMainSelect extends CTuid<TuidMain> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VmTuidSelect, param);
    }
    protected get VmTuidSelect():typeof VTuidSelect {return VTuidSelect}
}

export class CTuidDivSelect extends CTuid<TuidDiv> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VmTuidSelect, param);
    }
    protected get VmTuidSelect():typeof VTuidSelect {return VTuidSelect}
}

export class CTuidInfo extends CTuid<Tuid> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VmTuidInfo, param);
    }
    protected get VmTuidInfo():typeof VTuidInfo {return VTuidInfo}
}
