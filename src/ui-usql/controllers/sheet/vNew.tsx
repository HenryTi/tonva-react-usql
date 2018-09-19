import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { Sheet } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../VM';
import { SheetUI, CSheet } from './cSheet';

export class VSheetNew extends VEntity<Sheet, SheetUI, CSheet> {
    //protected controller: CrSheet;

    vmForm: VForm;

    async showEntry(param?:any) {
        this.vmForm = this.createForm(this.onSubmit, param);
        this.openPage(this.view);
    }

    onSubmit = async (values:any):Promise<void> => {
        let ret = await this.controller.saveSheet(values);
        alert('[' + this.label + '] 已保存: ' + JSON.stringify(ret));
        this.closePage();
    }

    protected view = () => <Page header={this.label}>
        {this.vmForm.render()}
    </Page>;
}
