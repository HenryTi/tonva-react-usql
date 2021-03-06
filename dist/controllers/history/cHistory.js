var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CEntity } from "../CVEntity";
import { VHistoryMain } from "./vHistoryMain";
export class CHistory extends CEntity {
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openVPage(this.VHistoryMain);
        });
    }
    get VHistoryMain() { return VHistoryMain; }
}
//# sourceMappingURL=cHistory.js.map