import * as React from 'react';
import * as _ from 'lodash';
import { observable, IObservableObject, IObservableArray } from 'mobx';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { ViewModel, JSONContent, RowContent } from '../viewModel';
import { Field, Arr } from '../field';
import { FormUI, BandUI, FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI, FieldUI } from './formUI';
import { FormUIX, BandUIX, FieldBandUIX, FieldsBandUIX, ArrBandUIX, SubmitBandUIX, FieldUIX } from './formUIX';
import { buildControl, VmControl } from './control';
import { ArrBand, FieldBand, FieldsBand, SubmitBand } from './band';
import { VmApi } from '../vmApi';
import { VmTuidControl, PickerConfig } from './vmTuidControl';
import { VmArr } from './vmArr';

const defaultClassName = 'px-3 py-2';
const defaultSubmitCaption = <><FA name="send-o" /> &nbsp; 提交 &nbsp; </>;

export interface FormValues {
    values: any;
    errors: any;
}

export interface VmFormOptions {
    fields: Field[];
    arrs?: Arr[];
    //onSubmit?: (values:any) => Promise<void>;
    ui?: FormUI;
    readOnly?: boolean;
    vmApi?: VmApi;                  // 主要用于tuid control的生成，也可以没有
}

export class VmForm extends ViewModel {
    protected fields: Field[];
    protected arrs: Arr[];
    protected onFieldsInputed: (values:any) => Promise<void>;
    protected vmApi: VmApi;

    init({fields, arrs, ui, readOnly, vmApi}:VmFormOptions) {
        this.fields = fields;
        this.arrs = arrs;
        this.readOnly = readOnly === true;
        this.vmApi = vmApi;
        this.formValues = this.buildFormValues(this.fields);
        this.buildBands(ui);
    }

    onSubmit: (values:any) => Promise<void>;
    readOnly: boolean;
    controls: {[name:string]:VmControl} = {};
    ui: FormUIX;
    formValues: FormValues;
    vmArrs: {[name:string]: VmArr} = {};
    defaultSubmitCaption: any;
    submitCaption: any;

    getValues() {
        let values:any = {};
        _.merge(values, this.formValues.values);
        for (let i in this.vmArrs) {
            values[i] = this.vmArrs[i].list;
        }
        return values;
    }

