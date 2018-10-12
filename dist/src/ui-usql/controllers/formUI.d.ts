/// <reference types="react" />
export declare type FieldUIType = 'tuid' | 'query' | 'string' | 'int' | 'dec' | 'text' | 'check' | 'select' | 'radio';
export interface FieldEdit {
    editable?: boolean;
    required?: boolean;
}
export interface FieldInput extends FieldEdit {
}
export interface FieldString extends FieldInput {
    length?: number;
}
export interface FieldNumber extends FieldInput {
    min?: number;
    max?: number;
}
export interface FieldGroup {
    edits: FieldEdit[];
}
export interface FormArr extends /*FormItem,*/ FormUIBase {
    rowContent?: React.StatelessComponent<any>;
}
export declare type FormItem = FieldEdit | FieldGroup | FormArr | ((values: any) => number);
export declare type FormItems = {
    [name: string]: FormItem;
};
export interface FormUIBase {
    className?: string;
    items?: FormItems;
    layout?: string[];
}
export interface FormUI extends FormUIBase {
}
