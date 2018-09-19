import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { List, Muted, FA, LMR } from 'tonva-react-form';
import { VmSheetAction } from './vmSheetAction';
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';

export class VmSheetList extends VmEntity<Sheet, SheetUI, CrSheet> {
    //protected coordinator: CrSheet;
    stateName: string;
    stateLabel: string;

    async showEntry(item:any) {
        this.stateName = item.state;
        this.stateLabel = this.coordinator.getStateLabel(this.stateName);
        await this.entity.getStateSheets(this.stateName, 0, 30);
        this.openPage(this.view);
    }

    rowClick = async (brief:any) => {
        if (brief.processing===1) return;
        this.event('action', brief.id);
        //this.navVm(VmSheetAction, brief.id);
    }

    renderRow = (row:any, index:number) => {
        let left = <>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </>;
        let right = <FA className="align-self-center" name="angle-right" />;
        return <LMR className="px-3 py-2" left={left} right={right} />;
    }

    protected view = () => {
        let sheets = this.entity.stateSheets;
        return <Page header={this.label + ' - ' + this.stateLabel}>
            <List items={sheets} item={{render:this.renderRow, onClick:this.rowClick}} />
        </Page>;
    }
}
