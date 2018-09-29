var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observer } from "mobx-react";
import { BandsBuilder } from './bandsBuilder';
import { computed, observable } from 'mobx';
import { FA } from 'tonva-react-form';
export class VForm {
    constructor(options, onSubmit) {
        this.vFields = {};
        this.vArrs = {};
        this.onFormSubmit = (event) => {
            event.preventDefault();
            return false;
        };
        this.view = observer(({ className }) => {
            return React.createElement("form", { className: className, onSubmit: this.onFormSubmit }, this.bands.map(v => v.render()));
        });
        let { fields, arrs, ui, res, inputs, none, submitCaption, arrNewCaption, arrEditCaption, arrTitleNewButton, readonly } = options;
        this.fields = fields;
        this.arrs = arrs;
        this.ui = ui;
        if (this.ui !== undefined)
            this.compute = this.ui.compute;
        this.res = res;
        this.inputs = inputs;
        this.none = none;
        this.submitCaption = submitCaption;
        this.arrNewCaption = arrNewCaption;
        this.arrEditCaption = arrEditCaption;
        this.arrTitleNewButton = arrTitleNewButton || React.createElement("small", null,
            React.createElement(FA, { name: "plus" }),
            " \u65B0\u589E");
        this.readOnly = readonly === true || onSubmit === undefined;
        this.formValues = this.buildFormValues();
        this.buildBands(options, onSubmit);
        this.onSubmit = onSubmit;
    }
    buildBands(options, onSubmit) {
        this.bandColl = {};
        let bandsBuilder = new BandsBuilder(this, options, onSubmit);
        this.bands = bandsBuilder.build();
        for (let band of this.bands) {
            this.bandColl[band.key] = band;
            let vFields = band.getVFields();
            if (vFields !== undefined)
                for (let f of vFields)
                    this.vFields[f.name] = f;
            let vArr = band.getVArr();
            if (vArr !== undefined)
                this.vArrs[vArr.name] = vArr;
            let vSubmit = band.getVSubmit();
            if (vSubmit !== undefined)
                this.vSubmit = vSubmit;
        }
    }
    getBand(name) {
        return this.bandColl[name];
    }
    get values() {
        let ret = {};
        let { values } = this.formValues;
        for (let f of this.fields) {
            let { name } = f;
            let v = values[name];
            ret[name] = v !== null && typeof v === 'object' ? v.id : v;
        }
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) {
                let { name, fields, id, order } = arr;
                let list = ret[name] = [];
                let rows = this.vArrs[name].list;
                for (let row of rows) {
                    let item = {};
                    if (id !== undefined)
                        item[id] = row[id];
                    if (order !== undefined)
                        item[order] = row[order];
                    for (let f of fields) {
                        let { name: fn } = f;
                        let v = row[fn];
                        item[fn] = v !== null && typeof v === 'object' ? v.id : v;
                    }
                    list.push(item);
                }
            }
        }
        return ret;
    }
    get valueBoxs() {
        let ret = {};
        let { values } = this.formValues;
        for (let f of this.fields) {
            let { name, _tuid } = f;
            let v = values[name];
            ret[name] = _tuid === undefined || typeof v === 'object' ? v : _tuid.createID(v);
        }
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) {
                let { name, fields, id, order } = arr;
                let list = ret[name] = this.vArrs[name].list.slice();
                for (let row of list) {
                    for (let f of fields) {
                        let { name: fn, _tuid } = f;
                        let v = row[fn];
                        row[fn] = _tuid === undefined || typeof v === 'object' ? v : _tuid.createID(v);
                    }
                }
            }
        }
        return ret;
    }
    setValues(initValues) {
        if (initValues === undefined) {
            this.reset();
            return;
        }
        let { values, errors } = this.formValues;
        //let compute = this.ui && this.ui.compute;
        for (let f of this.fields) {
            let fn = f.name;
            //if (compute === undefined || compute[fn] === undefined) {
            errors[fn] = undefined;
            let v = initValues[fn];
            values[fn] = v;
            //}
        }
        // 还要设置arrs的values
        for (let i in this.vArrs) {
            let list = initValues[i];
            if (list === undefined)
                continue;
            let arrList = values[i];
            arrList.clear();
            arrList.push(...list);
        }
    }
    get isOk() {
        for (let i in this.vFields) {
            if (this.vFields[i].isOk === false)
                return false;
        }
        return true;
    }
    reset() {
        let { values, errors } = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            //if (this.compute !== undefined && this.compute[fn] !== undefined) continue;
            values[fn] = null;
            errors[fn] = undefined;
        }
        for (let i in this.vFields) {
            let ctrl = this.vFields[i];
            let cn = ctrl.name;
            if (cn === undefined)
                continue;
            //if (this.compute !== undefined && this.compute[cn] !== undefined) continue;
            ctrl.setValue(null);
        }
        for (let i in this.vArrs) {
            let vArr = this.vArrs[i];
            vArr.reset();
        }
    }
    getValue(fieldName) {
        return this.formValues.values[fieldName];
    }
    setValue(fieldName, value) { this.formValues.values[fieldName] = value; }
    setError(fieldName, error) { this.formValues.errors[fieldName] = error; }
    buildFieldValues(fields) {
        let v = {};
        for (let f of fields) {
            let fn = f.name;
            //if (this.compute === undefined || this.compute[fn] === undefined)
            {
                v[fn] = null;
            }
        }
        return v;
    }
    buildObservableValues() {
        let v = this.buildFieldValues(this.fields);
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) {
                v[arr.name] = observable.array([], { deep: true });
            }
        }
        let ret = observable(v);
        /*
        for (let f of this.fields) {
            let fn = f.name;
            if (this.compute === undefined) continue;
            let func = this.compute[fn];
            if (func === undefined) continue;
            Object.defineProperty(ret, fn, {
                enumerable: true,
                get: func,
            });
        }*/
        return ret;
    }
    buildFormValues() {
        return {
            values: this.buildObservableValues(),
            errors: observable(this.buildFieldValues(this.fields)),
        };
    }
    render(className = "py-3") {
        return React.createElement(this.view, { className: className });
    }
}
__decorate([
    computed
], VForm.prototype, "isOk", null);
//# sourceMappingURL=vForm.js.map