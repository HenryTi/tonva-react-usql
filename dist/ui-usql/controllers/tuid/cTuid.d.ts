/// <reference types="react" />
import { CEntity, EntityUI } from "../VM";
import { TuidMain, Tuid, TuidDiv } from "../../entities";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { CUsq } from "../usq/cUsq";
import { CLink } from "../link";
import { VTuidList } from "./vTuidList";
import { VTuidInfo } from "./vTuidInfo";
import { TuidPagedItems } from "./pagedItems";
export interface TuidUI extends EntityUI {
    CTuidMain: typeof CTuidMain;
    CTuidSelect?: typeof CTuidMainSelect;
    CTuidInfo?: typeof CTuidInfo;
    content?: React.StatelessComponent<any>;
    divs?: {
        [div: string]: {
            CTuidDivSelect?: typeof CTuidDivSelect;
            content?: React.StatelessComponent<any>;
        };
    };
}
export declare abstract class CTuid<T extends Tuid> extends CEntity<T, TuidUI> {
    constructor(cUsq: CUsq, entity: T, ui: TuidUI, res: any);
    readonly icon: JSX.Element;
    pagedItems: TuidPagedItems;
    search(key: string): Promise<void>;
}
export declare class CTuidMain extends CTuid<TuidMain> {
    constructor(cUsq: CUsq, entity: TuidMain, ui: TuidUI, res: any);
    getLable(tuid: Tuid): string;
    proxies: {
        [name: string]: TuidMain;
    };
    proxyLinks: CLink[];
    protected readonly VTuidMain: typeof VTuidMain;
    protected readonly VTuidEdit: typeof VTuidEdit;
    protected readonly VTuidList: typeof VTuidList;
    protected internalStart(): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected edit(id: number): Promise<void>;
    private itemChanged;
}
export declare class CTuidMainSelect extends CTuid<TuidMain> {
    protected internalStart(param?: any): Promise<void>;
    protected readonly VTuidSelect: typeof VTuidSelect;
}
export declare class CTuidDivSelect extends CTuid<TuidDiv> {
    protected internalStart(param?: any): Promise<void>;
    protected readonly VTuidSelect: typeof VTuidSelect;
}
export declare class CTuidInfo extends CTuid<Tuid> {
    protected internalStart(param?: any): Promise<void>;
    protected readonly VTuidInfo: typeof VTuidInfo;
}
