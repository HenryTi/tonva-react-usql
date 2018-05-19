var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import { TonvaForm, List } from 'tonva-react-form';
let MainDetailsView = class MainDetailsView extends React.Component {
    constructor(props) {
        super(props);
    }
    detailRow(item, index) {
        return;
    }
    buildMainRows() {
        let { ui, mainDetails } = this.props;
        let { main, details } = mainDetails;
        let formRows = main === undefined ? [] : _.clone(main);
        if (details === undefined)
            return;
        let values = this.props.values;
        if (values === undefined)
            return;
        for (let d of details) {
            let header = React.createElement("div", { className: classNames('main-detail-header') },
                React.createElement("label", null, d.label || d.name));
            formRows.push(React.createElement(List, { header: header, items: values[d.name], item: { render: (item, index) => {
                        return React.createElement(d.renderRow, { ui: ui, data: { item: item, detail: d } });
                    } } }));
        }
        return formRows;
    }
    onSubmit(values) {
        return;
    }
    render() {
        let formRows;
        let { values, mainDetails, ui } = this.props;
        let { main, details } = this.props.mainDetails;
        let v = _.merge({}, values);
        for (let arr of details) {
            let name = arr.name;
            let vArr = v[name];
            if (vArr === undefined)
                v[name] = [];
        }
        formRows = this.buildMainRows();
        if (formRows === undefined)
            return React.createElement("div", null, "...");
        return React.createElement("div", null,
            React.createElement(TonvaForm, { formRows: formRows, initValues: values, 
                //context={ui.entitiesUI}
                onSubmit: this.onSubmit, readOnly: true }));
    }
};
MainDetailsView = __decorate([
    observer
], MainDetailsView);
export { MainDetailsView };
//# sourceMappingURL=mainDetailsView.js.map