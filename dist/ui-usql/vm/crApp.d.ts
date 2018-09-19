/// <reference types="react" />
import { Coordinator } from 'tonva-tools';
import { Entities } from '../entities';
import { CrUsq } from './usq';
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
    loadUsqs(): Promise<void>;
    protected newCrUsq(usq: string, usqId: number, access: string, ui: any): CrUsq;
    protected caption: string;
    readonly crUsqArr: CrUsq[];
    getCrUsq(apiName: string): CrUsq;
    internalStart(): Promise<void>;
    protected clearPrevPages(): void;
    private showMainPage;
    private getCrUsqFromId;
    private loadAppUnits;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
    protected appPage: () => JSX.Element;
    protected selectUnitPage: () => JSX.Element;
}
