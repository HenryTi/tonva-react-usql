var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { List, Muted, EasyDate, FA } from 'tonva-react-form';
import { VmEntity } from '../VM';
export class VmView extends VmEntity {
    constructor(crSheet, data, state, flows) {
        super(crSheet);
        /*
        protected get fieldsFormOptions():VmFormOptions {
            let ret = super.fieldsFormOptions;
            ret.readOnly = true;
            return ret;
        }*/
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
        this.view = () => {
            let removed;
            if (this.state === '-')
                removed = React.createElement("div", { className: "mx-3 my-2", style: { color: 'red' } }, "\u672C\u5355\u636E\u4F5C\u5E9F");
            return React.createElement("div", null,
                removed,
                this.vmForm.render(),
                React.createElement(List, { header: React.createElement(Muted, null, "\u6D41\u7A0B"), items: this.flows, item: { render: this.flowRow } }));
        };
        this.data = data;
        this.state = state;
        this.flows = flows;
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    render() {
        this.vmForm = this.createForm(this.data);
        return React.createElement(this.view, null);
    }
}
//# sourceMappingURL=vmView.js.map