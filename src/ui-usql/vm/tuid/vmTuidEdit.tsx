import * as React from 'react';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VmTuid } from './vmTuid';
import { VmForm } from '../vmForm';

export type TypeVmTuidEdit = typeof VmTuidEdit;

export class VmTuidEdit extends VmTuid {
    vmForm: VmForm;
    id: number;

    protected async beforeStart(param?:any) {
        this.vmForm = this.createVmFieldsForm();
        this.vmForm.onSubmit = this.onSubmit;
    }

    async loadId(id: number) {
        this.id = id;
    }

    protected next = async () => {
        this.vmForm.reset();
        this.popPage();
    }

    protected finish = () => {
        this.popPage(2);
    }

    protected resetForm() {
        this.vmForm.reset();
    }

    protected onSubmit = async () => {
        let ret = await this.entity.save(this.id, this.vmForm.values);
        if (ret) {
            alert('这里还要判断返回值，先不处理了 \n' + JSON.stringify(ret));
        }
        this.pushPage(<Page header={this.label + '提交成功'} back="none">
            <div className='m-3'>
                <span className="text-success">
                    <FA name='check-circle' size='lg' /> 成功提交！
                </span>
                <div className='mt-5'>
                    <Button className="mr-3" color="primary" onClick={this.next}>继续录入</Button>
                    <Button color="primary" outline={true} onClick={this.finish}>不继续</Button>
                </div>
            </div>
        </Page>);
        return;
    }

    protected view = TuidNewPage;
    /*
    renderView() {
        return <TuidNewPage vm={this} />;
    }*/
}

const TuidNewPage = observer(({vm}:{vm:VmTuidEdit}) => {
    let {label, vmForm} = vm;
    return <Page header={'新增 - ' + label}>
        {vmForm.render('mx-3 my-2')}
    </Page>;
});
