import * as React from 'react';
import {observer} from 'mobx-react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {TonvaForm, FormRow, SubmitResult, List} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Query} from '../../entities';
import {EntitiesUIProps, EntityUIProps, QueryUIProps} from '../../ui';
import {EntitiesUI, QueryUI} from '../../ui';

export class MainPage extends React.Component<QueryUIProps> {
    private formRows: FormRow[];

    constructor(props) {
        super(props);
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
        this.submit = this.submit.bind(this);
    }

    async submit(values: any): Promise<SubmitResult | undefined> {
        let {ui} = this.props;
        await ui.entity.resetPage(30, values);
        nav.push(<QueryResultPage ui={ui} />);
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

@observer
class QueryResultPage extends React.Component<QueryUIProps> {
    async componentWillMount() {
        let {ui, data} = this.props;
        let {entity, caption} = ui;
        await entity.loadPage();
    }
    render() {
        let {ui, data} = this.props;
        let {entity, caption} = ui;
        let {name, loaded, list} = entity;
        let content;
        if (loaded === true) {
            content = <List items={list} item={{}} />;
        }
        else {
            content = <div>...</div>;
        }
        return <Page header={caption || name}>
            {content}
        </Page>;
    }
}