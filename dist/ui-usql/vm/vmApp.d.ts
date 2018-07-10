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
    constructor(tonvaApp: string, ui: any);
    vmApiCollection: {
        [api: string]: VmApi;
    };
    loadSchema(): Promise<void>;
    protected newVmApi(url: string, api: string, access: string, ui: any): VmApi;
    caption: string;
    protected view: ({ vm }: {
        vm: VmApp;
    }) => JSX.Element;
    readonly vmApiArr: VmApi[];
    getVmApi(apiName: string): VmApi;
}
