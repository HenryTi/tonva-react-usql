import { StatelessComponent } from "react";
import { CEntity, EntityUI } from "../CVEntity";
import { Query } from "../../entities";
import { VQueryMain } from "./vQueryMain";
import { VQuerySelect } from "./vQuerySelect";
export interface QueryUI extends EntityUI {
    CQuery?: typeof CQuery;
    CQuerySelect?: typeof CQuerySelect;
    main?: typeof VQueryMain;
    row?: StatelessComponent;
    queryRow?: StatelessComponent;
    selectRow?: StatelessComponent;
}
export declare abstract class CQueryBase extends CEntity<Query, QueryUI> {
}
export declare class CQuery extends CQueryBase {
    protected internalStart(): Promise<void>;
    protected readonly VQueryMain: typeof VQueryMain;
}
export declare class CQuerySelect extends CQueryBase {
    protected internalStart(param?: any): Promise<void>;
    protected readonly VQuerySelect: typeof VQuerySelect;
}
