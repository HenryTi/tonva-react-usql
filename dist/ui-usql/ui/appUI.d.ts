/// <reference types="react" />
import * as React from 'react';
import { EntitiesMapper } from './mapper';
import { EntitiesUI } from './entitiesUI';
export declare class AppUI {
    private appOwner;
    private appName;
    private entitiesUICollection;
    private uiMappers?;
    constructor(tonvaApp: string, uiMappers?: {
        [api: string]: EntitiesMapper;
    });
    apiUIs: EntitiesUI[];
    load(): Promise<void>;
    close(): void;
}
export declare class MainPage extends React.Component<{
    appUI: AppUI;
}> {
    private entityRender(ui, index);
    private entityClick<E, U>(ui);
    private renderList<E>(entitySet, caption);
    render(): JSX.Element;
}
