var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from 'lodash';
import { CEntity } from "../VM";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { entitiesRes } from '../../res';
import { VTuidInfo } from "./vTuidInfo";
import { TuidPagedItems } from "./pagedItems";
import { VTuidMainList } from './vTuidList';
export class CTuid extends CEntity {
    constructor(cUsq, entity, ui, res) {
        super(cUsq, entity, ui, res);
    }
    get icon() { return entitiesRes['tuid'].icon; }
    searchMain(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pagedItems === undefined) {
                this.pagedItems = new TuidPagedItems(this.entity.owner || this.entity);
            }
            if (key !== undefined)
                yield this.pagedItems.first(key);
        });
    }
    getDivItems(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.entity.searchArr(ownerId, undefined, 0, 1000);
            return ret;
        });
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
        if (this.res !== undefined) {
            let { arrs } = this.res;
            if (arrs !== undefined) {
                let arr = arrs[name];
                if (arr !== undefined) {
                    let label = arr.label;
                    if (label !== undefined)
                        return label;
                }
            }
        }
        return name;
    }
    get VTuidMain() { return VTuidMain; }
    get VTuidEdit() { return VTuidEdit; }
    get VTuidList() { return VTuidMainList; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VTuidMain);
        });
    }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    yield this.edit(value);
                    return;
                case 'item-changed':
                    this.itemChanged(value);
                    return;
            }
            yield this.showVPage(v, value);
        });
    }
    edit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.entity.load(id);
            let v = this.VTuidEdit;
            yield this.showVPage(v, ret);
        });
    }
    itemChanged({ id, values }) {
        if (this.pagedItems === undefined)
            return;
        let items = this.pagedItems.items;
        let item = items.find(v => v.id === id);
        if (item !== undefined) {
            _.merge(item, values);
        }
    }
}
export class CTuidDiv extends CTuid {
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            alert('tuid div: ' + this.entity.name);
        });
    }
}
export class CTuidSelect extends CTuid {
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VTuidSelect, param);
        });
    }
    beforeStart() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("beforeStart").call(this);
            if (this.pagedItems !== undefined)
                this.pagedItems.reset();
        });
    }
    get VTuidSelect() { return VTuidSelect; }
}
/*
export class CTuidMainSelect extends CTuidSelect<TuidMain> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VTuidMainSelect, param);
    }
    protected get VTuidMainSelect():typeof VTuidMainSelect {return VTuidMainSelect}
}

export class CTuidDivSelect extends CTuidSelect<TuidDiv> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VTuidDivSelect, param);
    }
    protected get VTuidDivSelect():typeof VTuidDivSelect {return VTuidDivSelect}
}
*/
export class CTuidInfo extends CTuid {
    internalStart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.entity.load(id);
            yield this.showVPage(this.VTuidInfo, data);
        });
    }
    get VTuidInfo() { return VTuidInfo; }
}
//# sourceMappingURL=cTuid.js.map