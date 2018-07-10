import { TypeContent } from "../viewModel";
export interface FormUI {
    bands: BandUI[];
    className?: string;
}
export declare type BandUI = FieldBandUI | FieldsBandUI | ArrBandUI | SubmitBandUI;
export interface FieldBandUI extends FieldUI {
    label: string;
}
export interface FieldsBandUI {
    label: string;
    fieldUIs: FieldUI[];
}
export interface ArrBandUI {
    label: string;
    row: TypeContent;
    bands: BandUI[];
}
export interface SubmitBandUI {
    type: 'submit';
    content: any;
}
export interface FieldUI {
    name: string;
    type: 'tuid' | 'string' | 'int' | 'dec' | 'text' | 'check' | 'select' | 'radio';
    readOnly?: boolean;
}
export interface TuidUI extends FieldUI {
    type: 'tuid';
}
export interface InputUI extends FieldUI {
    placeHolder: string;
}
export interface StringUI extends InputUI {
    type: 'string';
}
export interface IntUI extends InputUI {
    type: 'int';
}
export interface DecUI extends InputUI {
    type: 'dec';
}
export interface TextUI extends InputUI {
    type: 'text';
}
export interface CheckUI extends FieldUI {
    type: 'check';
}
export interface SelectUI extends FieldUI {
    type: 'select';
}
export interface RadioUI extends FieldUI {
    type: 'radio';
}
