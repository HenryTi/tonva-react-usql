import * as React from 'react';
import {Button, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {TonvaForm, FormRow, SubmitResult, Fields, FA} from 'tonva-react-form';
import {Tuid} from '../../entities';
import {EntitiesUIProps, EntityUIProps, TuidUIProps} from '../../ui';
import {EntitiesUI, TuidUI} from '../../ui';
import config from '../consts';

export interface EditProps {
    master?:TuidUI; 
    masterId?:number;
    onSubmited?:(res:any) => void;
};

export class EditPage extends React.Component<TuidUIProps & EditProps> 
{
    private form: TonvaForm;
    private formRows: FormRow[];
    private slaveUIs: TuidUI[];

    constructor(props) {
        super(props);
        //this.addNew = this.addNew.bind(this);
        this.submit = this.submit.bind(this);
        this.next = this.next.bind(this);
        this.finish = this.finish.bind(this);
        let {ui} = this.props;
        let slaves = ui.entity.schema.slaves;
        if (slaves !== undefined) this.slaveUIs = slaves.map(s => ui.entitiesUI.tuid.coll[s]);
        this.state = {item:this.props.data||{}};
        this.buildFormView();
    }
    async submit(values: any): Promise<SubmitResult | undefined> {
        let {ui, data, master, masterId, onSubmited} = this.props;
        let {entity, caption} = ui;
        let {name} = entity;
        caption = caption || name;
        let {schema} = entity;
        let id:number;
        if (data !== undefined) id = data.id;
        let res;
        if (master === undefined) {
            res = await ui.entity.save(id, values);
        }
        else {
            let first = 0;
            res = await master.entity.slaveSave(ui.entity.name, first, masterId, id, values);
        }
        let retId = res.id;
        if (retId < 0) {
            let unique = schema.unique;
            if (unique !== undefined) {
                for (let u of unique) {
                    this.form.formView.setError(u, '不能重复');
                }
            }
            return;
        }
        if (onSubmited !== undefined) onSubmited(res);
        if (data === undefined) {
            nav.push(<Page header={caption + '提交成功'} back="none">
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
        nav.pop();
        nav.push(<Page header={caption + '修改成功'} back="close">
            <div className='m-3'>
                <span className="text-success">
                    <FA name='check-circle' size='lg' /> 成功！
                </span>
            </div>
        </Page>);
    }
    next() {
        this.form.formView.clear();
        nav.pop();
    }
    finish() {
        nav.pop(2);
    }
    render() {
        let {ui, data} = this.props;
        let {entity, caption, entitiesUI} = ui;
        let {name} = entity;
        caption = caption || name;
        let header, slaveInputs;
        if (data === undefined) {
            header = '新增' + caption;
        }
        else {
            header = caption + '资料';
            if (this.slaveUIs !== undefined) {
                slaveInputs = <div className="px-3 py-1 mb-3 bg-ligh border-bottom border-info">
                    {this.slaveUIs.map(s => {
                        return <ui.slaveInput key={s.entity.name} ui={ui} slave={s} masterId={data.id} />
                    })}
                </div>;
            }
        }
        return <Page header={header}>
            {slaveInputs}
            <TonvaForm
                //context={entitiesUI}
                ref={tf=>this.form=tf}
                className="m-3"
                initValues={data}
                formRows={this.formRows}
                onSubmit={this.submit} />
        </Page>
    }

    private buildFormView() {
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
    }
}

interface SuccessProps {
    callback: () => void;
}
class Success extends React.Component<SuccessProps, null> {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.return = this.return.bind(this);
    }

    next() {
        this.props.callback();
        nav.pop();
    }
    return() {
        nav.pop(2);
    }
    render() {
        return <Page header='提交成功'>
            <div>
                成功提交！
            </div>
            <Button onClick={this.next}>继续录入</Button>
            <Button onClick={this.return}>不继续</Button>
        </Page>;
    }
}
