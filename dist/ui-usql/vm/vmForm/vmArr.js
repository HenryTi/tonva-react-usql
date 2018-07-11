var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observable } from 'mobx';
import * as _ from 'lodash';
import { List, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { RowContent } from '../viewModel';
import { VmForm } from './vmForm';
import { VmPage } from '../vmPage';
export class VmArr extends VmPage {
    constructor(vmApi, arr, arrBandUI) {
        super();
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            let values = this.vmForm.values;
            yield this.onRowChanged(values);
            if (this.afterEditRow !== undefined)
                yield this.afterEditRow(values);
        });
        this.afterEditRow = (values) => __awaiter(this, void 0, void 0, function* () {
            this.popPage();
            return;
        });
        this.addClick = () => this.start(undefined);
        this.onRowChanged = (rowValues) => __awaiter(this, void 0, void 0, function* () {
            if (this.rowValues === undefined) {
                let len = this.list.push(rowValues);
                this.rowValues = this.list[len - 1];
            }
            else {
                _.merge(this.rowValues, rowValues);
            }
            this.vmForm.values = this.rowValues;
        });
        this.renderItem = (item, index) => {
            return React.createElement(this.row, Object.assign({}, item));
        };
        this.view = ArrList;
        this.start = this.start.bind(this);
        this.vmApi = vmApi;
        this.arr = arr;
        this.arrBandUI = arrBandUI;
        let { label, row, form } = arrBandUI;
        this.readOnly = form.readOnly;
        this.label = label;
        this.row = row || RowContent;
        this.list = observable.array([], { deep: true });
        //let bands = this.arrBandUI.bands.slice();
        let submitBand = {
            type: 'submit',
            content: '{save} 完成',
        };
        //bands.push(submitBand);
        this.vmForm = new VmForm();
        this.vmForm.init({
            fields: arr.fields,
            vmApi: vmApi,
            ui: {
                bands: undefined,
                className: undefined,
            },
            readOnly: this.readOnly,
        });
        this.vmForm.onSubmit = this.onSubmit;
    }
    reset() {
        this.vmForm.reset();
        this.list.clear();
    }
    start(rowValues) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rowValues = rowValues;
            if (rowValues === undefined)
                this.vmForm.reset();
            else
                this.vmForm.values = rowValues;
            if (this.onEditRow !== undefined)
                yield this.onEditRow(rowValues, this.onRowChanged);
            else
                this.pushPage(React.createElement(RowPage, { vm: this }));
        });
    }
}
const ArrList = ({ vm }) => {
    let { label, list, renderItem, start, addClick, header, footer, readOnly } = vm;
    let button;
    if (readOnly === false) {
        button = React.createElement("button", { onClick: addClick, type: "button", className: "btn btn-primary btn-sm" },
            React.createElement(FA, { name: "plus" }));
    }
    header = header || React.createElement("div", { className: "" },
        React.createElement("div", { className: "flex-fill align-self-center" }, label),
        button);
    return React.createElement(List, { header: header, footer: footer, items: list, item: { render: renderItem, onClick: start } });
};
const RowPage = ({ vm }) => {
    let { label, vmForm } = vm;
    return React.createElement(Page, { header: label }, vmForm.render());
};
//# sourceMappingURL=vmArr.js.map