import * as React from 'react';
import { EntitiesMapper } from './ui';
export interface UsqlHomeProps {
    appName: string;
    caption?: string;
    ui?: any;
    uiMappers?: {
        [api: string]: EntitiesMapper;
    };
}
export declare class UsqlHome extends React.Component<UsqlHomeProps> {
    private appUI;
    private vmApp;
    private view;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
