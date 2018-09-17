/// <reference types="react" />
import { CrLink } from "../link";
import { CrUsq } from "./crUsq";
import { Entity } from "../../entities";
export declare class VmUsq {
    protected crUsq: CrUsq;
    protected isSysVisible: boolean;
    protected vmTuidLinks: CrLink[];
    protected vmMapLinks: CrLink[];
    protected vmSheetLinks: CrLink[];
    protected vmActionLinks: CrLink[];
    protected vmQueryLinks: CrLink[];
    protected vmBookLinks: CrLink[];
    constructor(crUsq: CrUsq);
    protected isVisible(entity: Entity): boolean;
    render(): JSX.Element;
    protected view: () => JSX.Element;
}
