/// <reference types="react" />
import * as React from 'react';
import { SheetUIProps } from '../../ui';
export declare class MainPage extends React.Component<SheetUIProps> {
    constructor(props: any);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    onWsReceive(data: any): Promise<void>;
    newClick(): void;
    schemaClick(): void;
    sheetStateClick(state: any): void;
    archivesClick(): void;
    renderState(row: any, index: number): JSX.Element;
    render(): JSX.Element;
}
