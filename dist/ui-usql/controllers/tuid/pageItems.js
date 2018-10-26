import { PageItems } from 'tonva-tools';
export class TuidPageItems extends PageItems {
    constructor(tuid) {
        super(true);
        this.tuid = tuid;
    }
    async load(param, pageStart, pageSize) {
        let ret = await this.tuid.search(param, pageStart, pageSize);
        return ret;
    }
    setPageStart(item) {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
//# sourceMappingURL=pageItems.js.map