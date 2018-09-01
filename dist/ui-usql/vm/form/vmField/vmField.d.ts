import * as React from 'react';
import { ViewModel } from "../../viewModel";
import { FormValues } from '../vmForm';
import { Rule } from '../rule';
import { Field } from '../../../entities';
import { FieldUI, InputUI, NumberUI } from '../formUI';
export declare abstract class VmField extends ViewModel {
    protected fieldUI: FieldUI;
    protected field: Field;
    protected formValues: FormValues;
    protected formReadOnly: boolean;
    protected rules: Rule[];
    constructor(field: Field, fieldUI: FieldUI, formValues: FormValues, readOnly: boolean);
    name: string;
    protected buildRules(): void;
    readonly checkRules: string[];
    readonly isOk: boolean;
    readonly value: any;
    setValue(v: any): void;
    error: any;
    protected parse(str: string): any;
    readonly readOnly: boolean;
}
export declare class VmUnknownField extends VmField {
    protected view: () => JSX.Element;
}
export declare abstract class VmInputControl extends VmField {
    fieldUI: InputUI;
    private input;
    inputType: string;
    renderError: (className: string) => JSX.Element;
    readonly value: any;
    setValue(v: any): void;
    ref: (input: HTMLInputElement) => void;
    private setInputValue;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (evt: React.ChangeEvent<any>) => void;
    protected view: () => JSX.Element;
}
export declare const RedMark: () => JSX.Element;
export declare class VmStringField extends VmInputControl {
    inputType: string;
}
export declare abstract class VmNumberControl extends VmInputControl {
    fieldUI: NumberUI;
    protected buildRules(): void;
    inputType: string;
    protected parse(text: string): any;
}
export declare class VmIntField extends VmNumberControl {
    protected buildRules(): void;
}
export declare class VmDecField extends VmNumberControl {
}
export declare class VmTextField extends VmStringField {
}
export declare class VmDateTimeField extends VmStringField {
}
