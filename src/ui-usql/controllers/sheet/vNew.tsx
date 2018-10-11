import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { Sheet } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../VM';
import { SheetUI, CSheet } from './cSheet';
import { FA } from 'tonva-react-form';

export class VSheetNew extends VEntity<Sheet, SheetUI, CSheet> {
    vForm: VForm;

    async showEntry(param?:any) {
        this.vForm = this.createForm(this.onSubmit, param);
        this.openPage(this.view);
    }

    onSubmit = async ():Promise<void> => {
        let values = this.vForm.getValues();
        let ret = await this.controller.saveSheet(values, this.vForm.values);
        this.ceasePage();
        this.openPage(this.finishedPage);
    }

    protected view = () => <Page header={this.label}>
        {this.vForm.render()}
    </Page>;

    private restart = async () => {
        this.ceasePage();
        await this.event('new');
    }
    private finishedPage = () => {
        return <Page header="已保存" back="close">
            <div className="p-3 d-flex flex-column align-items-center">
                <div className="text-success"><FA name="check-circle-o" /> 成功</div>
                <div className="p-3">
                    <button className="btn btn-sm btn-primary" onClick={this.restart}>继续开单</button>
                    <button className="ml-3 btn btn-sm btn-outline-info" onClick={()=>this.backPage()}>返回</button>
                </div>
            </div>
        </Page>;
    }
}
