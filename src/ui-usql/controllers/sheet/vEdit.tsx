import * as React from 'react';
import { Page } from 'tonva-tools';
import { Sheet } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../VM';
import { SheetUI, CSheet } from './cSheet';

export class VSheetEdit extends VEntity<Sheet, SheetUI, CSheet> {
    vForm: VForm;

    async showEntry(param?:any) {
        this.vForm = this.createForm(this.onSubmit, param);
        this.openPage(this.view);
    }

    onSubmit = (values:any):Promise<void> => {
        alert('not implemented');
        return;
    }

    protected view = () => <Page header={this.label}>
        {this.vForm.render()}
    </Page>;
}
