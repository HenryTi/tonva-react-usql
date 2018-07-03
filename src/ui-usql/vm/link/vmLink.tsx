import * as React from 'react';
import { nav } from 'tonva-tools';
import { Entity, Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { VmEntity } from '../entity';
import { VmActionMain } from '../action';
import { VmTuidMain } from '../tuid';
import { VmQueryMain } from '../query';
import { VmSheetMain } from '../sheet';
import { VmBookMain } from '../book';

export abstract class VmLink extends ViewModel {
    abstract onClick: () => void;
}

export class VmEntityLinkBase<T extends VmEntity> extends VmLink {
    vmEntity: T

    constructor(vmEntity: T, link: TypeLink) {
        super();
        this.vmEntity = vmEntity;
        this.view = link;
    }

    onClick = async () => {
        await this.vmEntity.load();
        nav.push(this.vmEntity.renderView());
    }
}

export class VmEntityLink<T extends VmEntity> extends VmEntityLinkBase<T> {
    constructor(vmEntity: T) {
        super(vmEntity, Link);
    }
}

export type TypeLink = React.StatelessComponent<{vm: VmEntityLinkBase<any>}>;

const Link = ({vm}:{vm: VmEntityLinkBase<any>}) => {
    let {vmEntity} = vm;
    return <div className="px-3 py-2  align-items-center">
        {vmEntity.icon} &nbsp; {vmEntity.caption}
    </div>;
};
