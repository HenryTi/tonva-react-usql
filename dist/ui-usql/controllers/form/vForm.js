var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as _ from 'lodash';
import { observer } from "mobx-react";
import { BandsBuilder } from './bandsBuilder';
import { computed, observable } from 'mobx';
export class VForm {
    constructor(options, onSubmit) {
        this.vmFields = {};
        this.vmArrs = {};
        this.onFormSubmit = (event) => {
            event.preventDefault();
            return false;
        };
        this.view = observer(({ className }) => {
            return React.createElement("form", { className: className, onSubmit: this.onFormSubmit }, this.bands.map(v => v.render()));
        });
        this.fields = options.fields;
        this.arrs = options.arrs;
        this.ui = options.ui;
        if (this.ui !== undefined)
            this.compute = this.ui.compute;
        this.res = options.res;
        this.inputs = options.inputs;
        this.submitCaption = options.submitCaption;
        this.arrNewCaption = options.arrNewCaption;
        this.arrEditCaption = options.arrEditCaption;
        this.readOnly = onSubmit === undefined;
        this.formValues = this.buildFormValues();
        this.buildBands(options, onSubmit);
        this.onSubmit = onSubmit;
    }
    buildBands(options, onSubmit) {
        let bandsBuilder = new BandsBuilder(this, options, onSubmit);
        this.bands = bandsBuilder.build();
        for (let band of this.bands) {
            let vmFields = band.getVmFields();
            if (vmFields !== undefined)
                for (let f of vmFields)
                    this.vmFields[f.name] = f;
            let vmArr = band.getVmArr();
            if (vmArr !== undefined)
                this.vmArrs[vmArr.name] = vmArr;
            let vmSubmit = band.getVmSubmit();
            if (vmSubmit !== undefined)
                this.vmSubmit = vmSubmit;
        }
    }
    get values() {
        let values = {};
        _.merge(values, this.formValues.values);
        for (let i in this.vmArrs) {
            values[i] = this.vmArrs[i].list;
        }
        return values;
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
        for (let i in this.vmArrs) {
            let list = initValues[i];
            if (list === undefined)
                continue;
            //this.vmArrs[i].list.push(...list);
            let arrList = values[i];
            arrList.clear();
            arrList.push(...list);
        }
    }
    get isOk() {
        for (let i in this.vmFields) {
            if (this.vmFields[i].isOk === false)
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
        for (let i in this.vmFields) {
            let ctrl = this.vmFields[i];
            let cn = ctrl.name;
            if (cn === undefined)
                continue;
            //if (this.compute !== undefined && this.compute[cn] !== undefined) continue;
            ctrl.setValue(null);
        }
        for (let i in this.vmArrs) {
            let vmArr = this.vmArrs[i];
            vmArr.reset();
        }
    }
    getValue(fieldName) { return this.formValues.values[fieldName]; }
    setValue(fieldName, value) { this.formValues.values[fieldName] = value; }
    setError(fieldName, error) { this.formValues.errors[fieldName] = error; }
    /*
    // 如果要定制control，重载这个函数
    protected buildControl(field: Field, fieldUI: FieldUI, formValues:FormValues):VmControl {
        return buildControl(field, fieldUI, formValues, this.readOnly);
    }
    */
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
    render(className = "p-3") {
        return React.createElement(this.view, { className: className });
    }
}
__decorate([
    computed
], VForm.prototype, "isOk", null);
//# sourceMappingURL=vForm.js.map