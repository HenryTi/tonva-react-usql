import { PagedItems } from "tonva-tools";
export class TuidPagedItems extends PagedItems {
    constructor(tuid) {
        super(true);
        this.tuid = tuid;
    }
    async load() {
        let ret = await this.tuid.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
//# sourceMappingURL=pagedItems.js.map