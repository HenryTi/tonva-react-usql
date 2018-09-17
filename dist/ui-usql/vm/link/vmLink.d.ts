import * as React from 'react';
import { CrEntity, EntityUI, Coordinator } from '../VM';
import { Entity } from '../../entities';
export declare abstract class VmLink {
    abstract onClick: () => void;
}
export declare class VmCrLink extends VmLink {
    private coordinator;
    protected icon: JSX.Element;
    protected label: string | JSX.Element;
    constructor(coordinator: Coordinator, icon: JSX.Element, label: string | JSX.Element);
    onClick: () => Promise<void>;
    render(className?: string): React.SFCElement<string>;
    protected view: (className?: string) => JSX.Element;
}
export declare class VmEntityLink extends VmCrLink {
    constructor(crEntity: CrEntity<Entity, EntityUI>);
}
