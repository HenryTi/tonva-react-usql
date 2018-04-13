import * as React from 'react';
import * as classNames from 'classnames';
import {Button, Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {FA} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {MainDetails, MainDetailsForm} from '../tools';

export class SheetNewPage extends React.Component<SheetUIProps> {
    private mainDetails: MainDetails; 
    constructor(props) {
        super(props);
        `{"fields":[
            {"name":"id1","type":"bigint","tuid":"article"},
            {"name":"f1","type":"dec","scale":2,"precision":12},
            {"name":"f2","type":"dec","scale":2,"precision":12}
        ],"name":"单据","type":"sheet",
        "states":[{"name":"$","actions":[{"name":"s1","returns":[],"busFaces":[]},{"name":"s2","returns":[],"busFaces":[]}]},{"name":"a","actions":[{"name":"a1","returns":[{"name":"statearet1","fields":[{"name":"c","type":"int"},{"name":"state","type":"char","size":30}]},{"name":"statearet2","fields":[{"name":"dd","type":"datetime"}]}],"busFaces":[]},{"name":"a2","returns":[],"busFaces":[]}]},{"name":"b","actions":[]}],
        "arrs":[
            {
                "name":"arr1",
                "fields":[
                    {"name":"f11","type":"char","size":50},
                    {"name":"f12","type":"char","size":30}
                ]
            }
        ]}`
        let {ui} = this.props;
        this.mainDetails = ui.mapMainDetails();
        this.state = {
            data: undefined
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    /*
    componentDidMount() {
        this.packData = new PackData;
        this.packData.item = {id: 1};
        this.setState({
            data: this.packData
        })
        this.packData.onChange(d => {
            this.setState({
                data: d
            });
        });
    }*/
    /*
    componentWillUnmount() {
        if (this.packData !== undefined) this.packData.clearInterval();
    }

    async handleValidSubmit(event, values) {
        let entity = this.props.ui.entity;
        let schema = entity.schema;
        let res = await entity.save(undefined, values);
        let retId = res.id;
        if (retId < 0) {
            let unique = schema.unique;
            if (unique !== undefined) {
                for (let u of unique) {
                    //this.form.setError(u, true, '重复');
                }
            }
        }
        else {
            let callback = this.callback.bind(this);
            nav.push(<Success callback={callback} />);
        }
    }
*/
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
class Success extends React.Component<SuccessProps, null> {
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
