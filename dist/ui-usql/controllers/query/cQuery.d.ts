import { StatelessComponent } from "react";
import { CEntity, EntityUI } from "../VM";
import { Query } from "../../entities";
import { VQueryMain } from "./vQueryMain";
import { VQuerySelect } from "./vQuerySelect";
export interface QueryUI extends EntityUI {
    CrQuery?: typeof CQuery;
    CrQuerySelect?: typeof CQuerySelect;
    main?: typeof VQueryMain;
    row?: StatelessComponent;
    queryRow?: StatelessComponent;
    selectRow?: StatelessComponent;
}
export declare abstract class CQueryBase extends CEntity<Query, QueryUI> {
    readonly icon: JSX.Element;
}
export declare class CQuery extends CQueryBase {
    protected internalStart(): Promise<void>;
    protected readonly VmQueryMain: typeof VQueryMain;
}
export declare class CQuerySelect extends CQueryBase {
    protected internalStart(param?: any): Promise<void>;
    protected readonly VmQuerySelect: typeof VQuerySelect;
}
