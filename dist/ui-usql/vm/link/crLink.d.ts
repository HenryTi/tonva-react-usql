import * as React from 'react';
import { Coordinator } from '../VM';
export declare abstract class Link {
    abstract onClick: () => void;
    abstract render(className?: string): JSX.Element;
}
export declare class CrLink extends Link {
    private coordinator;
    protected icon: string | JSX.Element;
    protected label: string | JSX.Element;
    constructor(coordinator: Coordinator);
    onClick: () => Promise<void>;
    render(className?: string): React.SFCElement<string>;
    protected view: (className?: string) => JSX.Element;
}
