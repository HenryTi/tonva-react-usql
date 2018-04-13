/// <reference types="react" />
import * as React from 'react';
import { EntitiesUIProps } from '../ui';
export declare class Main extends React.Component<EntitiesUIProps> {
    constructor(props: any);
    private entityRender(ui, index);
    private entityClick<E, U>(ui);
    private renderList<E>(entitySet, caption);
    render(): JSX.Element;
}
