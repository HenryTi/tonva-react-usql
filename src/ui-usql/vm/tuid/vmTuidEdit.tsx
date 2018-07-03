import * as React from 'react';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { VmTuid } from './vmTuid';

export type TypeVmTuidEdit = typeof VmTuidEdit;

export class VmTuidEdit extends VmTuid {
    id: number;

    async loadId(id: number) {
        this.id = id;
    }

    protected initValues() {
        this.values = this.buildObservableValues(this.entity.schema.fields);
    }

    protected next = async () => {
        this.resetForm();
        nav.pop();
    }

    protected finish = () => {
        nav.pop(2);
    }

    protected resetForm() {
        this.resetValues();
        this.vmFieldsForm.reset();
    }

    async submit() {
        let ret = await this.entity.save(this.id, this.values);
        if (ret) {
            alert('这里还要判断返回值，先不处理了 \n' + JSON.stringify(ret));
        }
        nav.push(<Page header={this.caption + '提交成功'} back="none">
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
    let {caption, values, renderForm} = vm;
    return <Page header={'新增 - ' + caption}>
        {renderForm('mx-3 my-2')}
    </Page>;
});
