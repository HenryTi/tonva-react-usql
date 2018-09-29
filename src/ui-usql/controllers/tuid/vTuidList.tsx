import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Page, PagedItems } from 'tonva-tools';
import { TuidMain, Entity, Tuid, TuidDiv } from '../../entities';
import { VEntity } from '../VM';
import { TuidUI, CTuidMain, CTuidDiv } from './cTuid';
import { JSONContent, RowContent } from '../viewModel';

export abstract class VTuidMainListBase  extends VEntity<TuidMain, TuidUI, CTuidMain> {
    protected rowContent: (row:any) => JSX.Element;
    protected ownerId: number;

    async showEntry(param?:any) {
        this.rowContent = this.ui.rowContent || RowContent;
        if (this.entity.owner !== undefined) this.ownerId = Number(param);
        // 初始查询, key是空的
        //await this.onSearch('');
        await this.controller.searchMain('');
        this.openPage(this.view);
    }

    onSearch = async (key:string) => {
        await this.controller.searchMain(key);
        //await this.pagedItems.first(key);
    }
    renderRow = (item:any, index:number):JSX.Element => <this.rowContent {...item} />;

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
    private rowKey = (item:any) => {
        let {id} = item;
        return id;
    }
    protected view = observer(() => {
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
                items={this.controller.pagedItems.items}
                item={{render: this.renderRow, onClick: this.clickRow, key:this.rowKey}}
                before={'搜索'+this.label+'资料'} />
        </Page>;
    });
}

export class VTuidMainList extends VTuidMainListBase {
    protected async onSelected(item:any) {
        this.event('edit', item.id);
    }
}

export abstract class VTuidDivListBase  extends VEntity<TuidDiv, TuidUI, CTuidDiv> {
    protected ownerId: number;

    async showEntry(param?:any) {
        //this.pagedItems = new TuidPagedItems(this.entity);
        if (this.entity.owner !== undefined) this.ownerId = Number(param);
        // 初始查询, key是空的
        //await this.onSearch('');
        await this.controller.searchMain('');
        this.openPage(this.view);
    }

    onSearch = async (key:string) => {
        await this.controller.searchMain(key);
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
                items={this.controller.pagedItems.items}
                item={{render: this.renderRow, onClick: this.clickRow}}
                before={'搜索'+this.label+'资料'} />
        </Page>;
    });
}

export class VTuidDivList extends VTuidDivListBase {
    protected async onSelected(item:any) {
        this.event('edit', item.id);
    }
}
