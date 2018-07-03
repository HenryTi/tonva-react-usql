import { IObservableArray } from 'mobx';
import { ViewModel } from '../viewModel';
import { Field, Arr } from '../field';
import { FormUI, FieldUI } from './formUI';
import { VmControl } from './control';
import { VmApi } from '../vmApi';
export declare type TypeVmFieldsForm = typeof VmFieldsForm;
export interface FormValues {
    values: any;
    errors: any;
}
export interface ArrValues {
    formValues: FormValues;
    list: IObservableArray<any>;
}
export interface VmFormOptions {
    fields: Field[];
    arrs?: Arr[];
    onSubmit?: (values: any) => Promise<void>;
    ui?: FormUI;
    readOnly?: boolean;
    vmApi?: VmApi;
}
export declare class VmFieldsForm extends ViewModel {
    protected fields: Field[];
    protected arrs: Arr[];
    protected onSubmit: (values: any) => Promise<void>;
    protected readOnly: boolean;
    protected vmApi: VmApi;
    constructor({ fields, arrs, onSubmit, ui, readOnly, vmApi }: VmFormOptions);
    ui: FormUI;
    formValues: FormValues;
    arrValues: {
        [name: string]: ArrValues;
    };
    onSubmitButtonClick: () => Promise<void>;
    reset(): void;
    getValue(fieldName: string): any;
    setValue(fieldName: string, value: any): void;
    protected buildControl(fieldUI: FieldUI, formValues: FormValues): VmControl;
    private buildObservableValues;
    private buildFormValues;
    private buildObservableArrs;
    private buildBands;
    showBands(fieldNames: string[], submitCaption?: any): void;
    private buildFromBands;
    private buildSubmit;
    private buildFieldBandUI;
    private buildFieldsBandUI;
    private buildFieldControl;
    private buildArrBandUI;
    private buildOnFly;
    private buildFromFields;
    private typeFromField;
    private buildArrBand;
    private buildArrsBands;
    private buildArrList;
    protected view: ({ vm }: {
        vm: VmFieldsForm;
    }) => JSX.Element;
}
