var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PagedItems } from "tonva-tools";
export class TuidPagedItems extends PagedItems {
    constructor(tuid) {
        super(true);
        this.tuid = tuid;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tuid.search(this.param, this.pageStart, this.pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
//# sourceMappingURL=pagedItems.js.map