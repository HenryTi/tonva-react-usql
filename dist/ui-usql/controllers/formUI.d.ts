/// <reference types="react" />
export declare type FieldUIType = 'tuid' | 'query' | 'string' | 'int' | 'dec' | 'text' | 'check' | 'select' | 'radio';
export interface FieldUI {
    editable?: boolean;
    required?: boolean;
}
export interface FieldInputUI extends FieldUI {
}
export interface FieldStringUI extends FieldInputUI {
    length?: number;
}
export interface FieldNumberUI extends FieldInputUI {
    min?: number;
    max?: number;
}
export interface FieldTuidUI extends FieldInputUI {
    autoList?: boolean;
}
export interface FieldGroup {
    edits: FieldUI[];
}
export interface FormArr extends /*FormItem,*/ FormUIBase {
    rowContent?: React.StatelessComponent<any>;
}
export declare type FormItem = FieldUI | FieldGroup | FormArr | ((values: any) => number);
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