    setValues(initValues:any) {
        let {values, errors} = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            values[fn] = initValues[fn];
            errors[fn] = undefined;
        }
        // 还要设置arrs的values
        for (let i in this.vmArrs) {
            this.vmArrs[i].list.push(...initValues[i]);
        }
    }

    onSubmitButtonClick = async () => {
        let values = this.getValues();
        if (this.onFieldsInputed !== undefined) {
            await this.onFieldsInputed(values);
            return;
        }
        if (this.onSubmit !== undefined) {
            await this.onSubmit(values);
            return;
        }
        let json = JSON.stringify(values);
        alert('submit: \n' + json);
    }
    onFormSubmit = (event:React.FormEvent<any>) => {
        event.preventDefault();
        return false;
    }

    reset() {
        let {values, errors} = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            values[fn] = null;
            errors[fn] = undefined;
        }
        for (let i in this.vmArrs) {
            let vmArr = this.vmArrs[i];
            vmArr.reset();
        }
    }

    getValue(fieldName: string) { return this.formValues.values[fieldName] }
    setValue(fieldName: string, value: any) { this.formValues.values[fieldName] = value }

    // 如果要定制control，重载这个函数
    protected buildControl(fieldUI: FieldUIX, formValues:FormValues):VmControl {
        let {type} = fieldUI;
        if (type !== 'tuid') return buildControl(fieldUI, formValues);

        let field = fieldUI.field;
        let tuidName = field.tuid;
        let tuid = this.vmApi.getTuid(tuidName);
        let pickerConfig: PickerConfig = {
            picker: undefined,          // TypeVmTuidPicker;
            row: undefined,             // RowContent
        };
        return new VmTuidControl(fieldUI, formValues, this.vmApi, tuid, JSONContent, pickerConfig)
    }

    private buildObservableValues(fields: Field[]):IObservableObject {
        let v: {[p:string]: any} = {};
        for (let f of fields) v[f.name] = null;
        return observable(v);
    }
    private buildFormValues(fields: Field[]):FormValues {
        return {
            values: this.buildObservableValues(fields),
            errors: this.buildObservableValues(fields),
        }
    }

    private buildBands(ui: FormUI) {
        let cn:string, bs: BandUIX[];
        if (ui !== undefined) {
            let {className, bands} = ui;
            cn = className;
            bs = bands;
        }
        this.ui = {
            className: cn || defaultClassName,
            bands: bs === undefined? 
                this.buildOnFly() : 
                this.buildFromBands(bs, this.formValues, this.fields),
            visibleBands: observable([]),
        };
    }

    showBands(fieldNames:string[], submitCaption?:any, onSubmit?:(values:any)=>Promise<void>) {
        if (submitCaption === undefined)
            this.submitCaption = this.defaultSubmitCaption;
        else
            this.submitCaption = this.buildSumitConent(submitCaption);
        this.onFieldsInputed = onSubmit;
        let {bands, visibleBands} = this.ui;
        visibleBands.splice(0, visibleBands.length);
        if (fieldNames === undefined) {
            visibleBands.push(...bands);
            return;
        }
        for (let b of bands) {
            switch (b.type) {
                case 'fields':
                    for (let f of (b as FieldsBandUI).fieldUIs) {
                        if (fieldNames.find(v => v === f.name) !== undefined) {
                            visibleBands.push(b);
                            break;
                        }
                    }
                    break;
                case 'arr':
                default: 
                    if (fieldNames.find(v => v === (b as any).name) !== undefined) {
                        visibleBands.push(b);
                    }
                    break;
                case 'submit':
                    if (submitCaption !== undefined) visibleBands.push(b);
                    break;
            }
        }
    }

    private buildFromBands(bandUIs:BandUI[], formValues:FormValues, fields:Field[]): BandUIX[] {
        let vBands:BandUIX[] = [];
        for (let bandUI of bandUIs) {
            let fieldUIs = (bandUI as FieldsBandUI).fieldUIs;
            if (fieldUIs !== undefined) {
                vBands.push(this.buildFieldsBandUI(bandUI as FieldsBandUI, this.fields, formValues));
                continue;
            }
            let arrBands = (bandUI as ArrBandUI).bands;
            if (arrBands !== undefined) {
                vBands.push(this.buildArrBandUI(bandUI as ArrBandUI));
                continue;
            }
            let type = (bandUI as SubmitBandUI).type;
            if (type === 'submit') {
                vBands.push(this.buildSubmit((bandUI as SubmitBandUI).content || defaultSubmitCaption));
                continue;
            }
            let fieldUI = this.buildFieldBandUI(bandUI as FieldBandUI, fields, formValues);
            if (fieldUI !== undefined) vBands.push(fieldUI);
        }
        return vBands;
    }
    private static buttonContentRegex = /\{\S+\}/gm;
    private buildSumitConent(content:any):any {
        if (typeof content !== 'string') return content;
        let children = [];
        let regex = VmForm.buttonContentRegex;
        let index = 0;
        for (;;) {
            let ret = regex.exec(content as string);
            if (ret === null) {
                children.push(content.substr(index));
                break;
            }
            children.push(content.substring(index, ret.index));
            let str = ret[0];
            children.push(<FA key={index} name={str.substr(1, str.length-2).trim()} />);
            index = ret.index + str.length;
        }
        return React.createElement(React.Fragment, undefined, children);
    }
    private buildSubmit(content:any): SubmitBandUIX {
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
    private buildFieldBandUI(fieldBandUI: FieldBandUI, fields:Field[], formValues:FormValues):FieldBandUIX {
        let ret:FieldBandUIX = _.clone(fieldBandUI);
        let name = ret.name;
        ret.band = FieldBand;
        ret.key = name;
        ret.form = this;
        if (ret.label === undefined) ret.label = name;
        this.buildFieldControl(ret, fields, formValues);
        return ret;
    }
    private buildFieldsBandUI(fieldsBandUI: FieldsBandUI, fields:Field[], formValues:FormValues):FieldsBandUIX {
        let ret:FieldsBandUIX = _.clone(fieldsBandUI);
        let name = ret.fieldUIs[0].name;
        ret.band = FieldsBand;
        ret.key = name;
        ret.form = this;
        if (ret.label === undefined) ret.label = name;
        let fieldUIs = ret.fieldUIs;
        fieldUIs = ret.fieldUIs = fieldUIs.map(v => _.clone(v));
        for (let f of fieldUIs) {
            this.buildFieldControl(f, fields, formValues);
        }
        return ret;
    }
    private buildFieldControl(fieldUI: FieldUIX, fields: Field[], formValues:FormValues) {
        let {name, type} = fieldUI;
        let field = fieldUI.field = fields.find(v => v.name === name);
        if (field === undefined) {
            console.log('%s is not exists in schema', name);
            return;
        }
        let tuid = field.tuid;
        if (tuid !== undefined) fieldUI.type = 'tuid';
        else if (type === undefined) fieldUI.type = this.typeFromField(field);
        this.controls[name] = fieldUI.control = this.buildControl(fieldUI, formValues);
    }
    private buildArrBandUI(arrBandUI: ArrBandUI):ArrBandUIX {
        let ret:ArrBandUIX = _.clone(arrBandUI);
        let {name} = ret;
        ret.band = ArrBand;
        ret.key = name;
        ret.form = this;
        if (ret.label === undefined) ret.label = name;
        if (this.arrs === undefined) return ret;
        let arr = this.arrs.find(v => v.name === name);
        if (arr === undefined) return ret;
        ret.vmList = this.buildArrList(arr, ret);
        return ret;
    }

    private buildOnFly(): BandUIX[] {
        let vBands:BandUI[] = [];
        this.buildFromFields(undefined, vBands, this.fields, this.formValues);
        this.buildArrsBands(vBands);
        let submitBand = this.buildSubmit(defaultSubmitCaption);
        vBands.push(submitBand);
        return vBands;
    }
    private buildFromFields(arrName:string, vBands: BandUI[], fields:Field[], formValues:FormValues) {
        for (let field of fields) {
            let {name} = field;
            let type = this.typeFromField(field);
            let band:FieldBandUIX = {
                label: name,
                name: name,
                key: name,
                type: type as any,
                field: field,
                band: FieldBand,
                form: this,
            };
            let c = band.control = this.buildControl(band, formValues);
            if (arrName === undefined) this.controls[name] = c;
            vBands.push(band);
        }
    }
    private typeFromField(field:Field) {
        switch (field.type) {
            case 'tinyint':
            case 'smallint':
            case 'int':
                return 'int';
            case 'bigint':
                let tuid = field.tuid;
                if (tuid !== undefined) return 'tuid';
                return 'int';
            case 'dec':
                return 'dec';
            case 'char':
            case 'text':
                return 'string';
        }
    }
    private buildArrBand(vBands:BandUI[], arr: Arr) {
        let {name, fields} = arr;
        let arrBandUI: ArrBandUIX = {
            type: 'arr',
            key: name,
            label: name,
            row: RowContent,
            bands: undefined, //fieldsBandUIs,
            band: ArrBand,
            form: this,
        };
        let vmList = this.buildArrList(arr, arrBandUI);
        arrBandUI.vmList = vmList;
        vBands.push(arrBandUI);
    }

    private buildArrsBands(vBands:BandUI[]) {
        if (this.arrs === undefined) return;
        for (let arr of this.arrs) this.buildArrBand(vBands, arr);
    }

    private buildArrList(arr:Arr, arrBandUI:ArrBandUIX): VmArr {
        let ret = new VmArr(this.vmApi, arr, arrBandUI);
        this.vmArrs[arr.name] = ret;
        return ret;
    }

    protected view = Form;
}

const Form = observer(({vm}:{vm:VmForm}) => {
    let {ui, onFormSubmit} = vm;
    let {className, bands, visibleBands} = ui;
    let vBands = bands;
    if (visibleBands !== undefined && visibleBands.length > 0) vBands = visibleBands;
    return <form className={className} onSubmit={onFormSubmit}>
        {vBands.map(v => {
            let {band:Band, key} = v;
            return <Band key={key} {...v} />
        })}
    </form>;
});
