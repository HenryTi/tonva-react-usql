/// <reference types="react" />
import * as React from 'react';
import { TuidInputProps } from '../../ui';
export interface TuidInputState {
    id: number;
    proxyId: number;
    proxyName: string;
}
export declare class GeneralTuidInput extends React.Component<TuidInputProps, TuidInputState> {
    private id;
    constructor(props: any);
    componentWillMount(): Promise<void>;
    onPicked(value: any): void;
    onClick(): void;
    inputOnBlur(evt: any): void;
    render(): JSX.Element;
    private content(input);
    private idContent(caption, id);
}
