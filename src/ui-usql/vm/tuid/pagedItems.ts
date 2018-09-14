import { PagedItems } from "tonva-tools";
import { Tuid } from "../../entities";

export class TuidPagedItems extends PagedItems<any> {
    private tuid: Tuid;
    constructor(tuid: Tuid) {
        super(true);
        this.tuid = tuid;
    }
    protected async load():Promise<any[]> {
        let ret = await this.tuid.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined) this.pageStart = 0;
    }
}
