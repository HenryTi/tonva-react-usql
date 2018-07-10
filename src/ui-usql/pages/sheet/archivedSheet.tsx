import * as React from 'react';
import {Button} from 'reactstrap';
import {List} from 'tonva-react-form';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUIO} from '../../ui';
import {MainDetails, MainDetailsView} from '../tools';
import {SheetView} from './sheetView';

export interface State {
    flows: any;
    data: any;
}
export class ArchivedSheet extends React.Component<SheetUIProps, State> {
    private mainDetails: MainDetails; 
    constructor(props) {
        super(props);
        this.state = {
            flows: undefined,
            data: undefined,
        }
        this.mainDetails = this.props.ui.mapMainDetails();
    }

    async componentDidMount() {
        let {ui, data} = this.props;
        let sheet = ui.entity;
        let res = await sheet.getArchive(data.id);
        let {brief, data:sheetData, flows} = res;
        this.setState({
            data: sheetData,
            flows: flows
        });
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
        let {ui, data:brief} = this.props;
        let {entity:sheet} = ui;
        /*
        let removed;
        if (brief.state === '-')
            removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
        let flow;
        if (this.state.res !== undefined) {
            flow = <List className="mx-3" header="流程"
                items={this.state.res[1]}
                item={{}}/>
        }
        */
        return <Page header={sheet.name + ':' + '-' + brief.no}>
            <ui.view ui={ui}
                data={this.state.data} 
                className="mx-3 my-2" 
                sheetState={brief.state} 
                flows={this.state.flows} />
        </Page>;
    }
}
