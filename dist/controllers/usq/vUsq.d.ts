import { View } from "tonva-tools";
import { Entity } from "../../entities";
import { CLink } from "../link";
import { CUsq } from "./cUsq";
export declare class VUsq extends View<CUsq> {
    protected isSysVisible: boolean;
    protected tuidLinks: CLink[];
    protected mapLinks: CLink[];
    protected sheetLinks: CLink[];
    protected actionLinks: CLink[];
    protected queryLinks: CLink[];
    protected bookLinks: CLink[];
    protected historyLinks: CLink[];
    protected pendingLinks: CLink[];
    constructor(cUsq: CUsq);
    protected isVisible(entity: Entity): boolean;
    render(param?: any): JSX.Element;
    protected view: () => JSX.Element;
}
