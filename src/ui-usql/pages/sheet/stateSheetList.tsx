import * as React from 'react';
import {observer} from 'mobx-react';
import {nav, Page} from 'tonva-tools';
import {List, LMR, FA} from 'tonva-react-form';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {SheetAction} from './sheetAction';

interface DataProps {
    stateName: string;
    state: any;
}

@observer
export class StateSheetList extends React.Component<SheetUIProps> {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.click = this.click.bind(this);
    }

    async componentWillMount() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state} = data;
        await sheet.getStateSheets(state.state, 0, 10);
    }
    async click(brief:any) {
        if (brief.processing===1) return;
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, stateName} = data;
        nav.push(<SheetAction ui={ui} data={{stateName:stateName, state:state, brief:brief}} />);
    }

    renderRow(row:any, index:number) {
        let left = <>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </>;
        let right = <FA className="align-self-center" name="angle-right" />;
        return <LMR className="px-3 py-2" left={left} right={right} />;
    }
    render() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, stateName} = data;
        let sheets = sheet.stateSheets;
        return <Page header={sheet.name + stateName}>
            <List items={sheets} item={{render:this.renderRow, onClick:this.click}} />
        </Page>;
    }
}
