import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page, PagedItems} from 'tonva-tools';
import {LMR, SearchBox, List} from 'tonva-react-form';
import {Tuid} from '../../entities';
import {EntitiesUIProps, TuidUIProps} from '../../ui';
import {EntitiesUI, TuidUI} from '../../ui';
import { EditPage } from './editPage';

class TuidPagedItems<T> extends PagedItems<T> {
    private tuidUI: TuidUI;
    constructor(tuidUI: TuidUI) {
        super();
        this.tuidUI = tuidUI;
    }
    protected async load():Promise<T[]> {
        let ret = await this.tuidUI.entity.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:T) {
        if (item === undefined) this.pageStart = 0;
    }
}

@observer
export class ListPage extends React.Component<TuidUIProps> {
    private pagedItems:TuidPagedItems<any>;

    constructor(props) {
        super(props);
        this.pagedItems = new TuidPagedItems<any>(this.props.ui);
        this.onSearch = this.onSearch.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowClick = this.rowClick.bind(this);
    }
    async componentWillMount() {
        await this.onSearch(this.props.data);
    }
    async onSearch(key:string) {
        await this.pagedItems.first(key);
    }
    renderRow(item:any, index:number):JSX.Element {
        let {ui} = this.props;
        let {row:Row} = ui.listPage;
        if (Row !== undefined) return <Row ui={ui} data={item} />;
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>;
    }
    async rowClick(item:any) {
        let {ui} = this.props;
        let data = await ui.entity.load(item.id);
        nav.push(<EditPage ui={ui} data={data} />);
    }
    render() {
        let {data:initKey, ui} = this.props;
        let {entity, caption} = ui;
        let {name, schema} = entity;
        caption = caption || name;
        let header = <SearchBox className="mx-1 w-100"
            initKey={initKey}
            onSearch={this.onSearch} placeholder={'搜索'+caption} />;
        return <Page header={header}>
            <List
                items={this.pagedItems.items}
                item={{render:this.renderRow, onClick:this.rowClick}}
                before={'搜索'+caption+'资料'} />
        </Page>;
    }
}
