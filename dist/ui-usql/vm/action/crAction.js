var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CrEntity } from "../VM";
import { VmActionMain } from "./vmActionMain";
import { entitiesRes } from '../../res';
export class CrAction extends CrEntity {
    get icon() { return entitiesRes['action'].icon; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmActionMain);
        });
    }
    get VmActionMain() { return VmActionMain; }
    submit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.entity.submit(values);
        });
    }
}
//# sourceMappingURL=crAction.js.map