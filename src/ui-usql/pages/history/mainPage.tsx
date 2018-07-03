import * as React from 'react';
import {observer} from 'mobx-react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {TonvaForm, FormRow, SubmitResult, List, EasyDate, LMR, Muted} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {History} from '../../entities';
import {EntitiesUIProps, EntityUIProps, HistoryUIProps} from '../../ui';
import {EntitiesUI, HistoryUI} from '../../ui';
import {SheetPage} from './sheetPage';

export class MainPage extends React.Component<HistoryUIProps> {
    private formRows: FormRow[];

    constructor(props) {
        super(props);
        let ui = this.props.ui;
        this.formRows = ui.mapKeys();
        this.submit = this.submit.bind(this);
    }

    async submit(values: any): Promise<SubmitResult | undefined> {
        let {ui} = this.props;
        await ui.entity.resetPage(30, values);
        nav.push(<HistoryResultPage ui={ui} />);
        return;
    }

    render() {
        let {ui} = this.props;
        let {caption, entity, entitiesUI} = ui;
        let {name, schema} = entity;
        return <Page header={caption || name}>
            <TonvaForm className="m-3"
                //context={entitiesUI}
                formRows={this.formRows} 
                onSubmit={this.submit} />
        </Page>;
    }
}

@observer
class HistoryResultPage extends React.Component<HistoryUIProps> {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }
    async componentWillMount() {
        let {ui, data} = this.props;
        let {entity, caption} = ui;
        await entity.loadPage();
    }
    async onRowClick(item:any) {
        let {ui} = this.props;
        let {entity} = ui;
        let {schema} = entity;
        let type = item[schema.sheetType];
        let sheetId = item[schema.sheet];
        let sheetUI = ui.entitiesUI.sheet.idColl[type];
        if (sheetUI === undefined) return;

        let {entity:sheet} = sheetUI;
        let sheetData = await sheetUI.entity.getSheet(sheetId);
        let {brief, data, flows} = sheetData;
        nav.push(<SheetPage ui={sheetUI} data={{
            no: brief.no,
            state: brief.state,
            stateName: undefined,
            brief: brief,
            sheetData: data,
            flows: flows,
        }}  />);
    }
    renderRow(item:any, index:number) {
        let {ui} = this.props;
        let {type} = item;
        let {listRow:ListRow} = ui;
        let sheetCaption;
        if (type)
            sheetCaption = ui.entitiesUI.sheet.idColl[type].caption;
        let right = <Muted><EasyDate date={item.date} /> {sheetCaption}</Muted>;
        let content;
        if (ListRow !== undefined) {
            content = <ListRow item={item} index={index} />;
        }
        else {
            content = '';
            for (let f of ui.entity.schema.fields) {
                let v = item[f.name] || '-';
                content += f.name + ': ' + v + ' ';
            }
        }
        return <LMR className="px-3 py-2" right={right}>
            {content}
        </LMR>
    }
    render() {
        let {ui, data} = this.props;
        let {entity, caption} = ui;
        let {name, list} = entity;
        return <Page header={caption || name}>
            <List items={list} item={{render:this.renderRow, onClick:this.onRowClick}} />
        </Page>;
    }
}