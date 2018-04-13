import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {TonvaForm, FormRow, SubmitResult} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Action} from '../../entities';
import {EntitiesUI, ActionUI, EntitiesUIProps, EntityUIProps, ActionUIProps} from '../../ui';

export class MainPage extends React.Component<ActionUIProps> {
    private formRows: FormRow[];

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
    }
    async submit(values: any): Promise<SubmitResult | undefined> {
        let {ui} = this.props;
        values.arr1 = [
            {t1:11, k:'a b'},
            {t1:22, k:'bbbb'},
        ];
        values.arr2 = [
            {k1: '1----abb ddd'},
            {k1: '2----ddddd'},
        ];
        let ret = await ui.entity.submit(values);
        nav.pop();
        nav.push(<ActionResultPage ui={ui} data={ret} />)
        return;
    }
    render() {
        let {ui} = this.props;
        let {caption, entity} = ui;
        let {name, schema} = entity;
        return <Page header={caption || name}>
            <TonvaForm className="m-3" 
                formRows={this.formRows} 
                onSubmit={this.submit} />
        </Page>;
    }
}

class ActionResultPage extends React.Component<ActionUIProps> {
    render() {
        let {ui, data} = this.props;
        let {caption, entity} = ui;
        let {name} = entity;
        return <Page header={caption || name} back="close">
            <pre>
                {JSON.stringify(data, undefined, ' ')}
            </pre>
        </Page>
    }
}