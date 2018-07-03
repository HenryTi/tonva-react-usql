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
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { ViewModel, JSONContent, RowContent } from '../viewModel';
import { buildControl } from './control';
import { ArrBand, FieldBand, FieldsBand, SubmitBand } from './band';
import { VmTuidControl } from './tuid';
import { VmArrList } from './vmArrList';
const defaultClassName = 'px-3 py-2';
const defaultSubmitCaption = React.createElement(React.Fragment, null,
    React.createElement(FA, { name: "send-o" }),
    " \u00A0 \u63D0\u4EA4 \u00A0 ");
;
export class VmFieldsForm extends ViewModel {
    constructor({ fields, arrs, onSubmit, ui, readOnly, vmApi }) {
        super();
        this.onSubmitButtonClick = () => __awaiter(this, void 0, void 0, function* () {
            let values = {};
            /*
            let vs = this.formValues.values;
            for (let f of this.fields) {
                let fn = f.name;
                values[fn] = vs[fn];
            }
            */
            _.merge(values, this.formValues.values);
            if (this.arrValues !== undefined) {
                for (let i in this.arrValues) {
                    values[i] = this.arrValues[i].list;
                }
            }
            if (this.onSubmit !== undefined) {
                yield this.onSubmit(values);
            }
            let json = JSON.stringify(values);
            alert('submit: \n' + json);
        });
        this.view = Form;
        this.fields = fields;
        this.arrs = arrs;
        this.onSubmit = onSubmit;
        this.readOnly = readOnly === true;
        this.vmApi = vmApi;
        //this.submitButton = submitButton;
        //this.submitButtonRow = new VmFormSubmitButtonRow(this, submitButton);
        //if (className !== undefined) this.className = className;
        //this.rowBuilder = rowBuilder || new FormRowBuilder;
        //this.rows = this.rowBuilder.buildRows(this, fields, fieldUIs);
        this.formValues = this.buildFormValues(this.fields);
        //this.errors = this.buildObservableValues(this.fields);
        this.buildObservableArrs();
        this.buildBands(ui);
    }
    reset() {
        let vs = this.formValues.values;
        for (let f of this.fields) {
            let fn = f.name;
            vs[fn] = null;
        }
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) {
                let { name, fields } = arr;
                let av = this.arrValues[name];
                av.list.clear();
                vs = av.formValues.values;
                for (let f of fields) {
                    let fn = f.name;
                    vs[fn] = null;
                }
            }
        }
    }
    getValue(fieldName) { return this.formValues.values[fieldName]; }
    setValue(fieldName, value) { this.formValues.values[fieldName] = value; }
    // 如果要定制control，重载这个函数
    buildControl(fieldUI, formValues) {
        let { type } = fieldUI;
        if (type !== 'tuid')
            return buildControl(fieldUI, formValues);
        let field = fieldUI.field;
        let tuidName = field.tuid;
        let tuid = this.vmApi.getTuid(tuidName);
        let pickerConfig = {
            picker: undefined,
            row: undefined,
            idFromValue: undefined,
        };
        return new VmTuidControl(fieldUI, formValues, this.vmApi, tuid, JSONContent, pickerConfig);
    }
    buildObservableValues(fields) {
        let v = {};
        for (let f of fields)
            v[f.name] = null;
        return observable(v);
    }
    buildFormValues(fields) {
        return {
            values: this.buildObservableValues(fields),
            errors: this.buildObservableValues(fields),
        };
    }
    buildObservableArrs() {
        if (this.arrs === undefined)
            return;
        this.arrValues = {};
        for (let arr of this.arrs) {
            let { name, fields } = arr;
            this.arrValues[name] = {
                formValues: this.buildFormValues(fields),
                //errors: this.buildObservableValues(fields),
                list: observable([]),
            };
        }
    }
    buildBands(ui) {
        let cn, bs;
        if (ui !== undefined) {
            let { className, bands } = ui;
            cn = className;
            bs = bands;
        }
        this.ui = {
            className: cn || defaultClassName,
            bands: bs === undefined ? this.buildOnFly() : this.buildFromBands(bs, this.formValues),
            visibleBands: observable([]),
        };
    }
    showBands(fieldNames, submitCaption) {
        let { bands, visibleBands } = this.ui;
        visibleBands.splice(0, visibleBands.length);
        if (fieldNames === undefined) {
            visibleBands.push(...bands);
            return;
        }
        for (let b of bands) {
            switch (b.type) {
                case 'fields':
                    for (let f of b.fieldUIs) {
                        if (fieldNames.find(v => v === f.name) !== undefined) {
                            visibleBands.push(b);
                            break;
                        }
                    }
                    break;
                case 'arr':
                default:
                    if (fieldNames.find(v => v === b.name) !== undefined) {
                        visibleBands.push(b);
                    }
                    break;
                case 'submit':
                    if (submitCaption !== undefined)
                        visibleBands.push(b);
                    break;
            }
        }
    }
    buildFromBands(bandUIs, formValues) {
        let vBands = [];
        for (let bandUI of bandUIs) {
            let fieldUIs = bandUI.fieldUIs;
            if (fieldUIs !== undefined) {
                vBands.push(this.buildFieldsBandUI(bandUI, this.fields, formValues));
                continue;
            }
            let arrBands = bandUI.bands;
            if (arrBands !== undefined) {
                vBands.push(this.buildArrBandUI(bandUI));
                continue;
            }
            let type = bandUI.type;
            if (type === 'submit') {
                vBands.push(this.buildSubmit(bandUI.content || defaultSubmitCaption));
                continue;
            }
            let fieldUI = this.buildFieldBandUI(bandUI, this.fields, formValues);
            if (fieldUI !== undefined)
                vBands.push(fieldUI);
        }
        return vBands;
    }
    buildSubmit(content) {
        return {
            key: '$sumit',
            type: 'submit',
            content: content,
            onSubmit: this.onSubmitButtonClick,
            band: SubmitBand,
        };
    }
    buildFieldBandUI(fieldBandUI, fields, formValues) {
        let ret = _.clone(fieldBandUI);
        ret.band = FieldBand;
        ret.key = ret.name;
        this.buildFieldControl(ret, fields, formValues);
        return ret;
    }
    buildFieldsBandUI(fieldsBandUI, fields, formValues) {
        let ret = _.clone(fieldsBandUI);
        ret.band = FieldsBand;
        ret.key = ret.fieldUIs[0].name;
        let fieldUIs = ret.fieldUIs;
        fieldUIs = ret.fieldUIs = fieldUIs.map(v => _.clone(v));
        for (let f of fieldUIs) {
            this.buildFieldControl(f, fields, formValues);
        }
        return ret;
    }
    buildFieldControl(fieldUI, fields, formValues) {
        let { name } = fieldUI;
        fieldUI.field = fields.find(v => v.name === name);
        fieldUI.control = this.buildControl(fieldUI, formValues);
    }
    buildArrBandUI(arrBandUI) {
        let ret = _.clone(arrBandUI);
        let { name, bands } = ret;
        ret.band = ArrBand;
        ret.key = name;
        if (this.arrs === undefined)
            return ret;
        let arr = this.arrs.find(v => v.name === name);
        if (arr === undefined)
            return ret;
        let { formValues } = this.arrValues[name];
        ret.bands = this.buildFromBands(bands, formValues);
        return ret;
    }
    buildOnFly() {
        let vBands = [];
        this.buildFromFields(vBands, this.fields, this.formValues);
        this.buildArrsBands(vBands);
        let submitBand = this.buildSubmit(defaultSubmitCaption);
        vBands.push(submitBand);
        return vBands;
    }
    buildFromFields(vBands, fields, formValues) {
        for (let field of fields) {
            let { name } = field;
            let type = this.typeFromField(field);
            let band = {
                label: name,
                name: name,
                key: name,
                type: type,
                field: field,
                band: FieldBand,
            };
            band.control = this.buildControl(band, formValues);
            vBands.push(band);
        }
    }
    typeFromField(field) {
        switch (field.type) {
            case 'tinyint':
            case 'smallint':
            case 'int':
                return 'int';
            case 'bigint':
                let tuid = field.tuid;
                if (tuid !== undefined)
                    return 'tuid';
                return 'int';
            case 'dec':
                return 'dec';
            case 'char':
            case 'text':
                return 'string';
        }
    }
    buildArrBand(vBands, arr) {
        let { name, fields } = arr;
        let fieldsBandUIs = [];
        let arrValue = this.arrValues[name];
        let { formValues } = arrValue;
        this.buildFromFields(fieldsBandUIs, fields, formValues);
        let arrBandUI = {
            type: 'arr',
            key: name,
            label: name,
            row: RowContent,
            bands: fieldsBandUIs,
            band: ArrBand,
        };
        let vmList = this.buildArrList(arr, arrValue, arrBandUI);
        arrBandUI.vmList = vmList;
        vBands.push(arrBandUI);
    }
    buildArrsBands(vBands) {
        if (this.arrs === undefined)
            return;
        for (let arr of this.arrs)
            this.buildArrBand(vBands, arr);
    }
    buildArrList(arr, arrValues, arrBandUI) {
        return new VmArrList(arr, arrValues, arrBandUI);
    }
}
const Form = observer(({ vm }) => {
    let { ui } = vm;
    let { className, bands, visibleBands } = ui;
    let vBands = bands;
    if (visibleBands !== undefined && visibleBands.length > 0)
        vBands = visibleBands;
    return React.createElement("form", { className: className }, vBands.map(v => {
        let { band: Band, key } = v;
        return React.createElement(Band, Object.assign({ key: key }, v));
    }));
});
//# sourceMappingURL=vmFieldsForm.js.map