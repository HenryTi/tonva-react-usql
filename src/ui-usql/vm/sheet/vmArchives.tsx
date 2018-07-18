import * as React from 'react';
import { Page } from 'tonva-tools';
import {List, LMR, FA} from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmArchived } from './vmArchived';

export class VmArchives extends VmSheet {
    list: any[];

    protected async beforeStart() {
        this.list = await this.entity.getArchives(undefined, 10);
    }

    archiveClick = async (brief:any) => {
        if (brief.processing===1) return;
        this.navVm(VmArchived, brief);
    }
    archiveRow = (row:any, index:number) => {
        let left = <>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </>;
        let right = <FA className="align-self-center" name="angle-right" />;
        return <LMR className="px-3 py-2" left={left} right={right} />
    }

    protected view = Archives;
}

const Archives = ({vm}:{vm:VmArchives}) => {
    let {label, list, archiveRow, archiveClick} = vm;
    return <Page header={'已归档' + label}>
        <List items={list} item={{render:archiveRow, onClick:archiveClick}} />
    </Page>;
}
