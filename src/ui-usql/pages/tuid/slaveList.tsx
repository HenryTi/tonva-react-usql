import * as React from 'react';
import {Button} from 'reactstrap';
import {observable} from 'mobx';
import { observer } from 'mobx-react';
import {nav, Page, PagedItems} from 'tonva-tools';
import {List, FA} from 'tonva-react-form';
import {EntitiesUIProps, EntityUIProps, TuidUIProps, EntitiesUI, TuidUI, TuidUISlaveProps} from '../../ui';
import {EditPage} from './editPage';

class PagedSlaveItems extends PagedItems<any> {
    private masterId: number;
    private master: TuidUI;
    private slave: TuidUI;
    constructor(master:TuidUI, slave:TuidUI, masterId:number) {
        super();
        this.master = master;
        this.slave = slave;
        this.masterId = masterId;
    }

    protected async load():Promise<any[]> {
        return await this.master.entity.slaves(this.slave.entity.name, this.masterId, this.pageStart, this.pageSize);
    }
    protected setPageStart(item:any) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.order;
    }
}

@observer
export class SlaveList extends React.Component<TuidUISlaveProps> {
    private pagedItems: PagedSlaveItems;
    @observable private items:any[] = undefined;

    constructor(props) {
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.newClick = this.newClick.bind(this);
        this.onNewSubmited = this.onNewSubmited.bind(this);
        this.onSlaveSaved = this.onSlaveSaved.bind(this);
        let {ui, slave, masterId} = this.props;
        this.pagedItems = new PagedSlaveItems(ui, slave, masterId);
    }
    async componentWillMount() {
        let {masterId, ui, slave} = this.props;
        //await this.slave.entity.loadSchema();
        //await ui.entity.slaves(slave.entity.name);
        await this.pagedItems.first(undefined);
    }
    private async itemClick(item:any) {
        let {ui, slave, masterId} = this.props;
        await slave.entity.loadSchema();
        let data = await slave.entity.load(item.id);
        nav.push(<EditPage 
            master={ui} masterId={masterId} 
            ui={slave} data={data} 
            onSubmited={this.onSlaveSaved} />);
    }
    private onSlaveSaved(res:any) {
        let {ui, masterId, slave} = this.props;
        slave.entity.resetCache(res.id);
    }
    private itemRender(item:any, index:number) {
        let {slave} = this.props;        
        let {inputContent: InputContent} = slave.input;
        let {id} = item;
        slave.entity.useId(id);
        let content;
        let value = slave.entity.getId(id);
        if (value !== undefined) {
            if (InputContent !== undefined) content = <InputContent value={value} />;
            else content = <>{JSON.stringify(item)}</>;
        }
        else {
            content = <>{slave.caption}: {id}</>;
        }
        return <div className="px-3 py-2">{content}</div>;
    }
    private async newClick() {
        let {ui, masterId, slave} = this.props;
        await slave.entity.loadSchema();
        nav.push(<EditPage ui={slave}
            data={undefined}
            master={ui}
            masterId={masterId}
            onSubmited={this.onNewSubmited}
         />);
    }
    private onNewSubmited(res:any) {
        this.pagedItems.items.push(res);
    }
    render() {
        let {ui, slave} = this.props;
        let right = <Button color="success" onClick={this.newClick}><FA name="plus" /></Button>;
        return <Page header={slave.caption + ' - 属于' + ui.caption} right={right}>
            <List items={this.pagedItems.items} item={{onClick:this.itemClick, render:this.itemRender}} />
        </Page>;
    }
}

