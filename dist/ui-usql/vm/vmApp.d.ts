import { Entities } from '../entities';
import { ViewModel } from './viewModel';
import { VmApi } from './vmApi';
export declare const entitiesCollection: {
    [api: string]: Entities;
};
export declare class VmApp extends ViewModel {
    private appOwner;
    private appName;
    private ui;
    private isProduction;
    id: number;
    appUnits: any[];
    constructor(tonvaApp: string, ui: any);
    vmApiCollection: {
        [api: string]: VmApi;
    };
    loadApis(): Promise<void>;
    protected newVmApi(apiId: number, api: string, access: string, ui: any): VmApi;
    caption: string;
    protected view: ({ vm }: {
        vm: VmApp;
    }) => JSX.Element;
    readonly vmApiArr: VmApi[];
    getVmApi(apiName: string): VmApi;
    start(): Promise<void>;
    protected clearPrevPages(): void;
    private showMainPage;
    private getVmApiFromId;
    private loadAppUnits;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
}
