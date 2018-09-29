import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { List, Muted, FA, LMR, EasyDate } from 'tonva-react-form';
import { VSheetAction } from './vSheetAction';
import { VEntity } from '../VM';
import { Sheet } from '../../entities';
import { CSheet, SheetUI } from './cSheet';

export class VSheetList extends VEntity<Sheet, SheetUI, CSheet> {
    protected row: (values) => JSX.Element;
    stateName: string;
    stateLabel: string;

    async showEntry(item:any) {
        this.row = this.ui.listRow || this.rowContent;
        this.stateName = item.state;
        this.stateLabel = this.controller.getStateLabel(this.stateName);
        await this.entity.getStateSheets(this.stateName, 0, 30);
        this.openPage(this.view);
    }

    rowClick = async (brief:any) => {
        if (brief.processing===1) return;
        this.event('action', brief.id);
    }

    protected rowContent = (row:any):JSX.Element => {
        let {id, no, discription, date, processing} = row;
        let left = <>            
            {no} &nbsp; <Muted>{discription}</Muted> {processing===1? '...' : ''}
        </>;
        let right = <Muted><EasyDate date={date} /></Muted>;
        return <LMR className="px-3 py-2" left={left} right={right} />;
    }

    private renderRow = (row:any, index:number) => <this.row {...row} />

    protected view = () => {
        let sheets = this.entity.stateSheets;
        return <Page header={this.label + ' - ' + this.stateLabel}>
            <List items={sheets} item={{render:this.renderRow, onClick:this.rowClick}} />
        </Page>;
    }
}
