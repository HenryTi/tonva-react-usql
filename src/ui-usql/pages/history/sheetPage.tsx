import * as React from 'react';
import {Button} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {SheetView} from '../sheet/sheetView';

interface DataProps {
    no: string;
    state: string;
    stateName: string;
    brief: any;
    sheetData:any;
    flows:any;
}
/*
interface State {
    res: any;
    data: any;
}
*/
export class SheetPage extends React.Component<SheetUIProps> {
    constructor(props) {
        super(props);
    }
    /*
    async componentDidMount() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let res = await sheet.getSheet(data.brief.id)
        let ret = res[0];
        let sheetData;
        if (ret.length === 1) {
            sheetData = sheet.unpack(ret[0].data);
        }
        this.setState({
            data: sheetData,
            res: res
        });
    }*/
    /*
    async actionClick(action:any) {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, brief} = data;
        let res = await sheet.action(brief.id, brief.flow, state.state, action.name);
        //alert(JSON.stringify(res));
        nav.pop();
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }*/
    render() {
        let {ui, data} = this.props;
        let d:DataProps = data;
        let {entity:sheet} = ui;
        let {no, state, stateName, sheetData, flows} = d;
        //let s = sheet.schema.states.find(v => v.name === state.state);
        //let actions = s.actions;
        return <Page header={sheet.name + ':' + no}>
            <SheetView className="mx-3 my-3"
                ui={ui} 
                sheetState={state} 
                sheetData={sheetData} 
                flows={flows} />
        </Page>;
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/
