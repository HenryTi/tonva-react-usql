import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { TuidMain, Entity, Tuid } from '../../entities';
import { Page, PagedItems } from 'tonva-tools';
import { VmEntity } from '../VM';
import { TuidUI } from './crTuid';

export abstract class VmTuidListBase  extends VmEntity<TuidMain, TuidUI> {
    protected entity: TuidMain;
    ppp: string;
    pagedItems:TuidPagedItems;
    ownerId: number;
    param: any;

    async showEntry(param?:any) {
        this.pagedItems = new TuidPagedItems(this.entity);
        this.param = param;
        if (this.entity.owner !== undefined) this.ownerId = Number(param);
        // 初始查询, key是空的
        await this.onSearch('');
        this.open(this.view);
    }

    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
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
                items={this.pagedItems.items}
                item={{render: this.renderRow, onClick: this.clickRow}}
                before={'搜索'+this.label+'资料'} />
        </Page>;
    });
}

type TypeRow = typeof Row;
const Row = (item) => <div className="px-3 py-2">{JSON.stringify(item)}</div>;

class TuidPagedItems extends PagedItems<any> {
    private tuid: Tuid;
    constructor(tuid: Tuid) {
        super();
        this.tuid = tuid;
    }
    protected async load():Promise<any[]> {
        let ret = await this.tuid.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined) this.pageStart = 0;
    }
}

export class VmTuidList extends VmTuidListBase {
    protected async onSelected(item:any) {
        this.event('edit', item.id);
    }
}
