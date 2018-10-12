/// <reference types="react" />
import { IObservableArray } from 'mobx';
import { ViewModel, TypeContent } from './viewModel';
import { ArrFields } from '../../entities';
import { VForm, FormMode } from './vForm';
export declare type ArrEditRow = (initValues: any, onRowChanged: (rowValues: any) => void) => Promise<void>;
export declare class VArr extends ViewModel {
    protected mode: FormMode;
    protected label: any;
    protected header: any;
    protected footer: any;
    protected rowValues: any;
    protected onEditRow: ArrEditRow;
    protected ownerForm: VForm;
    protected vForm: VForm;
    protected rowContent: TypeContent;
    protected none: string;
    protected newSubmitCaption: string;
    protected editSubmitCaption: string;
    protected addRow: () => Promise<void>;
    name: string;
    list: IObservableArray<any>;
    constructor(ownerForm: VForm, arr: ArrFields, onEditRow?: ArrEditRow);
    reset(): void;
    setAddRow(addRow: () => Promise<void>): void;
    protected rowPage: () => JSX.Element;
    private onSubmit;
    private onRowChanged;
    private renderItem;
    private showRow;
    private editRow;
    private internalAddRow;
    protected view: () => JSX.Element;
}
