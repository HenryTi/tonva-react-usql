import * as React from 'react';
import {Button} from 'reactstrap';
import {tonvaDebug} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {SheetView} from './sheetView';

interface DataProps {
    stateName: string;
    state: any;
    brief: any;
}
export interface State {
    flows: any;
    data: any;
}
export class SheetActionPage extends React.Component<SheetUIProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            flows: undefined,
            data: undefined
        }
    }

    async componentDidMount() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let res = await sheet.getSheet(data.brief.id)
        let {brief, data:sheetData, flows} = res;
        this.setState({
            data: sheetData,
            flows: flows
        });
    }
    async actionClick(action:any) {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, brief} = data;
        let res = await sheet.action(brief.id, brief.flow, state.state, action.name);
        //alert(JSON.stringify(res));
        nav.pop();
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, brief, stateName} = data;
        let s = sheet.schema.states.find(v => v.name === state.state);
        let actions = s.actions;
        tonvaDebug();
        return <Page header={sheet.name + ':' + stateName + '-' + brief.no}>
            <div className="mx-3 my-2">
                {
                    actions.map((v,index) => 
                        <Button
                            key={index}
                            className="mr-2"
                            color="primary"
                            onClick={()=>this.actionClick(v)}
                        >
                            {v.name}
                        </Button>)
                }
            </div>
            <SheetView className="mx-3"
                ui={ui} 
                sheetState={brief.state} 
                sheetData={this.state.data} 
                flows={this.state.flows} />
        </Page>;
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/
