import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {List, LMR, FA} from 'tonva-react-form';
import { VmSheet } from './vmSheet';

export class VmArchives extends VmSheet {
    list: any[];
    async load() {
        await super.load();
        this.list = await this.entity.getArchives(undefined, 10);
    }

    archivedSheet = undefined;
    archiveData: any;
    brief: any;
    archiveClick = async (brief:any) => {
        this.brief = brief;
        if (brief.processing===1) return;
        this.archiveData = await this.entity.getArchive(brief.id);
        //let {brief, data:sheetData, flows} = res;
        nav.push(React.createElement(this.archivedSheet, {vm:this}));
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
    let {caption, list, archiveRow, archiveClick} = vm;
    return <Page header={'已归档' + caption}>
        <List items={list} item={{render:archiveRow, onClick:archiveClick}} />
    </Page>;
}

/*
export class ArchivedSheet extends React.Component<SheetUIProps, State> {
    private mainDetails: MainDetails; 
    constructor(props) {
        super(props);
        this.state = {
            flows: undefined,
            data: undefined,
        }
        this.mainDetails = this.props.ui.mapMainDetails();
    }

    async componentDidMount() {
        let {ui, data} = this.props;
        let sheet = ui.entity;
        let res = await sheet.getArchive(data.id);
        let {brief, data:sheetData, flows} = res;
        this.setState({
            data: sheetData,
            flows: flows
        });
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
*/
const ArchivedSheet = ({vm}:{vm: VmArchives}) => {
    let {caption, archiveData, typeSheetView:SheetView} = vm;
    let {brief, data:sheetData, flows} = archiveData;
    //let {ui, data:brief} = this.props;
    //let {entity:sheet} = ui;
    /*
    let removed;
    if (brief.state === '-')
        removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
    let flow;
    if (this.state.res !== undefined) {
        flow = <List className="mx-3" header="流程"
            items={this.state.res[1]}
            item={{}}/>
    }
    */
    return <Page header={caption + ':' + '-' + brief.no}>
        <SheetView vm={vm} />
    </Page>;
}
