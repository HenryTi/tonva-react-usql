import * as React from 'react';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
import { VmEntityLink, TypeLink } from '../link';

export class VmTuidMain extends VmTuid {
    onNew = () => this.nav(VmTuidEdit);
    onList = () => this.nav(VmTuidList);

    protected view = MainPage;
}

const MainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, onNew, onList} = vm;
    return <Page header={label}>
        Tuid 
        <button className="btn btn-primary" onClick={onNew}>新建</button>
        <button className="btn btn-primary" onClick={onList}>列表</button>
    </Page>;
}

//{new LinkButton<VmTuidEdit>(new VmTuidEdit(vm.vm), '新建')}
export class LinkButton extends VmEntityLink {
    constructor(vmEntity: VmEntity, caption:string) {
        super(vmEntity);
        this.caption = caption;
    }
    caption:string;

    protected view = Button;
}

const Button = ({vm}:{vm: LinkButton}) => {
    let {caption, onClick} = vm;
    return <button className="btn btn-primary" onClick={onClick}>{caption}</button>;
}
