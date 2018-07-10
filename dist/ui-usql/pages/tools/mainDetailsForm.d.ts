import * as React from 'react';
import { SheetUIO } from '../../ui';
import { Detail, MainDetails } from './model';
export interface MainDetailsFormProps {
    className?: string;
    ui: SheetUIO;
    mainDetails: MainDetails;
    values: any;
    confirmLeave?: boolean;
    onSubmit: (values: any) => void;
}
export declare class MainDetailsForm extends React.Component<MainDetailsFormProps> {
    private values;
    private formRows;
    constructor(props: any);
    private onSubmit;
    onDetailEdit(detail: Detail, row: any): void;
    onDetailSubmit(detail: Detail, inValues: any, values: any): void;
    onNew(detail: Detail): void;
    private buildMainRows;
    render(): JSX.Element;
}
