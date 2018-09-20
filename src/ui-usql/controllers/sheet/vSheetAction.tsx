import React from 'react';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { VSheetView } from './vSheetView';

export class VSheetAction extends VSheetView { 
    brief: any;

    async showEntry(sheetId:number) {
        let {brief, data, flows} = await this.controller.getSheetData(sheetId);
        this.brief = brief;
        this.flows = flows;
        this.data = data;
        this.state = this.brief.state;
        this.vForm = this.createForm(undefined, this.data);
        this.openPage(this.page);
    }

    actionClick = async (action:any) => {
        let {id, flow, state} = this.brief;
        let res = await this.controller.action(id, flow, state, action.name);
        alert(JSON.stringify(res));
        await this.backPage();
    }

    deleteClick = async () => {
        alert('单据作废：程序正在设计中');
    }

    editClick = async () => {
        alert('修改单据：程序正在设计中');
    }

    protected page = () => {
        let state = this.brief.state;
        let stateLabel = this.controller.getStateLabel(state);
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
            actionButtons = <div className={classNames(cn)}>[{text}]</div>;
        }
        else {
            actionButtons = <div className="flex-grow-1">{s.actions.map((v,index) => 
                <Button
                    key={index}
                    className="mr-2"
                    color="primary"
                    onClick={()=>this.actionClick(v)}
                >
                    {this.controller.getActionLabel(state, v.name)}
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
            <div className="mb-2">
                <div className="d-flex px-3 py-2 border-bottom bg-light">
                    {actionButtons}
                    {startButtons}
                </div>
                <this.sheetView />
            </div>
        </Page>;
    }
}