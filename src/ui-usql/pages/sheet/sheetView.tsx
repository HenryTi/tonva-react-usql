import * as React from 'react';
import {List, Muted, LMR, EasyDate, FA} from 'tonva-react-form';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUI} from '../../ui';
import {MainDetails, MainDetailsView} from '../tools';

export interface SheetViewProps {
    className?: string;
    ui: SheetUI;
    sheetState: string;
    sheetData: any;
    flows: any;
}
export class SheetView extends React.Component<SheetViewProps> {
    private mainDetails: MainDetails; 
    constructor(props) {
        super(props);
        let {ui} = this.props;
        this.mainDetails = ui.mapMainDetails();
        this.flowRow = this.flowRow.bind(this);
    }
    flowRow(item:any, index:number):JSX.Element {
        let {date, user, preState, state, action} = item;
        if (action === undefined) action = <><FA className="text-primary" name="pencil-square-o" /> 制单</>;
        let to;
        switch (state) {
            case '$': break;
            case '#': to = <><FA className="text-success" name="file-archive-o" /></>; break;
            default: to = <><FA className="text-muted" name="arrow-right" /> &nbsp; {state}</>; break;
        }
        return <div className="row">
            <div className="col-sm"><div className="pl-3 py-2">{action}</div></div>
            <div className="col-sm"><div className="p-2">{to}</div></div>
            <div className="col-sm text-right"><div className="p-2"><Muted><EasyDate date={date} /></Muted></div></div>
        </div>;
    }
    render() {
        let {className, ui, sheetState, sheetData, flows} = this.props;
        let {entity:sheet} = ui;
        let removed;
        if (sheetState === '-')
            removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
        let flow = <List header={<Muted>流程</Muted>}
            items={flows}
            item={{render:this.flowRow}}/>
        return <div className={className}>
            {removed}
            <MainDetailsView
                ui={ui}
                mainDetails={this.mainDetails} 
                values={sheetData} />
            {flow}
        </div>;
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/