import * as React from 'react';
import * as classNames from 'classnames';
import {Button, Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {FA} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {MainDetails, MainDetailsForm} from '../tools';

export class SheetNew extends React.Component<SheetUIProps> {
    private mainDetails: MainDetails; 
    constructor(props) {
        super(props);
        let {ui} = this.props;
        this.mainDetails = ui.mapMainDetails();
        this.onSubmit = this.onSubmit.bind(this);
    }
    successCallback() {
    }
    async onSubmit(values) {
        let entity = this.props.ui.entity;
        let schema = entity.schema;
        let id = await entity.save(undefined, values);
        if (id < 0) {
            let unique = schema.unique;
            if (unique !== undefined) {
                for (let u of unique) {
                    //this.form.setError(u, true, '重复');
                }
            }
        }
        else {
            let callback = this.successCallback.bind(this);
            nav.push(<Success callback={callback} />);
        }
    }

    render() {
        let {ui} = this.props;
        let {entity} = ui;
        let {name, schema} = entity;
        return <Page header={'新' + name}>
            <MainDetailsForm className="mx-3 my-2"
                ui={ui}
                mainDetails={this.mainDetails} 
                values={{}} 
                onSubmit={this.onSubmit}  />
        </Page>
    }
}

interface SuccessProps {
    callback: () => void;
}
class Success extends React.Component<SuccessProps> {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.finish = this.finish.bind(this);
    }

    next() {
        this.props.callback();
        nav.pop();
    }
    finish() {
        nav.pop(2);
    }
    render() {
        return <Page header='提交成功'>
            <div className='m-3'>
                <span className="text-success">
                    <FA name='check-circle' size='lg' /> 成功提交！
                </span>
                <div className='mt-5'>
                    <Button className="mr-3" color="primary" onClick={this.next}>继续录入</Button>
                    <Button color="primary" outline={true} onClick={this.finish}>不继续</Button>
                </div>
            </div>
        </Page>;
    }
}
