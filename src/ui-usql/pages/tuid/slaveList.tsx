import * as React from 'react';
import {Button} from 'reactstrap';
import {observable} from 'mobx';
import { observer } from 'mobx-react';
import {nav, Page, PagedItems} from 'tonva-tools';
import {List, FA, LMR} from 'tonva-react-form';
import {Slave, Query} from '../../entities';
import {EntitiesUIProps, EntityUIProps, TuidUIProps, EntitiesUI, TuidUI, 
    TuidUISlaveProps} from '../../ui';
import {EditPage} from './editPage';

class PagedSlaveItems extends PagedItems<any> {
    private masterId: number;
    private master: TuidUI;
    private page: Query;
    constructor(master:TuidUI, page:Query, masterId:number) {
        super();
        this.master = master;
        this.page = page;
        this.masterId = masterId;
    }

    protected async load():Promise<any[]> {
        let ret = await this.page.page({
            "_$master": this.masterId
        }, this.pageStart, this.pageSize);
        //return await this.master.entity.bindSlaves(this.bindSlave.entity.name, this.masterId, this.pageStart, this.pageSize);
        return ret;
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

    constructor(props) {
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.addClick = this.addClick.bind(this);
        this.onNewSubmited = this.onNewSubmited.bind(this);
        this.onBindSlaveSaved = this.onBindSlaveSaved.bind(this);
        this.slaveChanged = this.slaveChanged.bind(this);
        let {ui, slave, masterId} = this.props;
        this.pagedItems = new PagedSlaveItems(ui, slave.page.entity, masterId);
    }
    async componentWillMount() {
        let {masterId, ui, slave} = this.props;
        //await this.slave.entity.loadSchema();
        //await ui.entity.bindSlaves(slave.entity.name);
        await this.pagedItems.first(undefined);
    }
    private async itemClick(item:any) {
        let {ui, slave, masterId} = this.props;
        let {tuid} = slave;
        //await slave.entity.loadSchema();
        let data = await tuid.entity.load(item.id);
        nav.push(<EditPage 
            master={ui} masterId={masterId} 
            ui={tuid} data={data} 
            onSubmited={this.onBindSlaveSaved} />);
    }
    private onBindSlaveSaved(res:any) {
        let {ui, masterId, slave} = this.props;
        slave.tuid.entity.resetCache(res.id);
    }
    private itemRender(item:any, index:number) {
        let {slave, ui} = this.props;
        let {tuid} = slave;
        let {inputContent: InputContent} = tuid.input;
        let {$slave} = item;
        tuid.entity.useId($slave);
        let content;
        let value = tuid.entity.getId($slave);
        if (value !== undefined) {
            if (InputContent !== undefined) {
                return <LMR className="px-3 py-2"
                    left={<InputContent value={value} />}
                    right={JSON.stringify(item)} />;
            }
            else {
                content = <>{JSON.stringify(item)}</>;
            }
        }
        else {
            content = <>{tuid.caption}: {$slave}</>;
        }
        return <div className="px-3 py-2">{content}</div>;
    }
    private async addClick() {
        let {ui, masterId, slave} = this.props;
        let {tuid} = slave;
        nav.push(<SetSlave slaveChanged={this.slaveChanged} {...this.props} />);
    }
    private slaveChanged(slaveId:number, slaved:1|0) {
        let items = this.pagedItems.items;
        let index = items.findIndex(v => v.$slave===slaveId);
        if (slaved === 0) {
            if (index>=0) items.splice(index, 1);
        }
        else {
            if (index<0) items.unshift({$slave: slaveId});
        }
    }
    private onNewSubmited(res:any) {
        this.pagedItems.items.push(res);
    }
    render() {
        let {ui, slave} = this.props;
        let {tuid} = slave;
        let {items} = this.pagedItems;
        let right = <Button color="success" onClick={this.addClick}><FA name="plus" /></Button>;
        return <Page header={tuid.caption + ' - 属于' + ui.caption} right={right}>
            <List items={items} item={{onClick:this.itemClick, render:this.itemRender}} />
        </Page>;
    }
}


class PagedSlaveSelectItems extends PagedItems<any> {
    private page: Query;
    constructor(page:Query) {
        super(true);
        this.page = page;
    }

    protected async load():Promise<any[]> {
        let ret = await this.page.page(this.param, this.pageStart, this.pageSize);
        //return await this.master.entity.bindSlaves(this.bindSlave.entity.name, this.masterId, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.$slave;
    }
}

@observer
class SetSlave extends React.Component<TuidUISlaveProps & { slaveChanged: (slaveId:number, slaved:1|0) => void }> {
    private pagedItems: PagedSlaveSelectItems;
    constructor(props) {
        super(props);
        this.pagedItems = new PagedSlaveSelectItems(this.props.slave.pageSlave.entity);
        this.addClick = this.addClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }
    async componentWillMount() {
        let {masterId, ui, slave} = this.props;
        //await this.slave.entity.loadSchema();
        //await ui.entity.bindSlaves(slave.entity.name);
        await this.pagedItems.first(undefined);
    }
    private addClick() {

    }
    private onSelect(item:any, isSelected:boolean, anySelected:boolean) {
    }
    private itemClick(item:any) {

    }
    private async setSlave(item:any) {
        let {masterId} = this.props;
        item.slaved = 1;
        let {$slave, slaved} = item;
        await this.props.slave.add.entity.submit({
            _$master: masterId,
            arr1: [{_$slave: $slave}]
        })
        this.props.slaveChanged($slave, slaved);
    }
    private async unsetSlave(item:any) {
        let {masterId} = this.props;
        item.slaved = 0;
        let {$slave, slaved} = item;
        await this.props.slave.del.entity.submit({
            _$master: masterId,
            arr1: [{_$slave: $slave}]
        })
        this.props.slaveChanged($slave, slaved);
    }
    private itemRender(item:any, index:number):JSX.Element {
        let {$slave, slaved} = item;
        let right, flag;
        if (slaved === 0) {
            flag = <div className="p-2"><FA name="x" fixWidth={true} /></div>;
            right = <Button className="m-1" 
                color="success" size="sm"
                onClick={()=>this.setSlave(item)}>
                <FA name="plus" />
            </Button>;
        }
        else {
            flag = <div className="p-2 text-danger"><FA name="check" fixWidth={true} /></div>;
            right = <Button className="m-1"
                color="link" size="sm"
                onClick={()=>this.unsetSlave(item)}>
                <FA name="minus" />
            </Button>;
        }
        let tuid = this.props.slave.tuid;
        tuid.entity.useId($slave);
        let value = tuid.entity.getId($slave);
        let InputContent = tuid.input.inputContent;
        return <LMR
            left={flag}
            right={right}>
            <div className="py-2">
                <InputContent value={value} />
                {JSON.stringify(item)}
            </div>
        </LMR>;
    }
    render() {
        let {ui, slave} = this.props;
        let {tuid} = slave;
        let {items} = this.pagedItems;
        let item = {
            onClick:this.itemClick, 
            render:this.itemRender, 
            //onSelect: this.onSelect
        }
        return <Page header={'设置 ' + ui.caption + ' 属于 ' + tuid.caption}>
            <List items={items} item={item} />
        </Page>;
    }
}
