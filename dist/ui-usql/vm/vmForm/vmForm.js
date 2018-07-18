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
import * as _ from 'lodash';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { ViewModel, JSONContent, RowContent } from '../viewModel';
import { buildControl } from './control';
import { ArrBand, FieldBand, FieldsBand, SubmitBand } from './band';
import { VmTuidControl } from './vmTuidControl';
import { VmArr } from './vmArr';
const defaultClassName = 'px-3 py-2';
const defaultSubmitCaption = React.createElement(React.Fragment, null,
    React.createElement(FA, { name: "send-o" }),
    " \u00A0 \u63D0\u4EA4 \u00A0 ");
export class VmForm extends ViewModel {
    constructor() {
        super(...arguments);
        this.controls = {};
        this.vmArrs = {};
        this.onSubmitButtonClick = () => __awaiter(this, void 0, void 0, function* () {
            let values = this.values;
            if (this.onFieldsInputed !== undefined) {
                yield this.onFieldsInputed(values);
                return;
            }
            if (this.onSubmit !== undefined) {
                yield this.onSubmit(values);
                return;
            }
            let json = JSON.stringify(values);
            alert('submit: \n' + json);
        });
        this.onFormSubmit = (event) => {
            event.preventDefault();
            return false;
        };
        this.view = Form;
    }
    init({ fields, arrs, ui, readOnly, vmApi }) {
        this.fields = fields;
        this.arrs = arrs;
        this.readOnly = readOnly === true;
        this.vmApi = vmApi;
        this.formValues = this.buildFormValues(this.fields);
        this.buildBands(ui);
    }
    get values() {
        let values = {};
        _.merge(values, this.formValues.values);
        for (let i in this.vmArrs) {
            values[i] = this.vmArrs[i].list;
        }
        return values;
    }
    set values(initValues) {
        let { values, errors } = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            values[fn] = initValues === undefined ? null : initValues[fn];
            errors[fn] = undefined;
        }
        // 还要设置arrs的values
        for (let i in this.vmArrs) {
            if (initValues === undefined)
                continue;
            let list = initValues[i];
            if (list === undefined)
                continue;
            this.vmArrs[i].list.push(...list);
        }
    }
    get isOk() {
        for (let i in this.controls) {
            if (this.controls[i].isOk === false)
                return false;
        }
        return true;
    }
    reset() {
        let { values, errors } = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            values[fn] = null;
            errors[fn] = undefined;
        }
        for (let i in this.controls) {
            let ctrl = this.controls[i];
            ctrl.value = null;
        }
        for (let i in this.vmArrs) {
            let vmArr = this.vmArrs[i];
            vmArr.reset();
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
    buildBands(ui) {
        let cn, bs;
        if (ui !== undefined) {
            let { className, bands } = ui;
            cn = className;
            bs = bands;
        }
        this.ui = {
            className: cn || defaultClassName,
            bands: bs === undefined ?
                this.buildOnFly() :
                this.buildFromBands(bs, this.formValues, this.fields),
            visibleBands: observable([]),
        };
    }
    showBands(fieldNames, submitCaption, onSubmit) {
        if (submitCaption === undefined)
            this.submitCaption = this.defaultSubmitCaption;
        else
            this.submitCaption = this.buildSumitConent(submitCaption);
        this.onFieldsInputed = onSubmit;
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
    buildFromBands(bandUIs, formValues, fields) {
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
            let fieldUI = this.buildFieldBandUI(bandUI, fields, formValues);
            if (fieldUI !== undefined)
                vBands.push(fieldUI);
        }
        return vBands;
    }
    buildSumitConent(content) {
        if (typeof content !== 'string')
            return content;
        let children = [];
        let regex = VmForm.buttonContentRegex;
        let index = 0;
        for (;;) {
            let ret = regex.exec(content);
            if (ret === null) {
                children.push(content.substr(index));
                break;
            }
            children.push(content.substring(index, ret.index));
            let str = ret[0];
            children.push(React.createElement(FA, { key: index, name: str.substr(1, str.length - 2).trim() }));
            index = ret.index + str.length;
        }
        return React.createElement(React.Fragment, undefined, children);
    }
    buildSubmit(content) {
        let c = this.buildSumitConent(content);
        this.defaultSubmitCaption = c;
        this.submitCaption = c;
        return {
            key: '$submit',
            type: 'submit',
            content: c,
            onSubmit: this.onSubmitButtonClick,
            band: SubmitBand,
            form: this,
        };
    }
    buildFieldBandUI(fieldBandUI, fields, formValues) {
        let ret = _.clone(fieldBandUI);
        let name = ret.name;
        ret.band = FieldBand;
        ret.key = name;
        ret.form = this;
        if (ret.label === undefined)
            ret.label = name;
        this.buildFieldControl(ret, fields, formValues);
        return ret;
    }
    buildFieldsBandUI(fieldsBandUI, fields, formValues) {
        let ret = _.clone(fieldsBandUI);
        let name = ret.fieldUIs[0].name;
        ret.band = FieldsBand;
        ret.key = name;
        ret.form = this;
        if (ret.label === undefined)
            ret.label = name;
        let fieldUIs = ret.fieldUIs;
        fieldUIs = ret.fieldUIs = fieldUIs.map(v => _.clone(v));
        for (let f of fieldUIs) {
            this.buildFieldControl(f, fields, formValues);
        }
        return ret;
    }
    buildFieldControl(fieldUI, fields, formValues) {
        let { name, type } = fieldUI;
        let field = fieldUI.field = fields.find(v => v.name === name);
        if (field === undefined) {
            console.log('%s is not exists in schema', name);
            return;
        }
        let tuid = field.tuid;
        if (tuid !== undefined)
            fieldUI.type = 'tuid';
        else if (type === undefined)
            fieldUI.type = this.typeFromField(field);
        this.controls[name] = fieldUI.control = this.buildControl(fieldUI, formValues);
    }
    buildArrBandUI(arrBandUI) {
        let ret = _.clone(arrBandUI);
        let { name } = ret;
        ret.band = ArrBand;
        ret.key = name;
        ret.form = this;
        if (ret.label === undefined)
            ret.label = name;
        if (this.arrs === undefined)
            return ret;
        let arr = this.arrs.find(v => v.name === name);
        if (arr === undefined)
            return ret;
        ret.vmArr = this.buildVmArr(arr, ret);
        return ret;
    }
    buildOnFly() {
        let vBands = [];
        this.buildFromFields(undefined, vBands, this.fields, this.formValues);
        this.buildArrsBands(vBands);
        let submitBand = this.buildSubmit(defaultSubmitCaption);
        vBands.push(submitBand);
        return vBands;
    }
    buildFromFields(arrName, vBands, fields, formValues) {
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
                form: this,
            };
            let c = band.control = this.buildControl(band, formValues);
            if (arrName === undefined)
                this.controls[name] = c;
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
        let arrBandUI = {
            type: 'arr',
            key: name,
            label: name,
            row: RowContent,
            bands: undefined,
            band: ArrBand,
            form: this,
        };
        let vmArr = this.buildVmArr(arr, arrBandUI);
        arrBandUI.vmArr = vmArr;
        vBands.push(arrBandUI);
    }
    buildArrsBands(vBands) {
        if (this.arrs === undefined)
            return;
        for (let arr of this.arrs)
            this.buildArrBand(vBands, arr);
    }
    buildVmArr(arr, arrBandUI) {
        let ret = new VmArr(this.vmApi, arr, arrBandUI);
        this.vmArrs[arr.name] = ret;
        return ret;
    }
}
VmForm.buttonContentRegex = /\{\S+\}/gm;
__decorate([
    computed
], VmForm.prototype, "isOk", null);
const Form = observer(({ vm }) => {
    let { ui, onFormSubmit } = vm;
    let { className, bands, visibleBands } = ui;
    let vBands = bands;
    if (visibleBands !== undefined && visibleBands.length > 0)
        vBands = visibleBands;
    return React.createElement("form", { className: className, onSubmit: onFormSubmit }, vBands.map(v => {
        let { band: Band, key } = v;
        return React.createElement(Band, Object.assign({ key: key }, v));
    }));
});
//# sourceMappingURL=vmForm.js.map