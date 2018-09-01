import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { SheetUI } from './crSheet';

export class VmSheetNew extends VmEntity<Sheet, SheetUI> {
    vmForm: VmForm;

    async showEntry(param?:any) {
        this.vmForm = this.createForm(this.onSubmit, param);
        this.open(this.view);
    }

    onSubmit = async (values:any):Promise<void> => {
        let ret = await this.entity.save(this.label, values);
        alert('[' + this.label + '] 已保存: ' + JSON.stringify(ret));
        this.close();
    }

    protected view = () => <Page header={this.label}>
        {this.vmForm.render()}
    </Page>;
}
