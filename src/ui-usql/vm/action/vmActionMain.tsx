import * as React from 'react';
import { observer } from 'mobx-react';
import { Tuid, Action, Entity } from '../../entities';
import { vmLinkIcon } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmForm } from '../vmForm';
import { VmAction } from './vmAction';

export class VmActionMain extends VmAction {
    vmForm: VmForm;

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}

    protected async beforeStart() {
        this.vmForm = this.createVmFieldsForm();
        this.vmForm.onSubmit = this.onSubmit;
    }

    onSubmit = async () => {
        this.returns = await this.entity.submit(this.vmForm.values);
        this.replacePage(<ResultPage vm={this} />);
    }

    protected view = ActionPage;
}

const ActionPage = observer(({vm}:{vm:VmActionMain}) => {
    let {label, vmForm} = vm;
    return <Page header={label}>
        {vmForm.render('mx-3 my-2')}
    </Page>;
});

const ResultPage = ({vm}:{vm:VmActionMain}) => {
    let {label, returns} = vm;
    return <Page header={label} back="close">
        完成！
        <pre>
            {JSON.stringify(returns, undefined, ' ')}
        </pre>
    </Page>;
}
