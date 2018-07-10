import * as React from 'react';
import { Button, ButtonProps, Badge } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted, LMR } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmSheetNew } from './vmNew';
import { VmSheetEdit } from './vmEdit';
import { VmSheetList } from './vmList';
import { VmSheetSchema } from './vmSchema';
import { VmArchives } from './vmArchives';

export class VmSheetMain extends VmSheet {
    protected vmNew = VmSheetNew;
    protected vmEdit = VmSheetEdit;
    protected vmSchema = VmSheetSchema;
    protected vmArchives = VmArchives;
    protected vmSheetList = VmSheetList;

    async beforeStart() {
        await this.entity.getStateSheetCount();
    }

    newClick = async () => {
        let t = (this.ui && this.ui.new) || this.vmNew;
        await this.nav(t);
    }
    schemaClick = async () => await this.nav(this.vmSchema);
    archivesClick = async () => await this.nav(this.vmArchives);
    sheetStateClick = async (state) => await this.nav(this.vmSheetList, state);

    renderState = (item:any, index:number) => {
        let {state, count} = item;
        let stateName = state==='$'? '新单':state;
        let badge = <Badge className="ml-5 align-self-end" color="success">{count}</Badge>;
        return <LMR className="px-3 py-2" left={stateName} right={badge} />;
    }

    protected view = Main;
}

const Main = ({vm}:{vm:VmSheetMain}) => {
    let {label, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick}  = vm;
    return <Page header={label}>
        <div className="mx-3 my-2">
            <Button className="mr-2" color="primary" onClick={newClick}>新建</Button>
            <Button className="mr-2" color="primary" onClick={schemaClick}>模板</Button>
        </div>
        <List className="my-2"
            header={<Muted>待处理{label}</Muted>}
            none="[ 无 ]"
            items={entity.statesCount.filter(row=>row.count)}
            item={{render:renderState, onClick:sheetStateClick}} />
        <div className="mx-3 my-2">
            <Button color="primary" onClick={archivesClick}>已归档{label}</Button>
        </div>
    </Page>;
}
