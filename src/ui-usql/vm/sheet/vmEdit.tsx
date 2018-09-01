import * as React from 'react';
import { Page } from 'tonva-tools';
import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { SheetUI } from './crSheet';

export class VmSheetEdit extends VmEntity<Sheet, SheetUI> {
    vmForm: VmForm;

    async showEntry(param?:any) {
        this.vmForm = this.createForm(param);
        this.open(this.view);
    }

    onSubmit = (values:any):Promise<void> => {
        alert('not implemented');
        return;
    }

    protected view = () => <Page header={this.label}>
        {this.vmForm.render()}
    </Page>;
}
