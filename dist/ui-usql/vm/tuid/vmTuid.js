import { VmEntity, vmLinkIcon } from '../vmEntity';
export class VmTuid extends VmEntity {
    constructor(vmApi, tuid, ui) {
        super(vmApi, tuid, ui);
    }
    get icon() { return vmLinkIcon('text-info', 'list-alt'); }
}
//# sourceMappingURL=vmTuid.js.map