import * as React from 'react';
import { TypeContent, ViewModel } from "../viewModel";
import { Field } from "../field";
import { VmControl } from "./control";
import { TypeFieldBand, TypeFieldsBand, TypeArrBand, TypeSubmitBand } from './band';

export interface FormUI {
    className?: string;
    bands: BandUI[];
    visibleBands?: BandUI[];
}

export type BandUI = FieldBandUI | FieldsBandUI | ArrBandUI | SubmitBandUI;

export interface FieldBandUI extends FieldUI {
    label: string;
    //fieldUI: FieldUI;                 // 对应的field ui
    band?: TypeFieldBand;
    key?: string;
}

export interface FieldsBandUI {
    type?: 'fields';
    label: string;
    fieldUIs: FieldUI[];                // 对应的多个field ui
    band?: TypeFieldsBand;
    key?: string;
}

export interface ArrBandUI {
    type?: 'arr';
    label: string;
    name?: string;
    row: TypeContent;                   // arr 行的显示方式
    bands: BandUI[];                    // 下一级页面的展开描述
    //control?: VmControl;                // list control element
    vmList?: ViewModel;                  // list view model
    band?: TypeArrBand;
    key?: string;
}

export interface SubmitBandUI {
    type: 'submit';
    content: any;                    // 显示在按钮上的文本
    //control?: VmControl;                // button control element
    onSubmit?: () => void;
    band?: TypeSubmitBand;
    key?: string;
}

export interface FieldUI {
    name: string;           // field name 对应
    type: 'tuid' | 'string' | 'int' | 'dec' | 'text' | 'check' | 'select' | 'radio';
    field?: Field;
    control?: VmControl;              // field control element
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
