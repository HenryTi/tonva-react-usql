import * as React from 'react';
import {Page} from 'tonva-tools';
import { VSheetView } from './vSheetView';
import { CSheet, SheetUI } from './cSheet';

export interface State {
    flows: any;
    data: any;
}
export class VArchived extends VSheetView {
    protected controller: CSheet;
    brief: any;

    async showEntry(inBrief:any) {
        let {brief, data, flows} = await this.controller.getArchived(inBrief.id);
        this.brief = brief;
        this.data = data;
        this.flows = flows;
        this.vForm = this.createForm(undefined, this.data);
        this.openPage(this.view);
    }

    protected view = () => {
        return <Page header={this.label + ':' + '-' + this.brief.no}>
            <this.sheetView />
        </Page>;
    };
}
