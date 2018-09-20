import * as React from 'react';
import { VBand } from './vBand';
import { Field, ArrFields } from '../../entities';
import { VArr } from './vArr';
import { FormUI, FormUIBase, Compute } from '../formUI';
import { VField } from './vField';
import { VSubmit } from './vSubmit';
export declare type FieldCall = (form: VForm, field: string, values: any) => Promise<any>;
export interface FieldInput {
    call: FieldCall;
    content: React.StatelessComponent<any>;
    nullCaption: string;
}
export interface FieldInputs {
    [fieldOrArr: string]: FieldInput | {
        [field: string]: FieldInput;
    };
}
export interface FormValues {
    values: any;
    errors: any;
}
export interface FormOptions {
    fields: Field[];
    arrs?: ArrFields[];
    ui: FormUIBase;
    res: any;
    inputs: FieldInputs;
    submitCaption: string;
    arrNewCaption: string;
    arrEditCaption: string;
}
export declare class VForm {
    protected fields: Field[];
    protected arrs: ArrFields[];
    protected bands: VBand[];
    constructor(options: FormOptions, onSubmit: (values: any) => Promise<void>);
    onSubmit: (values: any) => Promise<void>;
    ui: FormUI;
    res: any;
    formValues: FormValues;
    compute: Compute;
    readOnly: boolean;
    vFields: {
        [name: string]: VField;
    };
    vArrs: {
        [name: string]: VArr;
    };
    vSubmit: VSubmit;
    inputs: FieldInputs;
    submitCaption: string;
    arrNewCaption: string;
    arrEditCaption: string;
    private buildBands;
    private onFormSubmit;
    protected view: ({ className }: {
        className: string;
    }) => JSX.Element;
    readonly values: any;
    setValues(initValues: any): void;
    readonly isOk: boolean;
    reset(): void;
    getValue(fieldName: string): any;
    setValue(fieldName: string, value: any): void;
    setError(fieldName: string, error: string): void;
    private buildFieldValues;
    private buildObservableValues;
    private buildFormValues;
    render(className?: string): JSX.Element;
}
