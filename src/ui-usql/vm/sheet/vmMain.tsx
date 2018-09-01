import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonProps, Badge } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted, LMR } from 'tonva-react-form';
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';

export class VmSheetMain extends VmEntity<Sheet, SheetUI> {
    protected coordinator: CrSheet;

    async showEntry() {
        await this.entity.getStateSheetCount();
        this.open(this.view);
    }

    /* 移到CrSheet里面去
    protected async onReceive(msg: any) {
        await super.onReceive(msg);
        this.entity.onReceive(msg);
    }
    */

    newClick = () => this.event('new'); /* {
        let t = (this.ui && this.ui.new) || this.vmNew;
        await this.navVm(t);
    }*/
    schemaClick = () => this.event('schema'); // await this.navVm(this.vmSchema);
    archivesClick = () => this.event('archives'); //await this.navVm(this.vmArchives);
    sheetStateClick = (state) => this.event('state', state); // await this.navVm(this.vmSheetList, state);
    /* 移到CrSheet里面去了
    async showSheet(sheetId:number) {
        let vmAction = (this.ui && this.ui.action) || VmSheetAction;
        await this.navVm(vmAction, sheetId);
    }*/

    renderState = (item:any, index:number) => {
        let {state, count} = item;
        if (count === 0) return null;
        let badge = <Badge className="ml-5 align-self-end" color="success">{count}</Badge>;
        return <LMR className="px-3 py-2" left={this.coordinator.getStateLabel(state)} right={badge} />;
    }

    protected view = observer(() => {
        let list = this.entity.statesCount.filter(row=>row.count);
        return <Page header={this.label}>
            <div className="mx-3 my-2">
                <Button className="mr-2" color="primary" onClick={this.newClick}>新建</Button>
                <Button className="mr-2" color="primary" onClick={this.schemaClick}>模板</Button>
            </div>
            <List className="my-2"
                header={<Muted>待处理{this.label}</Muted>}
                none="[ 无 ]"
                items={list}
                item={{render:this.renderState, onClick:this.sheetStateClick}} />
            <div className="mx-3 my-2">
                <Button color="primary" onClick={this.archivesClick}>已归档{this.label}</Button>
            </div>
        </Page>;
    });
}
