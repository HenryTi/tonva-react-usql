import { Controller, TypeVPage } from 'tonva-tools';
import { CUq, UqUI } from './uq';
export interface AppUI {
    CApp?: typeof CApp;
    CUq?: typeof CUq;
    main?: TypeVPage<CApp>;
    uqs: {
        [uq: string]: UqUI;
    };
    res?: any;
}
export declare class CApp extends Controller {
    private appOwner;
    private appName;
    private isProduction;
    private cImportUqs;
    protected ui: AppUI;
    id: number;
    appUnits: any[];
    constructor(tonvaApp: string, ui?: AppUI);
    readonly caption: string;
    cUqCollection: {
        [uq: string]: CUq;
    };
    startDebug(): Promise<void>;
    protected loadUqs(): Promise<string[]>;
    getImportUq(uqOwner: string, uqName: string): Promise<CUq>;
    protected newCUq(uq: string, uqId: number, access: string, ui: any): CUq;
    readonly cUqArr: CUq[];
    getCUq(apiName: string): CUq;
    protected readonly VAppMain: TypeVPage<CApp>;
    protected beforeStart(): Promise<boolean>;
    protected internalStart(param: any): Promise<void>;
    load(): Promise<void>;
    render(): JSX.Element;
    protected clearPrevPages(): void;
    private showUnsupport;
    private showMainPage;
    private getCUqFromId;
    private loadAppUnits;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
    protected selectUnitPage: () => JSX.Element;
}
