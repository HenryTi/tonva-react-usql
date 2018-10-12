/// <reference types="react" />
import { Controller } from 'tonva-tools';
import { CUsq, UsqUI } from './usq';
export interface AppUI {
    CUsq?: typeof CUsq;
    usqs: {
        [usq: string]: UsqUI;
    };
}
export declare class CApp extends Controller {
    private appOwner;
    private appName;
    private isProduction;
    protected ui: AppUI;
    protected res: any;
    id: number;
    appUnits: any[];
    constructor(tonvaApp: string, ui: AppUI);
    private init;
    cUsqCollection: {
        [usq: string]: CUsq;
    };
    protected loadUsqs(): Promise<void>;
    protected newCUsq(usq: string, usqId: number, access: string, ui: any): CUsq;
    protected caption: string;
    readonly cUsqArr: CUsq[];
    getCUsq(apiName: string): CUsq;
    internalStart(): Promise<void>;
    protected clearPrevPages(): void;
    private showMainPage;
    private getCUsqFromId;
    private loadAppUnits;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
    protected appPage: () => JSX.Element;
    protected selectUnitPage: () => JSX.Element;
}
