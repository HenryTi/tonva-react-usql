import { StatelessComponent } from "react";
import { CrEntity, EntityUI } from "../VM";
import { Query } from "../../entities";
import { VmQueryMain } from "./vmQueryMain";
import { VmQuerySelect } from "./vmQuerySelect";
export interface QueryUI extends EntityUI {
    CrQuery?: typeof CrQuery;
    CrQuerySelect?: typeof CrQuerySelect;
    main?: typeof VmQueryMain;
    row?: StatelessComponent;
    queryRow?: StatelessComponent;
    selectRow?: StatelessComponent;
}
export declare abstract class CrQueryBase extends CrEntity<Query, QueryUI> {
    readonly icon: JSX.Element;
}
export declare class CrQuery extends CrQueryBase {
    protected internalStart(): Promise<void>;
    protected readonly VmQueryMain: typeof VmQueryMain;
}
export declare class CrQuerySelect extends CrQueryBase {
    protected internalStart(param?: any): Promise<void>;
    protected readonly VmQuerySelect: typeof VmQuerySelect;
}
