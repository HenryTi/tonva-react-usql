/// <reference types="react" />
import * as React from 'react';
import { SubmitResult } from 'tonva-react-form';
import { TuidUIProps } from '../../ui';
export declare class EditPage extends React.Component<TuidUIProps> {
    private form;
    private formRows;
    constructor(props: any);
    submit(values: any): Promise<SubmitResult | undefined>;
    next(): void;
    finish(): void;
    render(): JSX.Element;
    private buildFormView();
}
