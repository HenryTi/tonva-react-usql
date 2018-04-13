/// <reference types="react" />
import * as React from 'react';
import { TuidUIProps } from '../../ui';
export declare class MainPage extends React.Component<TuidUIProps> {
    constructor(props: any);
    addNew(): void;
    list(): void;
    onSearch(key: string): void;
    render(): JSX.Element;
}
