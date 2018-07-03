import * as React from 'react';
import { TuidUIBindSlaveProps } from '../../ui';
export declare class BindSlaveList extends React.Component<TuidUIBindSlaveProps> {
    private pagedItems;
    private items;
    constructor(props: any);
    componentWillMount(): Promise<void>;
    private itemClick;
    private onBindSlaveSaved;
    private itemRender;
    private newClick;
    private onNewSubmited;
    render(): JSX.Element;
}
