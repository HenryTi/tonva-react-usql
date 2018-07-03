import * as React from 'react';
import { SheetUIProps } from '../../ui';
export interface State {
    flows: any;
    data: any;
}
export declare class ArchivedSheet extends React.Component<SheetUIProps, State> {
    private mainDetails;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    mapper(row: any, index: number): JSX.Element;
    render(): JSX.Element;
}
