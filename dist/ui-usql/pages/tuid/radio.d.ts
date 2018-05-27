/// <reference types="react" />
import * as React from 'react';
import { TuidInputProps } from '../../ui';
export interface RadioTuidInputState {
    id: number;
    proxyId: number;
    proxyName: string;
}
export declare class RadioTuidInput extends React.Component<TuidInputProps, RadioTuidInputState> {
    private id;
    constructor(props: any);
    componentWillMount(): Promise<void>;
    onClick(evt: React.ChangeEvent<any>): void;
    render(): JSX.Element;
    private content(input);
}
