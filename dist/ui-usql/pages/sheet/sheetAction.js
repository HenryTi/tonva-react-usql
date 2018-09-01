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
import { nav, Page } from 'tonva-tools';
export class SheetAction extends React.Component {
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
            let { id, flow } = brief;
            let res = yield sheet.action(id, flow, state.state, action.name);
            nav.pop();
        });
    }
    render() {
        let { ui, data } = this.props;
        let { entity: sheet } = ui;
        let { state, brief, stateName } = data;
        let s = sheet.schema.states.find(v => v.name === state.state);
        let actions = s.actions;
        return React.createElement(Page, { header: sheet.name + ':' + stateName + '-' + brief.no },
            React.createElement("div", { className: "mx-3 my-2" }, actions.map((v, index) => React.createElement(Button, { key: index, className: "mr-2", color: "primary", onClick: () => this.actionClick(v) }, v.name))),
            React.createElement(ui.view, { className: "mx-3", ui: ui, sheetState: brief.state, data: this.state.data, flows: this.state.flows }));
    }
}
//# sourceMappingURL=sheetAction.js.map