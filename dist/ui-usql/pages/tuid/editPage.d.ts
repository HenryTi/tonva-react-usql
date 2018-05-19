/// <reference types="react" />
import * as React from 'react';
import { SubmitResult } from 'tonva-react-form';
import { TuidUIProps } from '../../ui';
import { TuidUI } from '../../ui';
export interface EditProps {
    master?: TuidUI;
    masterId?: number;
    onSubmited?: (res: any) => void;
}
export declare class EditPage extends React.Component<TuidUIProps & EditProps> {
    private form;
    private formRows;
    private slaveUIs;
    constructor(props: any);
    submit(values: any): Promise<SubmitResult | undefined>;
    next(): void;
    finish(): void;
    render(): JSX.Element;
    private buildFormView();
}
