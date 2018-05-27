/// <reference types="react" />
import * as React from 'react';
import { TuidInputProps } from '../../ui';
export interface DropDownTuidInputState {
    id: number;
    proxyId: number;
    proxyName: string;
}
export declare class DropDownTuidInput extends React.Component<TuidInputProps, DropDownTuidInputState> {
    private id;
    constructor(props: any);
    componentWillMount(): Promise<void>;
    onSelect(evt: React.ChangeEvent<any>): void;
    render(): JSX.Element;
}
