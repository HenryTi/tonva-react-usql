/// <reference types="react" />
import * as React from 'react';
import { SheetUIProps } from '../../ui';
export declare class SheetNewPage extends React.Component<SheetUIProps> {
    private mainDetails;
    constructor(props: any);
    successCallback(): void;
    onSubmit(values: any): Promise<void>;
    render(): JSX.Element;
}
