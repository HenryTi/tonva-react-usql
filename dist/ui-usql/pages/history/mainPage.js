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
import { TonvaForm, List, EasyDate, LMR, Muted } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
import { SheetPage } from './sheetPage';
export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        let ui = this.props.ui;
        this.formRows = ui.mapKeys();
        this.submit = this.submit.bind(this);
    }
    submit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui } = this.props;
            yield ui.entity.resetPage(30, values);
            nav.push(React.createElement(HistoryResultPage, { ui: ui }));
            return;
        });
    }
    render() {
        let { ui } = this.props;
        let { caption, entity, entitiesUI } = ui;
        let { name, schema } = entity;
        return React.createElement(Page, { header: caption || name },
            React.createElement(TonvaForm, { className: "m-3", context: entitiesUI, formRows: this.formRows, onSubmit: this.submit }));
    }
}
let HistoryResultPage = class HistoryResultPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, data } = this.props;
            let { entity, caption } = ui;
            yield entity.loadPage();
        });
    }
    onRowClick(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui } = this.props;
            let { entity } = ui;
            let { schema } = entity;
            let type = item[schema.sheetType];
            let sheetId = item[schema.sheet];
            let sheetUI = ui.entitiesUI.sheet.idColl[type];
            if (sheetUI === undefined)
                return;
            let { entity: sheet } = sheetUI;
            let sheetData = yield sheetUI.entity.getSheet(sheetId);
            let { brief, data, flows } = sheetData;
            nav.push(React.createElement(SheetPage, { ui: sheetUI, data: {
                    no: brief.no,
                    state: brief.state,
                    stateName: undefined,
                    brief: brief,
                    sheetData: data,
                    flows: flows,
                } }));
        });
    }
    renderRow(item, index) {
        let { ui } = this.props;
        let { type } = item;
        let { listRow: ListRow } = ui;
        let sheetCaption;
        if (type)
            sheetCaption = ui.entitiesUI.sheet.idColl[type].caption;
        let right = React.createElement(Muted, null,
            React.createElement(EasyDate, { date: item.date }),
            " ",
            sheetCaption);
        let content;
        if (ListRow !== undefined) {
            content = React.createElement(ListRow, { item: item, index: index });
        }
        else {
            content = '';
            for (let f of ui.entity.schema.fields) {
                let v = item[f.name] || '-';
                content += f.name + ': ' + v + ' ';
            }
        }
        return React.createElement(LMR, { className: "px-3 py-2", right: right }, content);
    }
    render() {
        let { ui, data } = this.props;
        let { entity, caption } = ui;
        let { name, loaded, list } = entity;
        let content;
        if (loaded === true) {
            content = React.createElement(List, { items: list, item: { render: this.renderRow, onClick: this.onRowClick } });
        }
        else {
            content = React.createElement("div", null, "...");
        }
        return React.createElement(Page, { header: caption || name }, content);
    }
};
HistoryResultPage = __decorate([
    observer
], HistoryResultPage);
//# sourceMappingURL=mainPage.js.map