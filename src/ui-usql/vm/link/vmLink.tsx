import * as React from 'react';
import { CrEntity, EntityUI } from '../VM';
import { Entity } from '../../entities';

export abstract class VmLink {
    abstract onClick: () => void;
}

export class VmEntityLink extends VmLink {
    private crEntity: CrEntity<Entity, EntityUI>;

    constructor(crEntity: CrEntity<Entity, EntityUI>) {
        super();
        this.crEntity = crEntity;
    }

    onClick = async () => {
        await this.crEntity.start();
    }

    render() {
        return React.createElement(this.view);
    }

    protected get view() {
        return () => {
            let {icon, label} = this.crEntity;
            return <div className="px-3 py-2 align-items-center cursor-pointer" onClick={this.onClick}>
                {icon} &nbsp; {label}
            </div>;
        }
    }
}
