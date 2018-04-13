/// <reference types="react" />
import * as React from 'react';
import { EntitiesMapper } from './ui';
export interface UsqlHomeProps {
    appName: string;
    uiMappers?: {
        [api: string]: EntitiesMapper;
    };
}
export interface State {
    uiLoaded: boolean;
}
export declare class UsqlHome extends React.Component<UsqlHomeProps, State> {
    private appUI;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
