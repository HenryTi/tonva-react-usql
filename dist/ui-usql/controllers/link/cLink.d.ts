import * as React from 'react';
import { Controller } from 'tonva-tools';
export declare abstract class Link {
    abstract onClick: () => void;
    abstract render(className?: string): JSX.Element;
}
export declare class CLink extends Link {
    private controller;
    protected icon: string | JSX.Element;
    protected label: string | JSX.Element;
    constructor(controller: Controller);
    onClick: () => Promise<void>;
    render(className?: string): React.FunctionComponentElement<string>;
    protected view: (className?: string) => JSX.Element;
}
