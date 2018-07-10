import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { List, Muted, FA, LMR } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmForm } from '../vmForm';
import { VmSheetAction } from './vmSheetAction';

export class VmSheetList extends VmSheet {
    stateName: string;
    stateLabel: string;

    async beforeStart(item:any) {
        this.stateName = item.state;
        this.stateLabel = this.getStateLabel(this.stateName);
        await this.entity.getStateSheets(this.stateName, 0, 30);
    }
    
    rowClick = async (brief:any) => {
        if (brief.processing===1) return;
        this.nav(VmSheetAction, brief);
        //let {ui, data} = this.props;
        //let {entity:sheet} = ui;
        //let {state, stateName} = data;
        //this.nav(VmSheetAction);
        //nav.push(<SheetAction ui={ui} data={{stateName:stateName, state:state, brief:brief}} />);
    }

    renderRow = (row:any, index:number) => {
        let left = <>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </>;
        let right = <FA className="align-self-center" name="angle-right" />;
        return <LMR className="px-3 py-2" left={left} right={right} />;
    }

    protected view = SheetList;
}

const SheetList = ({vm}:{vm:VmSheetList}) => {
    let {entity, label, stateLabel, renderRow, rowClick} = vm;
    //let {ui, data} = this.props;
    //let {entity:sheet} = ui;
    //let {state, stateName} = data;
    let sheets = entity.stateSheets;
    return <Page header={label + ' - ' + stateLabel}>
        <List items={sheets} item={{render:renderRow, onClick:rowClick}} />
    </Page>;
}
