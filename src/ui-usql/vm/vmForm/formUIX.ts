import * as React from 'react';
import { TypeContent, ViewModel } from "../viewModel";
import { Field } from "../field";
import { VmControl } from "./control";
import { TypeFieldBand, TypeFieldsBand, TypeArrBand, TypeSubmitBand } from './band';
import { FormUI, FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI, FieldUI,
    TuidUI, InputUI, StringUI, IntUI, DecUI, TextUI, CheckUI, SelectUI, RadioUI } from './formUI';
import { VmForm } from './vmForm';
import { VmArr } from './vmArr';

export interface FormUIX extends FormUI {
    bands: BandUIX[];
    visibleBands?: BandUIX[];
}

export type BandUIX = FieldBandUIX | FieldsBandUIX | ArrBandUIX | SubmitBandUIX;

export interface FieldBandUIX extends FieldBandUI, FieldUIX {
    band?: TypeFieldBand;
    key?: string;
}

export interface FieldsBandUIX extends FieldsBandUI {
    type?: 'fields';
    band?: TypeFieldsBand;
    key?: string;
    fieldUIs: FieldUIX[];                // 对应的多个field ui
    form?: VmForm;
}

export interface ArrBandUIX extends ArrBandUI {
    name?: string;
    type?: 'arr';
    vmArr?: VmArr;                  // list view model
    band?: TypeArrBand;
    key?: string;
    form?: VmForm;
    //bands: BandUIX[];                    // 下一级页面的展开描述
}

export interface SubmitBandUIX extends SubmitBandUI {
    //type: 'submit';
    //content: any;                    // 显示在按钮上的文本
    onSubmit?: () => void;
    band?: TypeSubmitBand;
    key?: string;
    form?: VmForm;
}

export interface FieldUIXBase {
    field?: Field;
    control?: VmControl;              // field control element
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
    //type: 'string';
}

export interface IntUIX extends IntUI, FieldUIXBase {
    //type: 'int';
}

export interface DecUIX extends DecUI, FieldUIXBase {
    //type: 'dec';
}

export interface TextUIX extends TextUI, FieldUIXBase {
    //type: 'text';
} 

export interface CheckUIX extends CheckUI, FieldUIXBase {
    //type: 'check';
}

export interface SelectUIX extends SelectUI, FieldUIXBase {
    //type: 'select';
}

export interface RadioUIX extends RadioUI, FieldUIXBase {
    //type: 'radio';
}
