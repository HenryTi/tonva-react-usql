import * as React from 'react';
import { ViewModel } from "../viewModel";
import { VForm } from '../vForm';
import { Rule } from '../rule';
import { Field } from '../../../entities';
import { FieldRes } from '../vBand';
import { FieldUI, FieldInputUI, FieldStringUI, FieldNumberUI } from '../../formUI';
export declare abstract class VField extends ViewModel {
    protected form: VForm;
    protected fieldUI: FieldUI;
    protected fieldRes: FieldRes;
    protected field: Field;
    protected rules: Rule[];
    constructor(form: VForm, field: Field, fieldUI: FieldUI, fieldRes: FieldRes);
    name: string;
    protected init(): void;
    protected buildRules(): void;
    readonly checkRules: string[];
    readonly isOk: boolean;
    readonly value: any;
    setValue(v: any): void;
    error: any;
    protected parse(str: string): any;
    readonly readonly: boolean;
}
export declare class VUnknownField extends VField {
    protected view: () => JSX.Element;
}
export declare abstract class VInputControl extends VField {
    protected fieldUI: FieldInputUI;
    protected input: HTMLInputElement;
    protected inputType: string;
    protected readonly maxLength: number;
    protected renderError: (className: string) => JSX.Element;
    setValue(v: any): void;
    protected ref: (input: HTMLInputElement) => void;
    protected setInputValue(): void;
    protected onFocus: () => void;
    protected onBlur: () => void;
    protected onChange: (evt: React.ChangeEvent<any>) => void;
    protected onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    protected view: () => JSX.Element;
}
export declare const RedMark: () => JSX.Element;
export declare class VStringField extends VInputControl {
    protected fieldUI: FieldStringUI;
    protected inputType: string;
    protected readonly maxLength: number;
}
export declare abstract class VNumberControl extends VInputControl {
    protected fieldUI: FieldNumberUI;
    protected extraChars: number[];
    protected init(): void;
    protected buildRules(): void;
    inputType: string;
    protected parse(text: string): any;
    protected setInputValue(): void;
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
export declare class VDateField extends VStringField {
}
