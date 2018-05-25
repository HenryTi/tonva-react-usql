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
export class SheetAction extends React.Component<SheetUIProps, State> {
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
        let {id, flow} = brief;
        let res = await sheet.action(id, flow, state.state, action.name);
        nav.pop();
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
            <ui.view className="mx-3"
                ui={ui} 
                sheetState={brief.state} 
                data={this.state.data} 
                flows={this.state.flows} />
        </Page>;
    }
}
