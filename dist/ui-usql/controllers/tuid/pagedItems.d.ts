import { PageItems } from "tonva-tools";
import { Tuid } from "../../entities";
export declare class TuidPageItems extends PageItems<any> {
    private tuid;
    constructor(tuid: Tuid);
    protected load(): Promise<any[]>;
    protected setPageStart(item: any): void;
}
