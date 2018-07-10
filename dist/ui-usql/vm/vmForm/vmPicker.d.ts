import { PagedItems } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { TypeContent, ViewModel } from '../viewModel';
import { Tuid, Query } from '../../entities';
export interface VmPickerOptions {
    vmApi: VmApi;
    pagedItems: PagedItems<any>;
    caption: string;
    onSelected?: (item: any) => Promise<void>;
    row?: TypeContent;
}
export declare class VmPicker extends ViewModel {
    private vmApi;
    private onSelected?;
    private row;
    initKey: string;
    caption: string;
    pagedItems: PagedItems<any>;
    constructor(options: VmPickerOptions);
    loadSchema(): Promise<void>;
    start(initKey?: string): Promise<void>;
    itemRender: (item: any, index: number) => JSX.Element;
    itemClick: (item: any) => Promise<void>;
    onSearch: (key: string) => Promise<void>;
    protected view: ({ vm }: {
        vm: VmPicker;
    }) => JSX.Element;
}
export declare type TypeVmTuidPicker = typeof VmTuidPicker;
export declare class VmTuidPicker extends VmPicker {
    constructor(vmApi: VmApi, caption: string, tuid: Tuid, onSelected: (item: any) => Promise<void>, row: TypeContent);
}
export declare type TypeQueryPicker = typeof VmQueryPicker;
export declare class VmQueryPicker extends VmPicker {
    constructor(vmApi: VmApi, caption: string, query: Query, onSelected: (item: any) => Promise<void>, row: TypeContent);
}
