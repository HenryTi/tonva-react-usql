import { Entities } from '../entities';
import { CrUsq } from './usq';
import { Coordinator } from './VM';
export declare const entitiesCollection: {
    [api: string]: Entities;
};
export declare class CrApp extends Coordinator {
    static instance: CrApp;
    private appOwner;
    private appName;
    private ui;
    private res;
    private isProduction;
    id: number;
    appUnits: any[];
    constructor(tonvaApp: string, ui: any);
    private init;
    crUsqCollection: {
        [api: string]: CrUsq;
    };
    loadApis(): Promise<void>;
    protected newCrUsq(apiId: number, api: string, access: string, ui: any): CrUsq;
    protected caption: string;
    readonly crUsqArr: CrUsq[];
    getCrUsq(apiName: string): CrUsq;
    internalStart(): Promise<void>;
    protected clearPrevPages(): void;
    private showMainPage;
    opClick: () => Promise<void>;
    private getCrUsqFromId;
    private loadAppUnits;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
    protected appPage: () => JSX.Element;
    protected selectUnitPage: () => JSX.Element;
}