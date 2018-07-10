import * as React from 'react';
import { Action } from '../../entities';
import { VmEntity } from '../vmEntity';
export declare class VmActionMain extends VmEntity {
    entity: Action;
    readonly icon: JSX.Element;
    protected buildValuesFromSchema(): void;
    submit(): Promise<void>;
    render(): JSX.Element;
}
export declare class ActionPage extends React.Component<{
    vm: VmActionMain;
}> {
    render(): JSX.Element;
}
