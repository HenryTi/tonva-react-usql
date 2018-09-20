import * as React from 'react';
import { ViewModel } from "../../viewModel";
import { FormValues } from '../vForm';
import { Rule } from '../rule';
import { Field } from '../../../entities';
import { FieldUI, InputUI, NumberUI, Compute, StringUI } from '../../formUI';
export declare abstract class VField extends ViewModel {
    protected fieldUI: FieldUI;
    protected field: Field;
    protected formValues: FormValues;
    protected formReadOnly: boolean;
    protected rules: Rule[];
    protected formCompute: Compute;
    constructor(field: Field, fieldUI: FieldUI, formValues: FormValues, formCompute: Compute, readOnly: boolean);
    name: string;
    protected init(): void;
    protected buildRules(): void;
    readonly checkRules: string[];
    readonly isOk: boolean;
    readonly value: any;
    setValue(v: any): void;
    error: any;
    protected parse(str: string): any;
    readonly readOnly: boolean;
}
export declare class VUnknownField extends VField {
    protected view: () => JSX.Element;
}
export declare abstract class VInputControl extends VField {
    protected fieldUI: InputUI;
    protected input: HTMLInputElement;
    protected inputType: string;
    protected readonly maxLength: number;
    protected renderError: (className: string) => JSX.Element;
    readonly value: any;
    setValue(v: any): void;
    protected ref: (input: HTMLInputElement) => void;
    private setInputValue;
    protected onFocus: () => void;
    protected onBlur: () => void;
    protected onChange: (evt: React.ChangeEvent<any>) => void;
    protected onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    protected view: () => JSX.Element;
}
export declare const RedMark: () => JSX.Element;
export declare class VStringField extends VInputControl {
    protected fieldUI: StringUI;
    protected inputType: string;
    protected readonly maxLength: number;
}
export declare abstract class VNumberControl extends VInputControl {
    protected fieldUI: NumberUI;
    protected extraChars: number[];
    protected init(): void;
    protected buildRules(): void;
    inputType: string;
    protected parse(text: string): any;
    protected onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    private onKeyDot;
    private onKeyNeg;
}
export declare class VIntField extends VNumberControl {
    protected buildRules(): void;
}
export declare class VDecField extends VNumberControl {
}
export declare class VTextField extends VStringField {
}
export declare class VDateTimeField extends VStringField {
}
