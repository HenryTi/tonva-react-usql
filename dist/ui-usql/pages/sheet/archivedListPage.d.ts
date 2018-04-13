/// <reference types="react" />
import * as React from 'react';
import { SheetUIProps } from '../../ui';
export interface State {
    rows: any[];
}
export declare class ArchivedListPage extends React.Component<SheetUIProps, State> {
    constructor(props: any);
    componentDidMount(): Promise<void>;
    click(brief: any): void;
    mapper(row: any, index: number): JSX.Element;
    render(): JSX.Element;
}
