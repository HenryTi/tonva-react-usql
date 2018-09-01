import { VmEntityLink } from "../link";
import { CrUsq } from "./crUsq";
import { Entity } from "../../entities";
export declare class VmUsq {
    protected crUsq: CrUsq;
    protected isSysVisible: boolean;
    protected vmTuidLinks: VmEntityLink[];
    protected vmMapLinks: VmEntityLink[];
    protected vmSheetLinks: VmEntityLink[];
    protected vmActionLinks: VmEntityLink[];
    protected vmQueryLinks: VmEntityLink[];
    protected vmBookLinks: VmEntityLink[];
    constructor(crUsq: CrUsq);
    protected isVisible(entity: Entity): boolean;
    render(): JSX.Element;
    protected view: () => JSX.Element;
}
