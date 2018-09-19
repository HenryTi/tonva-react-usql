/// <reference types="react" />
import { CLink } from "../link";
import { CUsq } from "./cUsq";
import { Entity } from "../../entities";
import { View } from "tonva-tools";
export declare class VUsq extends View<CUsq> {
    protected isSysVisible: boolean;
    protected vmTuidLinks: CLink[];
    protected vmMapLinks: CLink[];
    protected vmSheetLinks: CLink[];
    protected vmActionLinks: CLink[];
    protected vmQueryLinks: CLink[];
    protected vmBookLinks: CLink[];
    constructor(crUsq: CUsq);
    protected isVisible(entity: Entity): boolean;
    render(param?: any): JSX.Element;
    protected view: () => JSX.Element;
}
