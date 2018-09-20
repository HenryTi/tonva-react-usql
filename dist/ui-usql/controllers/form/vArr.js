var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import * as _ from 'lodash';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, JSONContent } from '../viewModel';
import { VForm } from './vForm';
import { observer } from 'mobx-react';
export class VArr extends ViewModel {
    constructor(ownerForm, arr, onEditRow) {
        super();
        this.rowPage = () => {
            return React.createElement(Page, { header: this.label, back: "close" }, this.vForm.render('p-3'));
        };
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            let values = this.vForm.values;
            yield this.onRowChanged(values);
            //if (this.afterEditRow !== undefined) await this.afterEditRow(values);
        });
        this.onRowChanged = (rowValues) => __awaiter(this, void 0, void 0, function* () {
            if (this.rowValues === undefined) {
                this.list.push(rowValues);
                if (this.onEditRow === undefined)
                    this.vForm.reset();
                else
                    yield this.onEditRow(undefined, this.onRowChanged);
            }
            else {
                _.merge(this.rowValues, rowValues);
                if (this.onEditRow === undefined)
                    nav.pop();
            }
        });
        this.renderItem = (item, index) => {
            return React.createElement("div", { className: "px-3 py-2" },
                React.createElement(this.rowContent, Object.assign({}, item)));
        };
        this.showRow = (rowValues) => __awaiter(this, void 0, void 0, function* () {
            if (this.onEditRow !== undefined) {
                yield this.onEditRow(rowValues, this.onRowChanged);
                return;
            }
            this.vForm.reset();
            if (rowValues !== undefined)
                this.vForm.setValues(rowValues);
            nav.push(React.createElement(this.rowPage, null));
        });
        this.editRow = (rowValues) => __awaiter(this, void 0, void 0, function* () {
            this.rowValues = rowValues;
            let { vSubmit } = this.vForm;
            if (vSubmit !== undefined) {
                vSubmit.caption = this.editSubmitCaption;
                vSubmit.className = 'btn btn-outline-success';
            }
            yield this.showRow(rowValues);
        });
        this.addRow = () => __awaiter(this, void 0, void 0, function* () {
            this.rowValues = undefined;
            let { vSubmit } = this.vForm;
            vSubmit.caption = this.newSubmitCaption;
            vSubmit.className = 'btn btn-outline-success';
            yield this.showRow(undefined);
            this.vForm.reset();
        });
        this.view = observer(() => {
            let button;
            if (this.readOnly === false) {
                button = React.createElement("button", { onClick: this.addRow, type: "button", className: "btn btn-outline-info btn-sm" },
                    React.createElement(FA, { name: "plus" }));
            }
            let header = this.header || React.createElement("div", { className: "px-3 bg-light", style: { paddingTop: '1px', paddingBottom: '1px' } },
                React.createElement("div", { className: "flex-fill align-self-center" }, this.label),
                button);
            return React.createElement(List, { header: header, items: this.list, item: { render: this.renderItem, onClick: this.editRow } });
        });
        this.ownerForm = ownerForm;
        let { name, fields } = arr;
        this.name = name;
        let { ui, res, readOnly, inputs, formValues } = ownerForm;
        let arrsRes = res.arrs;
        let arrRes = arrsRes !== undefined ? arrsRes[name] : {};
        let { label, newSubmit, editSubmit } = arrRes;
        this.newSubmitCaption = newSubmit || ownerForm.arrNewCaption;
        this.editSubmitCaption = editSubmit || ownerForm.arrEditCaption;
        this.label = label || name;
        let arrUI = ui && ui.arrs && ui.arrs[name];
        this.rowContent = JSONContent;
        this.readOnly = readOnly;
        if (this.onEditRow === undefined) {
            this.vForm = new VForm({
                fields: fields,
                arrs: undefined,
                ui: arrUI,
                res: arrRes,
                inputs: inputs[name],
                submitCaption: 'submit',
                arrNewCaption: undefined,
                arrEditCaption: undefined,
            }, this.readOnly === true ? undefined : this.onSubmit);
        }
        else {
            this.onEditRow = onEditRow;
        }
        this.list = formValues.values[name];
    }
    reset() {
        this.vForm.reset();
        this.list.clear();
    }
}
//# sourceMappingURL=vArr.js.map