import * as React from 'react';
import { CrEntity, EntityUI } from '../VM';
import { Entity } from '../../entities';
export declare abstract class VmLink {
    abstract onClick: () => void;
}
export declare class VmEntityLink extends VmLink {
    private crEntity;
    constructor(crEntity: CrEntity<Entity, EntityUI>);
    onClick: () => Promise<void>;
    render(className?: string): React.SFCElement<string>;
    protected view: (className?: string) => JSX.Element;
}
