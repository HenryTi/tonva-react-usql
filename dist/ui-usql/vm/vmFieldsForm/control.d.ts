import * as React from 'react';
import { FieldUI } from "./formUI";
import { ViewModel } from "../viewModel";
import { FormValues } from './vmFieldsForm';
export declare function buildControl(fieldUI: FieldUI, formValues: FormValues): VmControl;
export declare abstract class VmControl extends ViewModel {
    fieldUI: FieldUI;
    protected formValues: FormValues;
    protected name: string;
    constructor(fieldUI: FieldUI, formValues: FormValues);
    value: any;
    error: any;
    protected parse(str: string): any;
}
export declare class VmUnknownControl extends VmControl {
    protected view: ({ vm }: {
        vm: VmControl;
    }) => JSX.Element;
}
export declare abstract class VmInputControl extends VmControl {
    private input;
    inputType: string;
    renderError: () => JSX.Element;
    reset(): void;
    ref: (input: HTMLInputElement) => void;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (evt: React.ChangeEvent<any>) => void;
    protected view: ({ vm }: {
        vm: VmInputControl;
    }) => JSX.Element;
}
export declare class VmStringControl extends VmInputControl {
    inputType: string;
}
export declare abstract class VmNumberControl extends VmInputControl {
    inputType: string;
    protected parse(text: string): any;
}
export declare class VmIntControl extends VmNumberControl {
}
export declare class VmDecControl extends VmNumberControl {
}
