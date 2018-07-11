import { IObservableArray } from 'mobx';
import { Arr } from '../field';
import { VmForm } from './vmForm';
import { ArrBandUIX } from './formUIX';
import { VmApi } from '../vmApi';
import { VmPage } from '../vmPage';
export declare type ArrEditRow = (initValues: any, onRowChanged: (values: any) => Promise<void>) => Promise<void>;
export declare class VmArr extends VmPage {
    protected vmApi: VmApi;
    protected arrBandUI: ArrBandUIX;
    arr: Arr;
    row: any;
    readOnly: boolean;
    vmForm: VmForm;
    onEditRow: ArrEditRow;
    list: IObservableArray<any>;
    rowValues: any;
    label: any;
    header: any;
    footer: any;
    constructor(vmApi: VmApi, arr: Arr, arrBandUI: ArrBandUIX);
    reset(): void;
    onSubmit: () => Promise<void>;
    afterEditRow: (values: any) => Promise<void>;
    start(rowValues?: any): Promise<void>;
    addClick: () => Promise<void>;
    onRowChanged: (rowValues: any) => Promise<void>;
    renderItem: (item: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmArr;
    }) => JSX.Element;
}
