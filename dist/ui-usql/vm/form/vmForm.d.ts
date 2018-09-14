import * as React from 'react';
import { VmBand } from './vmBand';
import { Field, ArrFields } from '../../entities';
import { VmArr } from './vmArr';
import { FormUI, FormUIBase, Compute } from '../formUI';
import { VmField } from './vmField';
import { VmSubmit } from './vmSubmit';
export declare type FieldCall = (form: VmForm, field: string, values: any) => Promise<any>;
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
export declare class VmForm {
    protected fields: Field[];
    protected arrs: ArrFields[];
    protected bands: VmBand[];
    constructor(options: FormOptions, onSubmit: (values: any) => Promise<void>);
    onSubmit: (values: any) => Promise<void>;
    ui: FormUI;
    res: any;
    formValues: FormValues;
    compute: Compute;
    readOnly: boolean;
    vmFields: {
        [name: string]: VmField;
    };
    vmArrs: {
        [name: string]: VmArr;
    };
    vmSubmit: VmSubmit;
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
