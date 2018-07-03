import { TypeContent, ViewModel } from "../viewModel";
import { Field } from "../field";
import { VmControl } from "./control";
import { TypeFieldBand, TypeFieldsBand, TypeArrBand, TypeSubmitBand } from './band';
export interface FormUI {
    className?: string;
    bands: BandUI[];
    visibleBands?: BandUI[];
}
export declare type BandUI = FieldBandUI | FieldsBandUI | ArrBandUI | SubmitBandUI;
export interface FieldBandUI extends FieldUI {
    label: string;
    band?: TypeFieldBand;
    key?: string;
}
export interface FieldsBandUI {
    type?: 'fields';
    label: string;
    fieldUIs: FieldUI[];
    band?: TypeFieldsBand;
    key?: string;
}
export interface ArrBandUI {
    type?: 'arr';
    label: string;
    name?: string;
    row: TypeContent;
    bands: BandUI[];
    vmList?: ViewModel;
    band?: TypeArrBand;
    key?: string;
}
export interface SubmitBandUI {
    type: 'submit';
    content: any;
    onSubmit?: () => void;
    band?: TypeSubmitBand;
    key?: string;
}
export interface FieldUI {
    name: string;
    type: 'tuid' | 'string' | 'int' | 'dec' | 'text' | 'check' | 'select' | 'radio';
    field?: Field;
    control?: VmControl;
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
