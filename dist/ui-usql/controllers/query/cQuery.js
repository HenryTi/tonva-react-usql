import { CEntity } from "../VM";
import { VQueryMain } from "./vQueryMain";
import { VQuerySelect } from "./vQuerySelect";
export class CQueryBase extends CEntity {
}
export class CQuery extends CQueryBase {
    async internalStart() {
        await this.showVPage(this.VQueryMain);
    }
    get VQueryMain() { return this.ui && this.ui.main || VQueryMain; }
}
export class CQuerySelect extends CQueryBase {
    async internalStart(param) {
        await this.showVPage(this.VQuerySelect, param);
    }
    get VQuerySelect() { return VQuerySelect; }
}
//# sourceMappingURL=cQuery.js.map