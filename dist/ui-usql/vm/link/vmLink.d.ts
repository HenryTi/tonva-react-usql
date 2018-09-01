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
    render(): React.SFCElement<{}>;
    protected readonly view: () => JSX.Element;
}
