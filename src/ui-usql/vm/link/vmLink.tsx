import * as React from 'react';
import classNames from 'classnames';
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

    render(className?:string) {
        return React.createElement(this.view, className);
    }

    protected view = (className?:string) => {
        let {icon, label} = this.crEntity;
        return <div
            className={classNames('px-3', 'py-2', 'align-items-center', 'cursor-pointer', className)}
            onClick={this.onClick}>
            {icon} &nbsp; {label}
        </div>;
    }
}
