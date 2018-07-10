import * as React from 'react';
import {Button} from 'reactstrap';
import {observable} from 'mobx';
import { observer } from 'mobx-react';
import {nav, Page, PagedItems} from 'tonva-tools';
import {List, FA} from 'tonva-react-form';
import {EntitiesUIProps, EntityUIProps, TuidUIProps, EntitiesUI, TuidUIO, TuidUIBindSlaveProps} from '../../ui';
import {EditPage} from './editPage';

class PagedBindSlaveItems extends PagedItems<any> {
    private masterId: number;
    private master: TuidUIO;
    private bindSlave: TuidUIO;
    constructor(master:TuidUIO, slave:TuidUIO, masterId:number) {
        super();
        this.master = master;
        this.bindSlave = slave;
        this.masterId = masterId;
    }

    protected async load():Promise<any[]> {
        return await this.master.entity.bindSlaves(this.bindSlave.entity.name, this.masterId, this.pageStart, this.pageSize);
    }
    protected setPageStart(item:any) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.order;
    }
}

@observer
export class BindSlaveList extends React.Component<TuidUIBindSlaveProps> {
    private pagedItems: PagedBindSlaveItems;
    @observable private items:any[] = undefined;

    constructor(props) {
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.newClick = this.newClick.bind(this);
        this.onNewSubmited = this.onNewSubmited.bind(this);
        this.onBindSlaveSaved = this.onBindSlaveSaved.bind(this);
        let {ui, bindSlave, masterId} = this.props;
        this.pagedItems = new PagedBindSlaveItems(ui, bindSlave, masterId);
    }
    async componentWillMount() {
        let {masterId, ui, bindSlave} = this.props;
        //await this.slave.entity.loadSchema();
        //await ui.entity.bindSlaves(slave.entity.name);
        await this.pagedItems.first(undefined);
    }
    private async itemClick(item:any) {
        let {ui, bindSlave, masterId} = this.props;
        await bindSlave.entity.loadSchema();
        let data = await bindSlave.entity.load(item.id);
        nav.push(<EditPage 
            master={ui} masterId={masterId} 
            ui={bindSlave} data={data} 
            onSubmited={this.onBindSlaveSaved} />);
    }
    private onBindSlaveSaved(res:any) {
        let {ui, masterId, bindSlave} = this.props;
        bindSlave.entity.resetCache(res.id);
    }
    private itemRender(item:any, index:number) {
        let {bindSlave} = this.props;        
        let {inputContent: InputContent} = bindSlave.input;
        let {id} = item;
        bindSlave.entity.useId(id);
        let content;
        let value = bindSlave.entity.getId(id);
        if (value !== undefined) {
            if (InputContent !== undefined) content = <InputContent value={value} />;
            else content = <>{JSON.stringify(item)}</>;
        }
        else {
            content = <>{bindSlave.caption}: {id}</>;
        }
        return <div className="px-3 py-2">{content}</div>;
    }
    private async newClick() {
        let {ui, masterId, bindSlave} = this.props;
        await bindSlave.entity.loadSchema();
        nav.push(<EditPage ui={bindSlave}
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
        let {ui, bindSlave} = this.props;
        let right = <Button color="success" onClick={this.newClick}><FA name="plus" /></Button>;
        return <Page header={bindSlave.caption + ' - 属于' + ui.caption} right={right}>
            <List items={this.pagedItems.items} item={{onClick:this.itemClick, render:this.itemRender}} />
        </Page>;
    }
}

