import * as React from 'react';
import { Button } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { VmView } from './vmView';
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';

export class VmSheetAction extends VmEntity<Sheet, SheetUI> {
    protected coordinator: CrSheet;
    brief: any;
    sheetData: any;
    flows: any[];
    vmView: VmView;

    async showEntry(sheetId:number) {
        let data = await this.entity.getSheet(sheetId);
        let {brief, data:sheetData, flows} = data;
        this.brief = brief;
        this.sheetData = sheetData;
        this.flows = flows;
        this.vmView = new VmView(this.coordinator, this.sheetData, this.brief.state, flows);
    }

    actionClick = async (action:any) => {
        let {id, flow, state} = this.brief;
        let res = await this.entity.action(id, flow, state, action.name);
        alert(JSON.stringify(res));
        await nav.back();
    }

    deleteClick = async () => {
        alert('单据作废：程序正在设计中');
    }

    editClick = async () => {
        alert('修改单据：程序正在设计中');
    }

    protected view = () => {
        let state = this.brief.state;
        let stateLabel = this.coordinator.getStateLabel(state);
        let {states} = this.entity;
        let s = states.find(v => v.name === state);
        let actionButtons, startButtons;
        if (s === undefined) {
            let text:string, cn:string;
            switch (state) {
                default:
                    text = '不认识的单据状态\'' + state + '\'';
                    cn = 'text-info';
                    break;
                case '-': 
                    text = '已作废';
                    cn = 'text-danger';
                    break;
                case '#':
                    text = '已归档';
                    cn = 'text-success';
                    break;
            }
            actionButtons = <div className={cn}>[{text}]</div>;
        }
        else {
            actionButtons = <div className="flex-grow-1">{s.actions.map((v,index) => 
                <Button
                    key={index}
                    className="mr-2"
                    color="primary"
                    onClick={()=>this.actionClick(v)}
                >
                    {this.coordinator.getActionLabel(state, v.name)}
                </Button>)}
            </div>;
            if (state === '$') {
                startButtons = <div>
                    <Button outline={true} className="ml-2" color="info" onClick={this.editClick}>修改</Button>
                    <Button outline={true} className="ml-2" color="danger" onClick={this.deleteClick}>作废</Button>
                </div>
            }
        };
        return <Page header={this.label + ':' + stateLabel + '-' + this.brief.no}>
            <div className="my-3">
                <div className="d-flex mx-3 mb-3">
                    {actionButtons}
                    {startButtons}
                </div>
                {this.vmView.render()}
            </div>
        </Page>;
    }
}
