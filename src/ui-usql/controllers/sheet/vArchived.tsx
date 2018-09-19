import * as React from 'react';
import {Button} from 'reactstrap';
import {List} from 'tonva-react-form';
import {Page} from 'tonva-tools';
import { VmSheetView } from './vSheetView';
import { VEntity } from '../VM';
import { Sheet } from '../../entities';
import { CSheet, SheetUI } from './cSheet';

export interface State {
    flows: any;
    data: any;
}
export class VArchived extends VmSheetView { // VmEntity<Sheet, SheetUI> {
    protected controller: CSheet;
    brief: any;

    async showEntry(inBrief:any) {
        let {brief, data, flows} = await this.controller.getArchived(inBrief.id);
        this.brief = brief;
        this.data = data;
        this.flows = flows;
        this.vmForm = this.createForm(undefined, this.data);
        this.openPage(this.view);
    }

    protected view = () => {
        return <Page header={this.label + ':' + '-' + this.brief.no}>
            <this.sheetView />
        </Page>;
    };
}
