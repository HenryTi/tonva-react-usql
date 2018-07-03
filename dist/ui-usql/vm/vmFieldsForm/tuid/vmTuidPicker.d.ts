import { PagedItems } from 'tonva-tools';
import { Tuid } from '../../../entities';
import { VmTuid } from '../../tuid/vmTuid';
import { VmApi } from '../../vmApi';
import { VmTuidControl } from './vmTuidControl';
export declare type TypeVmTuidPicker = typeof VmTuidPicker;
export declare class VmTuidPicker extends VmTuid {
    private row;
    vmTuidControl: VmTuidControl;
    pagedItems: PagedItems<any>;
    idFromValue: (values: any) => number;
    constructor(vmApi: VmApi, tuid: Tuid, vmTuidControl: VmTuidControl, pagedItems?: PagedItems<any>);
    load(): Promise<void>;
    itemRender: (item: any, index: number) => JSX.Element;
    itemClick: (item: any) => void;
    onSearch: (key: string) => Promise<void>;
    protected view: ({ vm }: {
        vm: VmTuidPicker;
    }) => JSX.Element;
}
