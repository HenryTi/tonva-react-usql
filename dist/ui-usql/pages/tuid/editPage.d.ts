import * as React from 'react';
import { SubmitResult } from 'tonva-react-form';
import { TuidUIProps } from '../../ui';
import { TuidUIO } from '../../ui';
export interface EditProps {
    master?: TuidUIO;
    masterId?: number;
    onSubmited?: (res: any) => void;
}
export declare class EditPage extends React.Component<TuidUIProps & EditProps> {
    private form;
    private formRows;
    private bindSlaveUIs;
    constructor(props: any);
    submit(values: any): Promise<SubmitResult | undefined>;
    next(): void;
    finish(): void;
    private renderSlaveInputs;
    render(): JSX.Element;
    private buildFormView;
}
