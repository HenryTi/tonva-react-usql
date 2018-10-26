import _ from 'lodash';
import { CEntity } from "../VM";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { VTuidInfo } from "./vTuidInfo";
import { TuidPageItems } from "./pageItems";
import { VTuidMainList } from './vTuidList';
export class CTuid extends CEntity {
    buildPageItems() {
        return new TuidPageItems(this.entity.owner || this.entity);
    }
    async searchMain(key) {
        if (this.PageItems === undefined) {
            this.PageItems = this.buildPageItems();
        }
        if (key !== undefined)
            await this.PageItems.first(key);
    }
    async getDivItems(ownerId) {
        let ret = await this.entity.searchArr(ownerId, undefined, 0, 1000);
        return ret;
    }
}
export class CTuidMain extends CTuid {
    constructor(cUsq, entity, ui, res) {
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
    getLable(tuid) {
        if (tuid === this.entity)
            return this.label;
        let { name } = tuid;
        let { arrs } = this.res;
        if (arrs !== undefined) {
            let arr = arrs[name];
            if (arr !== undefined) {
                let label = arr.label;
                if (label !== undefined)
                    return label;
            }
        }
        return name;
    }
    get VTuidMain() { return VTuidMain; }
    get VTuidEdit() { return VTuidEdit; }
    get VTuidList() { return VTuidMainList; }
    async internalStart() {
        await this.showVPage(this.VTuidMain);
    }
    async onEvent(type, value) {
        let v;
        switch (type) {
            default: return;
            case 'new':
                v = this.VTuidEdit;
                break;
            case 'list':
                v = this.VTuidList;
                break;
            case 'edit':
                await this.edit(value);
                return;
            case 'item-changed':
                this.itemChanged(value);
                return;
        }
        await this.showVPage(v, value);
    }
    async edit(id) {
        let ret = await this.entity.load(id);
        let v = this.VTuidEdit;
        await this.showVPage(v, ret);
    }
    itemChanged({ id, values }) {
        if (this.PageItems === undefined)
            return;
        let items = this.PageItems.items;
        let item = items.find(v => v.id === id);
        if (item !== undefined) {
            _.merge(item, values);
        }
    }
}
export class CTuidDiv extends CTuid {
    async internalStart() {
        alert('tuid div: ' + this.entity.name);
    }
}
export class CTuidSelect extends CTuid {
    async internalStart(param) {
        await this.showVPage(this.VTuidSelect, param);
    }
    async beforeStart() {
        await super.beforeStart();
        if (this.PageItems !== undefined)
            this.PageItems.reset();
    }
    get VTuidSelect() { return VTuidSelect; }
    idFromItem(item) {
        return item.id;
    }
}
export class CTuidInfo extends CTuid {
    async internalStart(id) {
        let data = await this.entity.load(id);
        await this.showVPage(this.VTuidInfo, data);
    }
    get VTuidInfo() { return VTuidInfo; }
}
//# sourceMappingURL=cTuid.js.map