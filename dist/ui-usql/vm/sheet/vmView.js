import * as React from 'react';
import { List, Muted, EasyDate, FA } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
//import {Page} from 'tonva-tools';
//import {Sheet} from '../../entities';
//import {EntitiesUIProps, SheetUIProps, SheetViewProps, EntitiesUI, SheetUIO} from '../../ui';
//import {MainDetails, MainDetailsView} from '../tools';
export class VmView extends VmSheet {
    constructor(vmApi, sheet, ui, data, state, flows) {
        super(vmApi, sheet, ui);
        this.flowRow = (item, index) => {
            let { date, user, preState, state, action } = item;
            if (action === undefined)
                action = React.createElement(React.Fragment, null,
                    React.createElement(FA, { className: "text-primary", name: "pencil-square-o" }),
                    " \u5236\u5355");
            let to;
            switch (state) {
                case '$': break;
                case '#':
                    to = React.createElement(React.Fragment, null,
                        React.createElement(FA, { className: "text-success", name: "file-archive-o" }));
                    break;
                default:
                    to = React.createElement(React.Fragment, null,
                        React.createElement(FA, { className: "text-muted", name: "arrow-right" }),
                        " \u00A0 ",
                        state);
                    break;
            }
            return React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm" },
                    React.createElement("div", { className: "pl-3 py-2" }, action)),
                React.createElement("div", { className: "col-sm" },
                    React.createElement("div", { className: "p-2" }, to)),
                React.createElement("div", { className: "col-sm text-right" },
                    React.createElement("div", { className: "p-2" },
                        React.createElement(Muted, null,
                            React.createElement(EasyDate, { date: date })))));
        };
        this.view = View;
        this.data = data;
        this.state = state;
        this.flows = flows;
        this.vmForm = this.createVmFieldsForm();
        this.vmForm.setValues(data);
    }
    get fieldsFormOptions() {
        let ret = super.fieldsFormOptions;
        ret.readOnly = true;
        return ret;
    }
}
const View = ({ vm }) => {
    let { entity, state, data, vmForm, flows, flowRow } = vm;
    let removed;
    if (state === '-')
        removed = React.createElement("div", { className: "mx-3 my-2", style: { color: 'red' } }, "\u672C\u5355\u636E\u4F5C\u5E9F");
    return React.createElement("div", null,
        removed,
        vmForm.render(),
        React.createElement(List, { header: React.createElement(Muted, null, "\u6D41\u7A0B"), items: flows, item: { render: flowRow } }));
};
//{/*来不及写了，先用JSON方式显示吧。反正就是显示<br/>*/}
//{/*JSON.stringify(data)*/}
//# sourceMappingURL=vmView.js.map