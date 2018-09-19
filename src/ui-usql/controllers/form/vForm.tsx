import * as React from 'react';
import * as _ from 'lodash';
import { observer } from "mobx-react";
import { VBand } from './vBand';
import { BandsBuilder } from './bandsBuilder';
import { Field, ArrFields } from '../../entities';
import { computed, observable, IObservableObject } from 'mobx';
import { VArr } from './vArr';
//import { VmControl, buildControl } from './control/control';
import { FieldUI, FormUI, FormUIBase, Compute } from '../formUI';
import { VField } from './vField';
import { VSubmit } from './vSubmit';
import { IObservableArray } from 'mobx';

export type FieldCall = (form:VForm, field:string, values:any) => Promise<any>;
export interface FieldInput {
    call: FieldCall;
    content: React.StatelessComponent<any>;
    nullCaption: string;
}
// [arr.field]: FieldCall;
export interface FieldInputs {
    [fieldOrArr:string]: FieldInput | {[field:string]: FieldInput};
}

export interface FormValues {
    values: any;
    errors: any;
}

export interface FormOptions {
    fields: Field[];
    arrs?: ArrFields[];
    ui: FormUIBase;
    res: any;
    inputs: FieldInputs;
    submitCaption: string;
    arrNewCaption: string;
    arrEditCaption: string;
}

export class VForm {
    protected fields: Field[];
    protected arrs: ArrFields[];
    protected bands: VBand[];
    constructor(options: FormOptions, onSubmit: (values:any)=>Promise<void>) {
        this.fields = options.fields;
        this.arrs = options.arrs;
        this.ui = options.ui;
        if (this.ui !== undefined) this.compute = this.ui.compute;
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

    onSubmit: (values:any)=>Promise<void>;
    ui: FormUI;
    res: any;
    formValues: FormValues;
    compute: Compute;
    readOnly: boolean;
    vmFields: {[name:string]:VField} = {};
    vmArrs: {[name:string]: VArr} = {};
    vmSubmit: VSubmit;
    inputs: FieldInputs;
    submitCaption: string;
    arrNewCaption: string;
    arrEditCaption: string;

    private buildBands(options: FormOptions, onSubmit: (values:any)=>Promise<void>) {
        let bandsBuilder = new BandsBuilder(this, options, onSubmit);
        this.bands = bandsBuilder.build();
        for (let band of this.bands) {
            let vmFields = band.getVmFields();
            if (vmFields !== undefined) for (let f of vmFields) this.vmFields[f.name] = f;
            let vmArr = band.getVmArr();
            if (vmArr !== undefined) this.vmArrs[vmArr.name] = vmArr;
            let vmSubmit = band.getVmSubmit();
            if (vmSubmit !== undefined) this.vmSubmit = vmSubmit;
        }
    }

    private onFormSubmit = (event:React.FormEvent<any>) => {
        event.preventDefault();
        return false;
    }

    protected view = observer(({className}:{className:string}) => {
        return <form className={className} onSubmit={this.onFormSubmit}>
            {this.bands.map(v => v.render())}
        </form>;
    });

    get values() {
        let values:any = {};
        _.merge(values, this.formValues.values);
        for (let i in this.vmArrs) {
            values[i] = this.vmArrs[i].list;
        }
        return values;
    }

    setValues(initValues:any) {
        if (initValues === undefined) {
            this.reset();
            return;
        }
        let {values, errors} = this.formValues;
        //let compute = this.ui && this.ui.compute;
        for (let f of this.fields) {
            let fn = f.name;
            //if (compute === undefined || compute[fn] === undefined) {
                errors[fn] = undefined;
                let v =  initValues[fn];
                values[fn] = v;
            //}
        }
        // 还要设置arrs的values
        for (let i in this.vmArrs) {
            let list = initValues[i];
            if (list === undefined) continue;
            //this.vmArrs[i].list.push(...list);
            let arrList = values[i] as IObservableArray<any>;
            arrList.clear();
            arrList.push(...list);
        }
    }

    @computed get isOk():boolean {
        for (let i in this.vmFields) {
            if (this.vmFields[i].isOk === false) return false;
        }
        return true;
    }
    reset() {
        let {values, errors} = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            //if (this.compute !== undefined && this.compute[fn] !== undefined) continue;
            values[fn] = null;
            errors[fn] = undefined;
        }
        for (let i in this.vmFields) {
            let ctrl = this.vmFields[i];
            let cn = ctrl.name;
            if (cn === undefined) continue;
            //if (this.compute !== undefined && this.compute[cn] !== undefined) continue;
            ctrl.setValue(null);
        }
        for (let i in this.vmArrs) {
            let vmArr = this.vmArrs[i];
            vmArr.reset();
        }
    }

    getValue(fieldName: string) { return this.formValues.values[fieldName] }
    setValue(fieldName: string, value: any) { this.formValues.values[fieldName] = value }

    setError(fieldName:string, error:string) {this.formValues.errors[fieldName] = error}

    /*
    // 如果要定制control，重载这个函数
    protected buildControl(field: Field, fieldUI: FieldUI, formValues:FormValues):VmControl {
        return buildControl(field, fieldUI, formValues, this.readOnly);
    }
    */

    private buildFieldValues(fields: Field[]):any {
        let v: {[p:string]: any} = {};
        for (let f of fields) {
            let fn = f.name;
            //if (this.compute === undefined || this.compute[fn] === undefined)
            {
                v[fn] = null;
            }
        }
        return v;
    }
    private buildObservableValues():IObservableObject {
        let v: {[p:string]: any} = this.buildFieldValues(this.fields);
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) {
                v[arr.name] = observable.array([], {deep:true});
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
    private buildFormValues():FormValues {
        return {
            values: this.buildObservableValues(),
            errors: observable(this.buildFieldValues(this.fields)),
        }
    }

    render(className:string = "p-3"):JSX.Element {
        return <this.view className={className} />
    }
}
