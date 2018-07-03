import * as React from 'react';
import { TuidUIProps } from '../../ui';
export declare class ListPage extends React.Component<TuidUIProps> {
    private pagedItems;
    constructor(props: any);
    componentWillMount(): Promise<void>;
    onSearch(key: string): Promise<void>;
    renderRow(item: any, index: number): JSX.Element;
    rowClick(item: any): Promise<void>;
    render(): JSX.Element;
}
