import * as React from 'react';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
import { VmEntityLink, TypeLink } from '../link';

export class VmTuidMain extends VmTuid {
    onNew = () => this.navVm(VmTuidEdit);
    onList = () => this.navVm(VmTuidList);
    onSearch = async (key:string) => await this.navVm(VmTuidList, key);

    entityRender(link: VmEntityLink, index: number): JSX.Element {
        return link.render();
    }

    async entityClick(link: VmEntityLink) {
        await link.onClick();
    }

    protected async beforeStart(param?:any) {
        let {proxies} = this.entity.schema;
        this.view = proxies === undefined? MainPage : ProxyMainPage;
    }
}

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
    let {label, vmApi, entity, entityClick, entityRender} = vm;
    let {proxies} = entity.schema;
    let arr:string[] = [];
    for (let i in proxies) {
        arr.push(i);
    }
    return <Page header={label}>
        <List className="my-2"
            header={<Muted>{label} 代理下列Tuid</Muted>}
            items={arr.map(v => vmApi.vmLinkFromName('tuid', v))}
            item={{render: entityRender, onClick:entityClick}} />
    </Page>
}
