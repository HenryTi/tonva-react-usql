import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Page, PagedItems } from 'tonva-tools';
import { TuidMain, Entity, Tuid } from '../../entities';
import { VmEntity } from '../VM';
import { TuidUI, CrTuidMain } from './crTuid';

export abstract class VmTuidListBase  extends VmEntity<TuidMain, TuidUI> {
    protected coordinator: CrTuidMain;
    protected entity: TuidMain;
    ppp: string;
    ownerId: number;
    param: any;

    async showEntry(param?:any) {
        //this.pagedItems = new TuidPagedItems(this.entity);
        this.param = param;
        if (this.entity.owner !== undefined) this.ownerId = Number(param);
        // 初始查询, key是空的
        //await this.onSearch('');
        await this.coordinator.search('');
        this.openPage(this.view);
    }

    onSearch = async (key:string) => {
        await this.coordinator.search(key);
        //await this.pagedItems.first(key);
    }
    renderRow = (item:any, index:number):JSX.Element => {
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>;
    }

    protected abstract onSelected(item:any): Promise<void>;
    private callOnSelected(item:any) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    }
    clickRow = (item:any) => {
        this.callOnSelected(item);
    }

    protected view = observer(() => {
        //let {label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId} = vm;
        let header = <SearchBox className="mx-1 w-100"
            initKey={''}
            onSearch={this.onSearch} placeholder={'搜索'+this.label} />;
        let {owner} = this.entity;
        let ownerTop;
        if (owner !== undefined) {
            let ownerObj = owner.valueFromId(this.ownerId);
            ownerTop = <div>owner: {JSON.stringify(ownerObj)}</div>;
        }
        return <Page header={header}>
            {ownerTop}
            <List
                items={this.coordinator.pagedItems.items}
                item={{render: this.renderRow, onClick: this.clickRow}}
                before={'搜索'+this.label+'资料'} />
        </Page>;
    });
}

export class VmTuidList extends VmTuidListBase {
    protected async onSelected(item:any) {
        this.event('edit', item.id);
    }
}
