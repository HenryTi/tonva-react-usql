/// <reference types="react" />
import * as React from 'react';
import { TuidUISlaveProps } from '../../ui';
export declare class SlaveList extends React.Component<TuidUISlaveProps> {
    private pagedItems;
    private items;
    constructor(props: any);
    componentWillMount(): Promise<void>;
    private itemClick(item);
    private onSlaveSaved(res);
    private itemRender(item, index);
    private newClick();
    private onNewSubmited(res);
    render(): JSX.Element;
}
