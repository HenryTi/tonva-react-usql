import { Field } from "../field";
import { VmControl } from "./control";
import { TypeFieldBand, TypeFieldsBand, TypeArrBand, TypeSubmitBand } from './band';
import { FormUI, FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI, FieldUI, TuidUI, InputUI, StringUI, IntUI, DecUI, TextUI, CheckUI, SelectUI, RadioUI } from './formUI';
import { VmForm } from './vmForm';
import { VmArr } from './vmArr';
export interface FormUIX extends FormUI {
    bands: BandUIX[];
    visibleBands?: BandUIX[];
}
export declare type BandUIX = FieldBandUIX | FieldsBandUIX | ArrBandUIX | SubmitBandUIX;
export interface FieldBandUIX extends FieldBandUI, FieldUIX {
    band?: TypeFieldBand;
    key?: string;
}
export interface FieldsBandUIX extends FieldsBandUI {
    type?: 'fields';
    band?: TypeFieldsBand;
    key?: string;
    fieldUIs: FieldUIX[];
    form?: VmForm;
}
export interface ArrBandUIX extends ArrBandUI {
    name?: string;
    type?: 'arr';
    vmArr?: VmArr;
    band?: TypeArrBand;
    key?: string;
    form?: VmForm;
}
export interface SubmitBandUIX extends SubmitBandUI {
    onSubmit?: () => void;
    band?: TypeSubmitBand;
    key?: string;
    form?: VmForm;
}
export interface FieldUIXBase {
    field?: Field;
    control?: VmControl;
    form?: VmForm;
}
export interface FieldUIX extends FieldUI, FieldUIXBase {
}
export interface TuidUIX extends TuidUI, FieldUIXBase {
}
export interface InputUIX extends InputUI, FieldUIXBase {
    placeholder: string;
}
export interface StringUIX extends StringUI, FieldUIXBase {
}
export interface IntUIX extends IntUI, FieldUIXBase {
}
export interface DecUIX extends DecUI, FieldUIXBase {
}
export interface TextUIX extends TextUI, FieldUIXBase {
}
export interface CheckUIX extends CheckUI, FieldUIXBase {
}
export interface SelectUIX extends SelectUI, FieldUIXBase {
}
export interface RadioUIX extends RadioUI, FieldUIXBase {
}
