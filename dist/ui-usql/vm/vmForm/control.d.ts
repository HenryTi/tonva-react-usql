import * as React from 'react';
import { ViewModel } from "../viewModel";
import { FormValues } from './vmForm';
import { InputUIX, FieldUIX, NumberUIX } from './formUIX';
import { Rule } from './rule';
export declare type TypeControl = React.StatelessComponent<{
    vm: ViewModel;
    className: string;
}>;
export declare function buildControl(fieldUI: FieldUIX, formValues: FormValues): VmControl;
export declare abstract class VmControl extends ViewModel {
    fieldUI: FieldUIX;
    protected formValues: FormValues;
    protected name: string;
    protected rules: Rule[];
    constructor(fieldUI: FieldUIX, formValues: FormValues);
    protected buildRules(): void;
    readonly checkRules: string[];
    readonly isOk: boolean;
    value: any;
    error: any;
    protected parse(str: string): any;
}
export declare class VmUnknownControl extends VmControl {
    protected view: ({ vm, className }: {
        vm: VmControl;
        className: string;
    }) => JSX.Element;
}
export declare abstract class VmInputControl extends VmControl {
    fieldUI: InputUIX;
    private input;
    inputType: string;
    renderError: (className: string) => JSX.Element;
    value: any;
    ref: (input: HTMLInputElement) => void;
    private setInputValue;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (evt: React.ChangeEvent<any>) => void;
    protected view: ({ vm, className }: {
        vm: VmInputControl;
        className: string | string[];
    }) => JSX.Element;
}
export declare const RedMark: () => JSX.Element;
export declare class VmStringControl extends VmInputControl {
    inputType: string;
}
export declare abstract class VmNumberControl extends VmInputControl {
    fieldUI: NumberUIX;
    protected buildRules(): void;
    inputType: string;
    protected parse(text: string): any;
}
export declare class VmIntControl extends VmNumberControl {
    protected buildRules(): void;
}
export declare class VmDecControl extends VmNumberControl {
}
