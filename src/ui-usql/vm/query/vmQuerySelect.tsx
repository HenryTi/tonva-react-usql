import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { TuidMain, Entity, Tuid, Query } from '../../entities';
import { Page, PagedItems } from 'tonva-tools';
import { VmEntity } from '../VM';
import { QueryUI } from './crQuery';
import { DefaultRow } from './defaultRow';

export class VmQuerySelect extends VmEntity<Query, QueryUI> {
    private row: React.StatelessComponent;

    pagedItems:QueryPagedItems;
    ownerId: number;

    async showEntry(param?:any) {
        let {row, selectRow} = this.ui;
        this.row = selectRow || row || DefaultRow;
        this.entity = this.coordinator.entity;
        this.pagedItems = new QueryPagedItems(this.entity);
        await this.onSearch(param);
        this.openPage(this.view);
    }
    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
    }

    renderRow = (item:any, index:number) => <this.row {...item} />;

    private callOnSelected(item:any) {
        /*
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
        */
       this.closePage();
       this.return(item);
    }
    clickRow = (item:any) => {
        this.callOnSelected(item);
    }

    view = () => {
        //let {label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId} = vm;
        let header = <SearchBox className="mx-1 w-100"
            initKey={''}
            onSearch={this.onSearch} placeholder={'搜索'+this.label} />;
        return <Page header={header}>
            <List
                items={this.pagedItems.items}
                item={{render: this.renderRow, onClick: this.clickRow}}
                before={'搜索'+this.label+'资料'} />
        </Page>;
    };
}

/*
type TypeRow = typeof Row;
const Row = observer(({item, vm}:{item:any, vm:VmQuerySelect}) => {
    return <div className="px-3 py-2">post:{JSON.stringify(item.$post)} - {JSON.stringify(item)}</div>;
});
*/
class QueryPagedItems extends PagedItems<any> {
    private query: Query;
    constructor(query: Query) {
        super();
        this.query = query;
    }
    protected async load():Promise<any[]> {
        let ret:any[];
        if (this.query.isPaged === true)
            ret = await this.query.page(this.param, this.pageStart, this.pageSize);
        else {
            let data = await this.query.query(this.param);
            //let data = await this.query.unpackReturns(res);
            ret = data[this.query.returns[0].name];
        }
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined) this.pageStart = 0;
    }
}
