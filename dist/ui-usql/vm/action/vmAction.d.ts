import * as React from 'react';
import { Action } from '../../entities';
import { VmEntity } from '../entity';
export declare class VmActionMain extends VmEntity {
    entity: Action;
    readonly icon: JSX.Element;
    protected initValues(): void;
    submit(): Promise<void>;
    renderView(): JSX.Element;
}
export declare class ActionPage extends React.Component<{
    vm: VmActionMain;
}> {
    render(): JSX.Element;
}
