import { PagedItems } from "tonva-tools";
import { Tuid } from "../../entities";
export declare class TuidPagedItems extends PagedItems<any> {
    private tuid;
    constructor(tuid: Tuid);
    protected load(): Promise<any[]>;
    protected setPageStart(item: any): void;
}
