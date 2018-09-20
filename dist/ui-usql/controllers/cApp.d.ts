/// <reference types="react" />
import { Controller } from 'tonva-tools';
import { Entities } from '../entities';
import { CUsq } from './usq';
export declare const entitiesCollection: {
    [api: string]: Entities;
};
export declare class CApp extends Controller {
    private appOwner;
    private appName;
    private ui;
    private res;
    private isProduction;
    id: number;
    appUnits: any[];
    constructor(tonvaApp: string, ui: any);
    private init;
    cUsqCollection: {
        [usq: string]: CUsq;
    };
    loadUsqs(): Promise<void>;
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
