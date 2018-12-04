import { Controller, TypeVPage } from 'tonva-tools';
import { CUsq, UsqUI } from './usq';
export interface AppUI {
    CApp?: typeof CApp;
    CUsq?: typeof CUsq;
    main?: TypeVPage<CApp>;
    usqs: {
        [usq: string]: UsqUI;
    };
    res?: any;
}
export declare class CApp extends Controller {
    private appOwner;
    private appName;
    private isProduction;
    private cImportUsqs;
    protected ui: AppUI;
    id: number;
    appUnits: any[];
    constructor(tonvaApp: string, ui: AppUI);
    readonly caption: string;
    cUsqCollection: {
        [usq: string]: CUsq;
    };
    protected loadUsqs(): Promise<string[]>;
    getImportUsq(usqOwner: string, usqName: string): Promise<CUsq>;
    protected newCUsq(usq: string, usqId: number, access: string, ui: any): CUsq;
    readonly cUsqArr: CUsq[];
    getCUsq(apiName: string): CUsq;
    protected readonly VAppMain: TypeVPage<CApp>;
    protected beforeStart(): Promise<boolean>;
    protected internalStart(param: any): Promise<void>;
    protected clearPrevPages(): void;
    private showUnsupport;
    private showMainPage;
    private getCUsqFromId;
    private loadAppUnits;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
    protected selectUnitPage: () => JSX.Element;
}
