/// <reference types="react" />
import { IObservableArray } from 'mobx';
import { ViewModel, TypeContent } from '../viewModel';
import { ArrFields } from '../../entities';
import { VmForm } from './vmForm';
export declare type ArrEditRow = (initValues: any, onRowChanged: (rowValues: any) => void) => Promise<void>;
export declare class VmArr extends ViewModel {
    protected readOnly: boolean;
    protected label: any;
    protected header: any;
    protected footer: any;
    protected rowValues: any;
    protected onEditRow: ArrEditRow;
    protected ownerForm: VmForm;
    protected vmForm: VmForm;
    protected rowContent: TypeContent;
    protected newSubmitCaption: string;
    protected editSubmitCaption: string;
    name: string;
    list: IObservableArray<any>;
    constructor(ownerForm: VmForm, arr: ArrFields, onEditRow?: ArrEditRow);
    reset(): void;
    protected rowPage: () => JSX.Element;
    private onSubmit;
    private onRowChanged;
    private renderItem;
    private showRow;
    private editRow;
    private addRow;
    protected view: () => JSX.Element;
}
