import * as React from 'react';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity/vmEnity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
import { VmEntityLinkBase, TypeLink } from '../link';

export class VmTuidMain extends VmTuid {
    onNew = () => this.nav(VmTuidEdit);
    onList = () => this.nav(VmTuidList);

    protected view = MainPage;
}

const MainPage = ({vm}:{vm:VmTuidMain}) => {
    let {caption, onNew, onList} = vm;
    return <Page header={caption}>
        Tuid 
        <button className="btn btn-primary" onClick={onNew}>新建</button>
        <button className="btn btn-primary" onClick={onList}>列表</button>
    </Page>;
}

const Button = ({vm}:{vm: LinkButton<any>}) => {
    let {caption, onClick} = vm;
    return <button className="btn btn-primary" onClick={onClick}>{caption}</button>;
}
//{new LinkButton<VmTuidEdit>(new VmTuidEdit(vm.vm), '新建')}
export class LinkButton<T extends VmTuid> extends VmEntityLinkBase<T> {
    constructor(vmEntity: T, caption:string) {
        super(vmEntity, Button);
        this.caption = caption;
    }
    caption:string;
}
