var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CrEntity } from "../VM";
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidSelect } from './vmTuidSelect';
import { VmTuidList } from "./vmTuidList";
import { entitiesRes } from '../../res';
export class CrTuid extends CrEntity {
    constructor(crUsq, entity, ui, res) {
        super(crUsq, entity, ui, res);
    }
    get icon() { return entitiesRes['tuid'].icon; }
}
export class CrTuidMain extends CrTuid {
    constructor(crUsq, entity, ui, res) {
        super(crUsq, entity, ui, res);
        let tuid = this.entity;
        this.proxies = tuid.proxies;
        if (this.proxies !== undefined) {
            this.proxyLinks = [];
            for (let i in this.proxies) {
                let link = this.crUsq.vmLinkFromName('tuid', i);
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
    get VmTuidMain() { return VmTuidMain; }
    get VmTuidEdit() { return VmTuidEdit; }
    get VmTuidList() { return VmTuidList; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmTuidMain);
        });
    }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let vm;
            switch (type) {
                default: return;
                case 'new':
                    vm = this.VmTuidEdit;
                    break;
                case 'list':
                    vm = this.VmTuidList;
                    break;
                case 'edit':
                    yield this.edit(value);
                    return;
            }
            yield this.showVm(vm, value);
        });
    }
    edit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.entity.load(id);
            let vm = this.VmTuidEdit;
            yield this.showVm(vm, ret);
        });
    }
}
export class CrTuidMainSelect extends CrTuid {
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmTuidSelect);
        });
    }
    get VmTuidSelect() { return VmTuidSelect; }
}
export class CrTuidDivSelect extends CrTuid {
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmTuidSelect);
        });
    }
    get VmTuidSelect() { return VmTuidSelect; }
}
//# sourceMappingURL=crTuid.js.map