import * as React from 'react';
import { Page } from 'tonva-tools';
import { SheetView } from '../sheet/sheetView';
/*
interface State {
    res: any;
    data: any;
}
*/
export class SheetPage extends React.Component {
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
        let { ui, data } = this.props;
        let d = data;
        let { entity: sheet } = ui;
        let { no, state, stateName, sheetData, flows } = d;
        //let s = sheet.schema.states.find(v => v.name === state.state);
        //let actions = s.actions;
        return React.createElement(Page, { header: sheet.name + ':' + no },
            React.createElement(SheetView, { className: "mx-3 my-3", ui: ui, sheetState: state, sheetData: sheetData, flows: flows }));
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/
//# sourceMappingURL=sheetPage.js.map