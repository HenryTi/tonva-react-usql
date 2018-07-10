import { IObservableArray } from 'mobx';
import { ViewModel } from '../viewModel';
import { Arr } from '../field';
import { VmForm } from './vmForm';
import { ArrBandUIX } from './formUIX';
import { VmApi } from '../vmApi';
export declare type ArrEditRow = (initValues: any, onRowChanged: (values: any) => Promise<void>) => Promise<void>;
export declare class VmArr extends ViewModel {
    protected vmApi: VmApi;
    protected arrBandUI: ArrBandUIX;
    arr: Arr;
    row: any;
    readOnly: boolean;
    vmForm: VmForm;
    onEditRow: ArrEditRow;
    afterEditRow: (values: any) => Promise<void>;
    list: IObservableArray<any>;
    rowValues: any;
    label: any;
    header: any;
    footer: any;
    constructor(vmApi: VmApi, arr: Arr, arrBandUI: ArrBandUIX);
    reset(): void;
    onSubmit: () => Promise<void>;
    start: (rowValues?: any) => Promise<void>;
    addClick: () => Promise<void>;
    onRowChanged: (rowValues: any) => Promise<void>;
    renderItem: (item: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmArr;
    }) => JSX.Element;
}
