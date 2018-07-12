import * as React from 'react';
import { ViewModel } from '../viewModel';
import { Field, Arr } from '../field';
import { FormUI } from './formUI';
import { FormUIX, FieldUIX } from './formUIX';
import { VmControl } from './control';
import { VmApi } from '../vmApi';
import { VmArr } from './vmArr';
export interface FormValues {
    values: any;
    errors: any;
}
export interface VmFormOptions {
    fields: Field[];
    arrs?: Arr[];
    ui?: FormUI;
    readOnly?: boolean;
    vmApi?: VmApi;
}
export declare class VmForm extends ViewModel {
    protected fields: Field[];
    protected arrs: Arr[];
    protected onFieldsInputed: (values: any) => Promise<void>;
    protected vmApi: VmApi;
    init({ fields, arrs, ui, readOnly, vmApi }: VmFormOptions): void;
    onSubmit: (values: any) => Promise<void>;
    readOnly: boolean;
    controls: {
        [name: string]: VmControl;
    };
    ui: FormUIX;
    formValues: FormValues;
    vmArrs: {
        [name: string]: VmArr;
    };
    defaultSubmitCaption: any;
    submitCaption: any;
    values: any;
    readonly isOk: boolean;
    onSubmitButtonClick: () => Promise<void>;
    onFormSubmit: (event: React.FormEvent<any>) => boolean;
    reset(): void;
    getValue(fieldName: string): any;
    setValue(fieldName: string, value: any): void;
    protected buildControl(fieldUI: FieldUIX, formValues: FormValues): VmControl;
    private buildObservableValues;
    private buildFormValues;
    private buildBands;
    showBands(fieldNames: string[], submitCaption?: any, onSubmit?: (values: any) => Promise<void>): void;
    private buildFromBands;
    private static buttonContentRegex;
    private buildSumitConent;
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
    private buildVmArr;
    protected view: ({ vm }: {
        vm: VmForm;
    }) => JSX.Element;
}
