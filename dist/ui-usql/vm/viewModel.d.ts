import * as React from 'react';
export declare type TypeView = React.StatelessComponent<{
    vm: ViewModel;
}>;
export declare type TypeContent = React.StatelessComponent<any>;
export declare abstract class ViewModel {
    load(): Promise<void>;
    protected view: TypeView;
    renderView(): JSX.Element;
}
export declare const JSONContent: (values: any) => JSX.Element;
export declare const RowContent: (values: any) => JSX.Element;
