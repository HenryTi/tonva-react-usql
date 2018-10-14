import { CEntity } from "../VM";
import { VActionMain } from "./vActionMain";
export class CAction extends CEntity {
    async internalStart() {
        await this.showVPage(this.VActionMain);
    }
    get VActionMain() { return VActionMain; }
    async submit(values) {
        return this.entity.submit(values);
    }
}
//# sourceMappingURL=cAction.js.map