import { View } from "tonva-tools";
import { Entity } from "../../entities";
import { CLink } from "../link";
import { CUq } from "./cUq";
export declare class VUq extends View<CUq> {
    protected isSysVisible: boolean;
    protected tuidLinks: CLink[];
    protected mapLinks: CLink[];
    protected sheetLinks: CLink[];
    protected actionLinks: CLink[];
    protected queryLinks: CLink[];
    protected bookLinks: CLink[];
    protected historyLinks: CLink[];
    protected pendingLinks: CLink[];
    constructor(cUq: CUq);
    protected isVisible(entity: Entity): boolean;
    render(param?: any): JSX.Element;
    protected view: () => JSX.Element;
}
