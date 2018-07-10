import * as React from 'react';
import { observer } from 'mobx-react';
import { Page, nav, PagedItems } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import { VmApi } from '../vmApi';
import { TypeContent, RowContent, ViewModel } from '../viewModel';
import { Tuid, Query } from '../../entities';

export interface VmPickerOptions {
    vmApi: VmApi;
    pagedItems: PagedItems<any>;
    caption: string;
    onSelected?: (item:any)=>Promise<void>;
    row?: TypeContent;
}

export class VmPicker extends ViewModel {
    private vmApi: VmApi;
    private onSelected?: (item:any)=>Promise<void>;
    private row: TypeContent;
    initKey: string
    caption: string;
    pagedItems: PagedItems<any>;

    constructor(options: VmPickerOptions) {
        super();
        let {vmApi, pagedItems, caption, onSelected, row} = options;
        this.vmApi = vmApi;
        this.caption = caption;
        this.pagedItems = pagedItems; // || new PickerPagedItems(tuid);
        this.onSelected = onSelected;
        this.row = row || RowContent;
    }

    async loadSchema() {
        await this.onSearch(undefined);
    }

    async start(initKey?:string) {
        this.initKey = initKey;
        if (this.initKey !== undefined) await this.loadSchema();
        nav.push(this.render());
    }

    itemRender = (item:any, index:number):JSX.Element => <this.row values={item} />;
    itemClick = async (item:any) => {
        if (this.onSelected === undefined) return;
        nav.pop();
        await this.onSelected(item);
    }
    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
    }

    protected view = Picker;
}

const Picker = observer(({vm}:{vm:VmPicker}) => {
    let {caption, initKey, onSearch, itemRender, itemClick} = vm;
    let header = <SearchBox className="w-100" onSearch={onSearch} 
        placeholder={caption} initKey={initKey} />;
    return <Page header={header}>
        <List
            items={vm.pagedItems.items} 
            item={{render: itemRender, onClick: itemClick}} />
    </Page>;
});

export type TypeVmTuidPicker = typeof VmTuidPicker;
export class VmTuidPicker extends VmPicker {
    constructor(vmApi: VmApi, caption:string, tuid: Tuid, onSelected:(item:any)=>Promise<void>, row:TypeContent) {
        super({
            vmApi: vmApi,
            pagedItems: new TuidPagedItems(tuid),
            onSelected: onSelected,
            caption: caption,
            row: row || RowContent,            
        });
    }
}

class TuidPagedItems extends PagedItems<any> {
    private tuid: Tuid;
    constructor(tuid: Tuid) {
        super();
        this.tuid = tuid;
    }

    async load():Promise<any[]> {
        let ret = await this.tuid.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.id;
    }
}

export type TypeQueryPicker = typeof VmQueryPicker;
export class VmQueryPicker extends VmPicker {
    constructor(vmApi: VmApi, caption:string, query:Query, onSelected:(item:any)=>Promise<void>, row:TypeContent) {
        super({
            vmApi: vmApi,
            pagedItems: new QueryPagedItems(query),
            onSelected: onSelected,
            caption: caption,
            row: row || RowContent,
        });
    }
}

class QueryPagedItems extends PagedItems<any> {
    private query: Query;
    constructor(query: Query) {
        super();
        this.query = query;
    }

    async load():Promise<any[]> {
        let ret = await this.query.page(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.id;
    }
}
