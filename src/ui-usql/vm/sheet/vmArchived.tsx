import * as React from 'react';
import {Button} from 'reactstrap';
import {List} from 'tonva-react-form';
import {Page} from 'tonva-tools';
import { VmSheet } from './vmSheet';
import { VmView } from './vmView';

export interface State {
    flows: any;
    data: any;
}
export class VmArchived extends VmSheet {
    brief: any;
    vmView: VmView;

    protected async beforeStart(inBrief:any) {
        let data = await this.entity.getArchive(inBrief.id)
        let {brief, data:sheetData, flows} = data;
        this.brief = brief;
        this.vmView = new VmView(this.vmApi, this.entity, this.ui, sheetData, this.brief.state, flows);
    }

    protected view = Archived;
}

const Archived = ({vm}:{vm:VmArchived}) => {
    let {brief, label, vmView} = vm;
    return <Page header={label + ':' + '-' + brief.no}>
        {vmView.render()}
    </Page>;
}
