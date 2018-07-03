import * as React from 'react';
import { TuidUIProps } from '../../ui';
export interface State {
    more: boolean;
    rows: any[];
}
export declare class ListPage extends React.Component<TuidUIProps, State> {
    constructor(props: any);
    componentDidMount(): Promise<void>;
    click(row: any): void;
    mapper(row: any, index: number): JSX.Element;
    render(): JSX.Element;
}
