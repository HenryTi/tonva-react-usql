import * as React from 'react';
import { SheetUIProps } from '../../ui';
export declare class StateSheetList extends React.Component<SheetUIProps> {
    constructor(props: any);
    componentWillMount(): Promise<void>;
    click(brief: any): Promise<void>;
    renderRow(row: any, index: number): JSX.Element;
    render(): JSX.Element;
}
