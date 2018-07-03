import * as React from 'react';
import { EntitiesMapper } from './mapper';
import { EntitiesUI } from './entitiesUI';
export declare class AppUI {
    private appOwner;
    private appName;
    private entitiesUICollection;
    private uiMappers?;
    caption: string;
    constructor(tonvaApp: string, caption: string, uiMappers?: {
        [api: string]: EntitiesMapper;
    });
    apiUIs: EntitiesUI[];
    load(): Promise<void>;
}
export declare class MainPage extends React.Component<{
    appUI: AppUI;
}> {
    private entityRender;
    private entityClick;
    private renderList;
    private logout;
    render(): JSX.Element;
}
