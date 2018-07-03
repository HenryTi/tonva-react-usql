import * as React from 'react';
import { TuidUIProps } from '../../ui';
export declare class SearchPage extends React.Component<TuidUIProps> {
    private pagedItems;
    constructor(props: any);
    componentWillMount(): void;
    onSearch(key: string): Promise<void>;
    renderRow(item: any, index: number): JSX.Element;
    rowClick(item: any): Promise<void>;
    render(): JSX.Element;
}
