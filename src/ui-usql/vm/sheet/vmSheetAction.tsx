import * as React from 'react';
import { Button } from 'reactstrap';
import { tonvaDebug } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
import { VmSheet } from './vmSheet';
import { VmView } from './vmView';

export class VmSheetAction extends VmSheet {
    brief: any;
    sheetData: any;
    flows: any[];
    vmView: VmView;

    async start(inBrief:any) {
        let data = await this.entity.getSheet(inBrief.id)
        let {brief, data:sheetData, flows} = data;
        this.brief = brief;
        this.sheetData = sheetData;
        this.flows = flows;
        this.vmView = new VmView(this.vmApi, this.entity, this.ui, this.sheetData, this.brief.state, flows);
        super.start();
    }

    actionClick = async (action:any) => {
        let {id, flow, state} = this.brief;
        let res = await this.entity.action(id, flow, state, action.name);
        alert(JSON.stringify(res));
        this.popPage();
    }
    protected view = SheetAction;
}

const SheetAction = ({vm}:{vm:VmSheetAction}) => {
    let {label, entity, brief, actionClick, vmView} = vm;
    let state = brief.state;
    let stateLabel = vm.getStateLabel(state);
    let s = entity.schema.states.find(v => v.name === state);
    let actions = s.actions;
    tonvaDebug();
    return <Page header={label + ':' + stateLabel + '-' + brief.no}>
        <div className="my-3">
            <div className="mx-3 mb-3">
                {
                    actions.map((v,index) => 
                        <Button
                            key={index}
                            className="mr-2"
                            color="primary"
                            onClick={()=>actionClick(v)}
                        >
                            {vm.getActionLabel(state, v.name)}
                        </Button>)
                }
            </div>
            {vmView.render()}
        </div>
    </Page>;
}
