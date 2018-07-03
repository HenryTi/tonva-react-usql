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
import { TonvaForm, List } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
        this.submit = this.submit.bind(this);
    }
    submit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui } = this.props;
            yield ui.entity.resetPage(30, values);
            nav.push(React.createElement(QueryResultPage, { ui: ui }));
            return;
        });
    }
    render() {
        let { ui } = this.props;
        let { caption, entity, entitiesUI } = ui;
        let { name, schema } = entity;
        return React.createElement(Page, { header: caption || name },
            React.createElement(TonvaForm, { className: "m-3", 
                //context={entitiesUI}
                formRows: this.formRows, onSubmit: this.submit }));
    }
}
let QueryResultPage = class QueryResultPage extends React.Component {
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, data } = this.props;
            let { entity, caption } = ui;
            yield entity.loadPage();
        });
    }
    render() {
        let { ui, data } = this.props;
        let { entity, caption } = ui;
        let { name, list } = entity;
        return React.createElement(Page, { header: caption || name },
            React.createElement(List, { items: list, item: {} }));
    }
};
QueryResultPage = __decorate([
    observer
], QueryResultPage);
//# sourceMappingURL=mainPage.js.map