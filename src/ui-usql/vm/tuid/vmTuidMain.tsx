import * as React from 'react';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { TuidMain, Entity } from '../../entities';
import { Page } from 'tonva-tools';
import { VmEntityLink } from '../link';
import { Vm, VmEntity } from '../VM';
import { CrTuidMain, TuidUI } from './crTuid';

export class VmTuidMain extends VmEntity<TuidMain, TuidUI> {
    protected coordinator: CrTuidMain;
    onNew = () => this.event('new'); //this.coordinator.navVm(VmTuidEdit);
    onList = () => this.event('list'); // this.coordinator.navVm(VmTuidList);
    onSearch = async (key:string) => this.event('list', key) //await this.coordinator.navVm(VmTuidList, key);

    async showEntry(param?:any):Promise<void> {
        this.open(this.view);
    }

    protected entityRender(link: VmEntityLink, index: number): JSX.Element {
        return link.render();
    }

    protected async entityClick(link: VmEntityLink) {
        await link.onClick();
    }

    protected get view() {
        let {label, proxyLinks} = this.coordinator;
        return () => <Page header={label}>
            {proxyLinks === undefined ?
            <>
                <SearchBox className="w-100" onSearch={this.onSearch} placeholder={'搜索'+label} />
                <div className='my-3'>
                    <Button className="ml-3" color="primary" onClick={this.onNew}>新增</Button>
                    <Button className="ml-3" color="primary" onClick={this.onList}>列表</Button>
                </div>
            </> :
            <List className="my-2"
                header={<Muted>{label} 代理下列Tuid</Muted>}
                items={proxyLinks}
                item={{render: this.entityRender, onClick:this.entityClick}} />
            }
        </Page>;
    }
}
/*
const MainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, onNew, onList, onSearch} = vm;
    return <Page header={label}>
        <SearchBox className="w-100" onSearch={onSearch} placeholder={'搜索'+label} />
        <div className='my-3'>
            <Button className="ml-3" color="primary" onClick={onNew}>新增</Button>
            <Button className="ml-3" color="primary" onClick={onList}>列表</Button>
        </div>
    </Page>;
}
        
const ProxyMainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, crUsq, entity, entityClick, entityRender, proxies} = vm;
    let arr:string[] = [];
    for (let i in proxies) {
        arr.push(i);
    }
    return <Page header={label}>
        <List className="my-2"
            header={<Muted>{label} 代理下列Tuid</Muted>}
            items={arr.map(v => crUsq.vmLinkFromName('tuid', v))}
            item={{render: entityRender, onClick:entityClick}} />
    </Page>
}
*/