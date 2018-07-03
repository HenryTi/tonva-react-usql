import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmEdit } from './vmEdit';
import { VmSchema } from './vmSchema';
import { VmArchives } from './vmArchives';

export class VmSheetMain extends VmSheet {
    protected vmEdit = VmEdit;
    protected vmSchema = VmSchema;
    protected vmArchives = VmArchives;
    protected vmSheetState = VmEdit;

    newClick = async () => await this.nav(this.vmEdit);
    schemaClick = async () => await this.nav(this.vmSchema);
    archivesClick = async () => await this.nav(this.vmArchives);
    sheetStateClick = async () => await this.nav(this.vmSheetState);

    renderState = (item:any, index:number) => {
        return <div />;
    }

    protected view = Main;
}

const Main = ({vm}:{vm:VmSheetMain}) => {
    let {caption, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick}  = vm;
    return <Page header={caption}>
        <div className="mx-3 my-2">
            <Button className="mr-2" color="primary" onClick={newClick}>新建</Button>
            <Button className="mr-2" color="primary" onClick={schemaClick}>模板</Button>
        </div>
        <List className="my-2"
            header={<Muted>待处理{caption}</Muted>}
            none="[ 无 ]"
            items={entity.statesCount.filter(row=>row.count)}
            item={{render:renderState, onClick:sheetStateClick}} />
        <div className="mx-3 my-2">
            <Button color="primary" onClick={archivesClick}>已归档{caption}</Button>
        </div>
    </Page>;
}
