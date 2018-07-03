import * as React from 'react';
import { TuidUISlaveProps } from '../../ui';
export declare class SlaveList extends React.Component<TuidUISlaveProps> {
    private pagedItems;
    constructor(props: any);
    componentWillMount(): Promise<void>;
    private itemClick;
    private onBindSlaveSaved;
    private itemRender;
    private addClick;
    private slaveChanged;
    private onNewSubmited;
    render(): JSX.Element;
}
