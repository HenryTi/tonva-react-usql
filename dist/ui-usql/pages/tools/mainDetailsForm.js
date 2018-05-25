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
import * as classNames from 'classnames';
import * as _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { TonvaForm, List } from 'tonva-react-form';
let MainDetailsForm = class MainDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onNew = this.onNew.bind(this);
        this.onDetailSubmit = this.onDetailSubmit.bind(this);
        let { values, mainDetails } = this.props;
        let { main, details } = this.props.mainDetails;
        let v = _.merge({}, values);
        for (let arr of details) {
            let name = arr.name;
            let vArr = v[name];
            if (vArr === undefined)
                v[name] = [];
        }
        //this.state = this.values;
        this.values = observable(v);
        this.formRows = this.buildMainRows();
    }
    onSubmit(values) {
        let { mainDetails } = this.props;
        let { details } = this.props.mainDetails;
        if (details !== undefined) {
            for (let d of details) {
                let n = d.name;
                values[n] = this.values[n].peek();
            }
        }
        this.props.onSubmit(values);
        return;
    }
    onDetailEdit(detail, row) {
        nav.push(React.createElement(DetailPage, { entitiesUI: this.props.ui.entitiesUI, detail: detail, values: row, onDetailSubmit: this.onDetailSubmit }));
    }
    onDetailSubmit(detail, inValues, values) {
        let detailValues = this.values[detail.name];
        if (inValues === undefined)
            detailValues.push(values);
        else
            _.assign(inValues, values);
    }
    onNew(detail) {
        nav.push(React.createElement(DetailPage, { entitiesUI: this.props.ui.entitiesUI, detail: detail, values: undefined, onDetailSubmit: this.onDetailSubmit }));
    }
    buildMainRows() {
        let { ui, mainDetails } = this.props;
        let { main, details } = mainDetails;
        let formRows = main === undefined ? [] : _.clone(main);
        if (details === undefined)
            return;
        for (let d of details) {
            let header = React.createElement("div", { className: classNames('main-detail-header') },
                React.createElement("label", null, d.label || d.name),
                React.createElement(Button, { size: 'sm', color: 'success', onClick: () => this.onNew(d) }, " + "));
            formRows.push(React.createElement(List, { header: header, items: this.values[d.name], item: {
                    render: (item, index) => React.createElement(d.renderRow, { ui: ui, data: { item: item, detail: d } }),
                    onClick: row => this.onDetailEdit(d, row)
                } }));
        }
        return formRows;
    }
    render() {
        let { className, ui } = this.props;
        return React.createElement("div", null,
            React.createElement(TonvaForm, { className: className, formRows: this.formRows, 
                //context={ui.entitiesUI}
                onSubmit: this.onSubmit }));
    }
};
MainDetailsForm = __decorate([
    observer
], MainDetailsForm);
export { MainDetailsForm };
class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let { detail, values: initValues } = this.props;
            this.props.onDetailSubmit(detail, initValues, values);
            //setTimeout(() => {
            nav.back(false);
            //}, 0);
            return;
        });
    }
    render() {
        let { entitiesUI, detail, values } = this.props;
        return React.createElement(Page, { header: detail.label || detail.name },
            React.createElement(TonvaForm, { className: "mx-3 my-2", 
                //context={entitiesUI}
                formRows: detail.fields, onSubmit: this.onSubmit, initValues: values }));
    }
}
//# sourceMappingURL=mainDetailsForm.js.map