/// <reference types="react" />
import { PageItems } from 'tonva-tools';
import { CEntity, EntityUI } from "../CVEntity";
import { TuidMain, Tuid, TuidDiv } from "../../entities";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { CUsq } from "../usq/cUsq";
import { CLink } from "../link";
import { VTuidInfo } from "./vTuidInfo";
import { VTuidMainList } from './vTuidList';
export interface TuidUI extends EntityUI {
    CTuidMain?: typeof CTuidMain;
    CTuidSelect?: typeof CTuidSelect;
    CTuidInfo?: typeof CTuidInfo;
    inputContent?: React.StatelessComponent<any>;
    rowContent?: React.StatelessComponent<any>;
    divs?: {
        [div: string]: {
            CTuidSelect?: typeof CTuidSelect;
            inputContent?: React.StatelessComponent<any>;
            rowContent?: React.StatelessComponent<any>;
        };
    };
}
export declare abstract class CTuid<T extends Tuid> extends CEntity<T, TuidUI> {
    PageItems: PageItems<any>;
    protected buildPageItems(): PageItems<any>;
    searchMain(key: string): Promise<void>;
    getDivItems(ownerId: number): Promise<any[]>;
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
    protected readonly VTuidList: typeof VTuidMainList;
    protected internalStart(): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected edit(id: number): Promise<void>;
    private itemChanged;
}
export declare class CTuidDiv extends CTuid<TuidDiv> {
    protected internalStart(): Promise<void>;
}
export declare class CTuidSelect extends CTuid<Tuid> {
    protected internalStart(param?: any): Promise<void>;
    protected beforeStart(): Promise<boolean>;
    protected readonly VTuidSelect: typeof VTuidSelect;
    idFromItem(item: any): any;
}
export declare class CTuidInfo extends CTuid<Tuid> {
    protected internalStart(id: any): Promise<void>;
    protected readonly VTuidInfo: typeof VTuidInfo;
}
