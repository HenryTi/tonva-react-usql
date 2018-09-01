var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CrEntity } from "../VM";
import { VmQueryMain } from "./vmQueryMain";
import { VmQuerySelect } from "./vmQuerySelect";
import { entitiesRes } from '../../res';
export class CrQueryBase extends CrEntity {
    get icon() { return entitiesRes['query'].icon; }
}
export class CrQuery extends CrQueryBase {
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmQueryMain);
        });
    }
    get VmQueryMain() { return this.ui && this.ui.main || VmQueryMain; }
}
export class CrQuerySelect extends CrQueryBase {
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmQuerySelect, param);
        });
    }
    get VmQuerySelect() { return VmQuerySelect; }
}
//# sourceMappingURL=crQuery.js.map