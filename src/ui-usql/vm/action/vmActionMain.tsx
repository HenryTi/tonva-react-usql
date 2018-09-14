import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmForm } from '../form';
import { VmPage, VmEntity } from '../VM';
import { CrAction, ActionUI } from './crAction';
import { Action } from '../../entities';

export class VmActionMain extends VmEntity<Action, ActionUI> {
    protected coordinator: CrAction;
    private vmForm: VmForm;
    private returns: any;

    private onSubmit = async () => {
        this.returns = await this.coordinator.submit(this.vmForm.values);
        this.closePage();
        this.openPage(this.resultPage);
    }

    async showEntry(param?:any):Promise<void> {
        this.vmForm = this.createForm(this.onSubmit, param);
        this.openPage(this.mainPage);
    }

    protected mainPage = () => {
        let {label} = this.coordinator;
        return <Page header={label}>
            {this.vmForm.render('mx-3 my-2')}
        </Page>;
    }

    protected resultPage = () => {
        let {label} = this.coordinator;
        return <Page header={label} back="close">
            完成！
            <pre>
                {JSON.stringify(this.returns, undefined, ' ')}
            </pre>
        </Page>;
    }
}
