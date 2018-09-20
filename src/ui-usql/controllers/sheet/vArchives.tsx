import * as React from 'react';
import { Page } from 'tonva-tools';
import {List, LMR, FA} from 'tonva-react-form';
import { VEntity } from '../VM';
import { Sheet } from '../../entities';
import { SheetUI, CSheet } from './cSheet';

export class VArchives extends VEntity<Sheet, SheetUI, CSheet> {
    list: any[];

    async showEntry() {
        this.list = await this.entity.getArchives(undefined, 10);
        this.openPage(this.view);
    }

    archiveClick = async (brief:any) => {
        if (brief.processing===1) return;
        this.event('archived', brief);
    }
    archiveRow = (row:any, index:number) => {
        let left = <>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </>;
        let right = <FA className="align-self-center" name="angle-right" />;
        return <LMR className="px-3 py-2" left={left} right={right} />
    }

    protected view = () => {
        return <Page header={'已归档' + this.label}>
            <List items={this.list} item={{render:this.archiveRow, onClick:this.archiveClick}} />
        </Page>;
    };
}
