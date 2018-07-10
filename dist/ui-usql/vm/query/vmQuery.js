import { VmEntity, vmLinkIcon } from '../vmEntity';
export class VmQuery extends VmEntity {
    constructor(vmApi, query) {
        super(vmApi, query);
    }
    get icon() { return vmLinkIcon('text-warning', 'search'); }
}
//# sourceMappingURL=vmQuery.js.map