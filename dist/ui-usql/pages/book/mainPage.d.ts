import * as React from 'react';
import { SubmitResult } from 'tonva-react-form';
import { BookUIProps } from '../../ui';
export declare class MainPage extends React.Component<BookUIProps> {
    private formRows;
    constructor(props: any);
    submit(values: any): Promise<SubmitResult | undefined>;
    render(): JSX.Element;
}
