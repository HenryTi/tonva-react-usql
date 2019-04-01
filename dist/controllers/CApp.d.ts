import { Controller, TypeVPage, NavSettings, App } from 'tonva-tools';
import { CUq, UqUI } from './uq';
export interface RoleAppUI {
    CApp?: typeof CApp;
    CUq?: typeof CUq;
    main?: TypeVPage<CApp>;
    uqs: {
        [uq: string]: UqUI | (() => Promise<UqUI>);
    };
    res?: any;
}
export interface AppUI extends RoleAppUI, NavSettings {
    appName: string;
    roles?: {
        [role: string]: RoleAppUI | (() => Promise<RoleAppUI>);
    };
}
export declare class CApp extends Controller {
    private appOwner;
    private appName;
    private cImportUqs;
    protected ui: AppUI;
    id: number;
    appUnits: any[];
    constructor(ui: AppUI);
    readonly caption: string;
    cUqCollection: {
        [uq: string]: CUq;
    };
    startDebug(): Promise<void>;
    protected loadUqs(app: App): Promise<string[]>;
    private buildRoleAppUI;
    getImportUq(uqOwner: string, uqName: string): CUq;
    protected newCUq(uq: string, uqId: number, access: string, ui: any): CUq;
    readonly cUqArr: CUq[];
    getCUq(uq: string): CUq;
    protected readonly VAppMain: TypeVPage<CApp>;
    protected beforeStart(): Promise<boolean>;
    protected internalStart(param: any): Promise<void>;
    render(): JSX.Element;
    protected clearPrevPages(): void;
    private showUnsupport;
    private showMainPage;
    private getCUqFromId;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
    protected selectUnitPage: () => JSX.Element;
}
