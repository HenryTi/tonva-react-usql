var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { nav, Page } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { SheetActionPage } from './sheetAction';
let SheetStatePage = class SheetStatePage extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.click = this.click.bind(this);
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, data } = this.props;
            let { entity: sheet } = ui;
            let { state } = data;
            yield sheet.getStateSheets(state.state, 0, 10);
        });
    }
    click(brief) {
        return __awaiter(this, void 0, void 0, function* () {
            if (brief.processing === 1)
                return;
            let { ui, data } = this.props;
            let { entity: sheet } = ui;
            let { state, stateName } = data;
            nav.push(React.createElement(SheetActionPage, { ui: ui, data: { stateName: stateName, state: state, brief: brief } }));
        });
    }
    renderRow(row, index) {
        let left = React.createElement(React.Fragment, null,
            row.processing === 1 ? '... ' : '',
            "id:",
            row.id,
            ", no:",
            row.no,
            ", discription:",
            row.discription,
            ", date:",
            row.date);
        let right = React.createElement(FA, { className: "align-self-center", name: "angle-right" });
        return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
    }
    render() {
        let { ui, data } = this.props;
        let { entity: sheet } = ui;
        let { state, stateName } = data;
        let sheets = sheet.stateSheets;
        return React.createElement(Page, { header: sheet.name + stateName },
            React.createElement(List, { items: sheets, item: { render: this.renderRow, onClick: this.click } }));
    }
};
SheetStatePage = __decorate([
    observer
], SheetStatePage);
export { SheetStatePage };
// <pre>{JSON.stringify(state, undefined, ' ')}</pre>
//# sourceMappingURL=sheetState.js.map