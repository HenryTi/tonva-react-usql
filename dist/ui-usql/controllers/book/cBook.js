import { CEntity } from "../VM";
import { VBookMain } from "./vBookMain";
export class CBook extends CEntity {
    async internalStart() {
        await this.showVPage(this.VBookMain);
    }
    get VBookMain() { return VBookMain; }
}
//# sourceMappingURL=cBook.js.map