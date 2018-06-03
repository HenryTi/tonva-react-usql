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
import { Button, Badge } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { List, LMR, Muted } from 'tonva-react-form';
import { SchemaPage } from './schemaPage';
let MainPage = class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderState = this.renderState.bind(this);
        this.sheetStateClick = this.sheetStateClick.bind(this);
        this.onWsReceive = this.onWsReceive.bind(this);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let ui = this.props.ui;
            ui.onWsReceive('sheetAct', this.onWsReceive);
            let sheet = ui.entity;
            yield sheet.getStateSheetCount();
        });
    }
    componentWillUnmount() {
        this.props.ui.endWsReceive();
    }
    onWsReceive(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.ui.entity.onReceive(data);
        });
    }
    newClick() {
        let { ui } = this.props;
        nav.push(React.createElement(ui.sheetNew, { ui: ui, data: {} }));
    }
    schemaClick() {
        nav.push(React.createElement(SchemaPage, { ui: this.props.ui }));
    }
    sheetStateClick(state) {
        let { ui } = this.props;
        let stateName = state.state === '$' ? '新单' : state.state;
        nav.push(React.createElement(ui.stateSheetList, { ui: ui, data: { state: state, stateName: stateName } }));
    }
    archivesClick() {
        let { ui } = this.props;
        nav.push(React.createElement(ui.archivedList, { ui: ui }));
    }
    renderState(row, index) {
        let { state, count } = row;
        let stateName = state === '$' ? '新单' : state;
        //if (!count) return;
        let badge = React.createElement(Badge, { className: "ml-5 align-self-end", color: "success" }, count);
        return React.createElement(LMR, { className: "px-3 py-2", left: stateName, right: badge });
    }
    render() {
        let ui = this.props.ui;
        let entity = ui.entity;
        let name = entity.name;
        return React.createElement(Page, { header: name },
            React.createElement("div", { className: "mx-3 my-2" },
                React.createElement(Button, { className: "mr-2", color: "primary", onClick: () => this.newClick() }, "\u65B0\u5EFA"),
                React.createElement(Button, { className: "mr-2", color: "primary", onClick: () => this.schemaClick() }, "\u6A21\u677F")),
            React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                    "\u5F85\u5904\u7406",
                    name), none: "[ \u65E0 ]", items: entity.statesCount.filter(row => row.count), item: { render: this.renderState, onClick: this.sheetStateClick } }),
            React.createElement("div", { className: "mx-3 my-2" },
                React.createElement(Button, { color: "primary", onClick: () => this.archivesClick() },
                    "\u5DF2\u5F52\u6863",
                    name)));
    }
};
MainPage = __decorate([
    observer
], MainPage);
export { MainPage };
//# sourceMappingURL=mainPage.js.map