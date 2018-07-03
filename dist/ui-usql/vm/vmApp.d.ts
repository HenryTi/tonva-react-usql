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
    private vmApiCollection;
    constructor(tonvaApp: string, ui: any);
    load(): Promise<void>;
    protected newVmApi(url: string, api: string, access: string, ui: any): VmApi;
    caption: string;
    renderView(): JSX.Element;
    apiViews(): JSX.Element[];
    tuidLink(name: string): JSX.Element;
    tuidView(name: string): JSX.Element;
}
