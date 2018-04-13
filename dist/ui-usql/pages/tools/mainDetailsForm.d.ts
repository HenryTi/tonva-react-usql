/// <reference types="react" />
import * as React from 'react';
import { SheetUI } from '../../ui';
import { Detail, MainDetails } from './model';
export interface MainDetailsFormProps {
    className?: string;
    ui: SheetUI;
    mainDetails: MainDetails;
    values: any;
    confirmLeave?: boolean;
    onSubmit: (values: any) => void;
}
export declare class MainDetailsForm extends React.Component<MainDetailsFormProps> {
    private values;
    private formRows;
    constructor(props: any);
    private onSubmit(values);
    onDetailEdit(detail: Detail, row: any): void;
    onDetailSubmit(detail: Detail, inValues: any, values: any): void;
    onNew(detail: Detail): void;
    private buildMainRows();
    render(): JSX.Element;
}
