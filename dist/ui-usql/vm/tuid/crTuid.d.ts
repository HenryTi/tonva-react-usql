import { CrEntity, EntityUI } from "../VM";
import { TuidMain, Tuid, TuidDiv } from "../../entities";
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidSelect } from './vmTuidSelect';
import { CrUsq } from "../usq/crUsq";
import { VmEntityLink } from "../link";
import { VmTuidList } from "./vmTuidList";
export interface TuidUI extends EntityUI {
    CrTuidMain?: typeof CrTuidMain;
    CrTuidSelect?: typeof CrTuidMainSelect;
    content?: React.StatelessComponent<any>;
    divs?: {
        [div: string]: {
            CrTuidDivSelect?: typeof CrTuidDivSelect;
            content?: React.StatelessComponent<any>;
        };
    };
}
export declare abstract class CrTuid<T extends Tuid> extends CrEntity<T, TuidUI> {
    constructor(crUsq: CrUsq, entity: T, ui: TuidUI, res: any);
    readonly icon: JSX.Element;
}
export declare class CrTuidMain extends CrTuid<TuidMain> {
    constructor(crUsq: CrUsq, entity: TuidMain, ui: TuidUI, res: any);
    getLable(tuid: Tuid): string;
    proxies: {
        [name: string]: TuidMain;
    };
    proxyLinks: VmEntityLink[];
    protected readonly VmTuidMain: typeof VmTuidMain;
    protected readonly VmTuidEdit: typeof VmTuidEdit;
    protected readonly VmTuidList: typeof VmTuidList;
    protected internalStart(): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected edit(id: number): Promise<void>;
}
export declare class CrTuidMainSelect extends CrTuid<TuidMain> {
    protected internalStart(): Promise<void>;
    protected readonly VmTuidSelect: typeof VmTuidSelect;
}
export declare class CrTuidDivSelect extends CrTuid<TuidDiv> {
    protected internalStart(): Promise<void>;
    protected readonly VmTuidSelect: typeof VmTuidSelect;
}
