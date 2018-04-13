/// <reference types="react" />
import * as React from 'react';
import { TuidInputProps } from '../../ui';
export declare class GeneralTuidInput extends React.Component<TuidInputProps> {
    private id;
    private tuidUI;
    constructor(props: any);
    onPicked(value: any): void;
    onClick(): void;
    inputOnBlure(evt: any): void;
    render(): JSX.Element;
}
