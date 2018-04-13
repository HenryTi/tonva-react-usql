var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button } from 'reactstrap';
import { tonvaDebug } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
import { SheetView } from './sheetView';
export class SheetActionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flows: undefined,
            data: undefined
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, data } = this.props;
            let { entity: sheet } = ui;
            let res = yield sheet.getSheet(data.brief.id);
            let { brief, data: sheetData, flows } = res;
            this.setState({
                data: sheetData,
                flows: flows
            });
        });
    }
    actionClick(action) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, data } = this.props;
            let { entity: sheet } = ui;
            let { state, brief } = data;
            let res = yield sheet.action(brief.id, brief.flow, state.state, action.name);
            //alert(JSON.stringify(res));
            nav.pop();
        });
    }
    mapper(row, index) {
        return React.createElement("li", { key: index },
            "id:",
            row.id,
            ", no:",
            row.no,
            ", discription:",
            row.discription,
            ", date:",
            row.date);
    }
    render() {
        let { ui, data } = this.props;
        let { entity: sheet } = ui;
        let { state, brief, stateName } = data;
        let s = sheet.schema.states.find(v => v.name === state.state);
        let actions = s.actions;
        tonvaDebug();
        return React.createElement(Page, { header: sheet.name + ':' + stateName + '-' + brief.no },
            React.createElement("div", { className: "mx-3 my-2" }, actions.map((v, index) => React.createElement(Button, { key: index, className: "mr-2", color: "primary", onClick: () => this.actionClick(v) }, v.name))),
            React.createElement(SheetView, { className: "mx-3", ui: ui, sheetState: brief.state, sheetData: this.state.data, flows: this.state.flows }));
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/
//# sourceMappingURL=sheetAction.js.map