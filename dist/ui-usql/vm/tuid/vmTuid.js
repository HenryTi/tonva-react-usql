import { VmEntity, vmLinkIcon } from '../vmEntity';
export class VmTuid extends VmEntity {
    constructor(vmApi, tuid) {
        super(vmApi, tuid);
    }
    get icon() { return vmLinkIcon('text-info', 'list-alt'); }
}
//# sourceMappingURL=vmTuid.js.map