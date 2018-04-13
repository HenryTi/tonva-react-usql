import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Button, Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {TonvaForm, List, FormRow, SubmitResult} from 'tonva-react-form';
import {SheetUI, EntitiesUI} from '../../ui';
import {Detail, MainDetails} from './model';

export interface MainDetailsFormProps {
    className?: string;
    ui: SheetUI;
    mainDetails: MainDetails;
    values: any;
    confirmLeave?: boolean;
    onSubmit: (values:any) => void;
}

@observer
export class MainDetailsForm extends React.Component<MainDetailsFormProps> {
    private values:any;
    private formRows:FormRow[];
    
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onNew = this.onNew.bind(this);
        this.onDetailSubmit = this.onDetailSubmit.bind(this);
        let {values, mainDetails} = this.props;
        let {main, details} = this.props.mainDetails;
        let v = _.merge({}, values);
        for (let arr of details) {
            let name = arr.name;
            let vArr = v[name];
            if (vArr === undefined) v[name] = [];
        }
        //this.state = this.values;
        this.values = observable(v);
        this.formRows = this.buildMainRows();
    }
    private onSubmit(values:any):Promise<SubmitResult | undefined> {
        let {mainDetails} = this.props;
        let {details} = this.props.mainDetails;
        if (details !== undefined) {
            for (let d of details) {
                let n = d.name;
                values[n] = this.values[n].peek();
            }
        }
        this.props.onSubmit(values);
        return;
    }
    onDetailEdit(detail:Detail, row:any) {
        nav.push(<DetailPage
            entitiesUI={this.props.ui.entitiesUI} 
            detail={detail} 
            values={row} 
            onDetailSubmit={this.onDetailSubmit}  />);
    }
    onDetailSubmit(detail: Detail, inValues:any, values:any) {
        let detailValues = this.values[detail.name];
        if (inValues === undefined)
            detailValues.push(values);
        else
            _.assign(inValues, values);
    }
    onNew(detail:Detail) {
        nav.push(<DetailPage
            entitiesUI={this.props.ui.entitiesUI} 
            detail={detail}
            values={undefined} onDetailSubmit={this.onDetailSubmit}  />);
    }
    private buildMainRows():FormRow[] {
        let {ui, mainDetails} = this.props;
        let {main, details} = mainDetails;
        let formRows:FormRow[] = main === undefined? [] : _.clone(main);
        if (details === undefined) return;
        for (let d of details) {
            let header = <div className={classNames('main-detail-header')}>
                <label>{d.label || d.name}</label>
                <Button size='sm' color='success' onClick={()=>this.onNew(d)}> + </Button>
            </div>;
            formRows.push(<List
                header={header}
                items={this.values[d.name]}
                item={{
                    render:(item:any, index:number) => <d.renderRow ui={ui} data={{item:item, detail:d}} />, 
                    onClick:row=>this.onDetailEdit(d, row)
                }}/>);
        }
        return formRows;
    }
    render() {
        let {className, ui} = this.props;
        return <div>
            <TonvaForm className={className}
                formRows={this.formRows}
                context={ui.entitiesUI}
                onSubmit={this.onSubmit} />
        </div>;
    }
}

interface DetailPageProps {
    entitiesUI: EntitiesUI;
    detail: Detail;
    onDetailSubmit: (detail:Detail, inValues:any, values:any) => void;
    values: any;
}
class DetailPage extends React.Component<DetailPageProps, null> {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(values:any):Promise<SubmitResult|undefined> {
        let {detail, values:initValues} = this.props;
        this.props.onDetailSubmit(detail, initValues, values);
        //setTimeout(() => {
            nav.back(false);
        //}, 0);
        return;
    }
    render() {
        let {entitiesUI, detail, values} = this.props;
        return <Page header={detail.label || detail.name}>
            <TonvaForm className="mx-3 my-2"
                context={entitiesUI}
                formRows={detail.fields} 
                onSubmit={this.onSubmit}
                initValues={values} />
        </Page>;
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
