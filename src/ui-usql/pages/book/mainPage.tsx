import * as React from 'react';
import {observer} from 'mobx-react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {TonvaForm, FormRow, SubmitResult, List, Muted} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Book} from '../../entities';
import {EntitiesUIProps, EntityUIProps, BookUIProps} from '../../ui';
import {EntitiesUI, BookUI} from '../../ui';

export class MainPage extends React.Component<BookUIProps> {
    private formRows: FormRow[];

    constructor(props) {
        super(props);
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
        if (this.formRows.length === 0) {
            this.formRows.push({
                label: '[无参数]', 
                help: <Muted>不需要参数，直接分页显示账本内容</Muted>
            });
        }
        this.submit = this.submit.bind(this);
    }

    async submit(values: any): Promise<SubmitResult | undefined> {
        let {ui} = this.props;
        await ui.entity.resetPage(30, values);
        nav.push(<BookResultPage ui={ui} />);
        return;
    }

    render() {
        let {ui} = this.props;
        let {caption, entity, entitiesUI} = ui;
        let {name, schema} = entity;
        return <Page header={caption || name}>
            <TonvaForm className="m-3" 
                context={entitiesUI}
                formRows={this.formRows} 
                onSubmit={this.submit} />
        </Page>;
    }
}

@observer
class BookResultPage extends React.Component<BookUIProps> {
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