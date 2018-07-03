import * as React from 'react';
import * as _ from 'lodash';
import { observable, IObservableObject, IObservableArray } from 'mobx';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { ViewModel, JSONContent, RowContent } from '../viewModel';
import { Field, Arr } from '../field';
import { FormUI, BandUI, FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI, FieldUI } from './formUI';
import { buildControl, VmControl } from './control';
import { ArrBand, FieldBand, FieldsBand, SubmitBand } from './band';
import { VmApi } from '../vmApi';
import { VmTuidControl, PickerConfig } from './tuid';
import { VmArrList } from './vmArrList';

const defaultClassName = 'px-3 py-2';
const defaultSubmitCaption = <><FA name="send-o" /> &nbsp; 提交 &nbsp; </>;

export type TypeVmFieldsForm = typeof VmFieldsForm;
export interface FormValues {
    values: any;
    errors: any;
}
export interface ArrValues {
    formValues: FormValues,
    list: IObservableArray<any>,
};

export interface VmFormOptions {
    fields: Field[];
    arrs?: Arr[];
    //submitButton?:JSX.Element;
    onSubmit?: (values:any) => Promise<void>;
    ui?: FormUI;
    readOnly?: boolean;
    vmApi?: VmApi;                  // 主要用于tuid control的生成，也可以没有
    //buildControl?: (fieldUI: FieldUI, formValues:FormValues, vmApi:VmApi) => VmControl;
}

export class VmFieldsForm extends ViewModel {
    protected fields: Field[];
    protected arrs: Arr[];
    //protected submitButton: JSX.Element;
    protected onSubmit: (values:any) => Promise<void>;
    protected readOnly: boolean;
    protected vmApi: VmApi;

    constructor({fields, arrs, onSubmit, ui, readOnly, vmApi}:VmFormOptions) {
        super();
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

    ui: FormUI;
    formValues: FormValues;
    arrValues: {[name:string]: ArrValues};

    onSubmitButtonClick = async () => {
        let values:any = {};
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
            await this.onSubmit(values);
        }
        let json = JSON.stringify(values);
        alert('submit: \n' + json);
    }

    reset() {
        let vs = this.formValues.values;
        for (let f of this.fields) {
            let fn = f.name;
            vs[fn] = null;
        }
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) {
                let {name, fields} = arr;
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

    getValue(fieldName: string) { return this.formValues.values[fieldName] }
    setValue(fieldName: string, value: any) { this.formValues.values[fieldName] = value }

    // 如果要定制control，重载这个函数
    protected buildControl(fieldUI: FieldUI, formValues:FormValues):VmControl {
        let {type} = fieldUI;
        if (type !== 'tuid') return buildControl(fieldUI, formValues);

        let field = fieldUI.field;
        let tuidName = field.tuid;
        let tuid = this.vmApi.getTuid(tuidName);
        let pickerConfig: PickerConfig = {
            picker: undefined,          // TypeVmTuidPicker;
            row: undefined,             //RowContent, // TypeContent;
            idFromValue: undefined,     // TypeIdFromValue,
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
    private buildObservableArrs() {
        if (this.arrs === undefined) return;
        this.arrValues = {};
        for (let arr of this.arrs) {
            let {name, fields} = arr;
            this.arrValues[name] = {
                formValues: this.buildFormValues(fields),
                //errors: this.buildObservableValues(fields),
                list: observable([]),
            }
        }
    }

    private buildBands(ui: FormUI) {
        let cn:string, bs: BandUI[];
        if (ui !== undefined) {
            let {className, bands} = ui;
            cn = className;
            bs = bands;
        }
        this.ui = {
            className: cn || defaultClassName,
            bands: bs === undefined? this. buildOnFly() : this.buildFromBands(bs, this.formValues),
            visibleBands: observable([]),
        };
    }

    showBands(fieldNames:string[], submitCaption?:any) {
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

    private buildFromBands(bandUIs:BandUI[], formValues:FormValues): BandUI[] {
        let vBands:BandUI[] = [];
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
            let type = bandUI.type;
            if (type === 'submit') {
                vBands.push(this.buildSubmit((bandUI as SubmitBandUI).content || defaultSubmitCaption));
                continue;
            }
            let fieldUI = this.buildFieldBandUI(bandUI as FieldBandUI, this.fields, formValues);
            if (fieldUI !== undefined) vBands.push(fieldUI);
        }
        return vBands;
    }
    private buildSubmit(content:any): SubmitBandUI {
        return {
            key: '$sumit',
            type: 'submit',
            content: content,
            onSubmit: this.onSubmitButtonClick,
            band: SubmitBand,
        };
    }
    private buildFieldBandUI(fieldBandUI: FieldBandUI, fields:Field[], formValues:FormValues):FieldBandUI {
        let ret = _.clone(fieldBandUI);
        ret.band = FieldBand;
        ret.key = ret.name;
        this.buildFieldControl(ret, fields, formValues);
        return ret;
    }
    private buildFieldsBandUI(fieldsBandUI: FieldsBandUI, fields:Field[], formValues:FormValues):FieldsBandUI {
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
    private buildFieldControl(fieldUI: FieldUI, fields: Field[], formValues:FormValues) {
        let {name} = fieldUI;
        fieldUI.field = fields.find(v => v.name === name);
        fieldUI.control = this.buildControl(fieldUI, formValues);
    }
    private buildArrBandUI(arrBandUI: ArrBandUI):ArrBandUI {
        let ret = _.clone(arrBandUI);
        let {name, bands} = ret;
        ret.band = ArrBand;
        ret.key = name;
        if (this.arrs === undefined) return ret;
        let arr = this.arrs.find(v => v.name === name);
        if (arr === undefined) return ret;
        let {formValues} = this.arrValues[name];
        ret.bands = this.buildFromBands(bands, formValues);
        return ret;
    }

    private buildOnFly(): BandUI[] {
        let vBands:BandUI[] = [];
        this.buildFromFields(vBands, this.fields, this.formValues);
        this.buildArrsBands(vBands);
        let submitBand = this.buildSubmit(defaultSubmitCaption);
        vBands.push(submitBand);
        return vBands;
    }
    private buildFromFields(vBands: BandUI[], fields:Field[], formValues:FormValues) {
        for (let field of fields) {
            let {name} = field;
            let type = this.typeFromField(field);
            let band:FieldBandUI = {
                label: name,
                name: name,
                key: name,
                type: type as any,
                field: field,
                band: FieldBand,
            };
            band.control = this.buildControl(band, formValues);
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
        let fieldsBandUIs:BandUI[] = [];
        let arrValue = this.arrValues[name];
        let {formValues} = arrValue;
        this.buildFromFields(fieldsBandUIs, fields, formValues);
        let arrBandUI: ArrBandUI = {
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

    private buildArrsBands(vBands:BandUI[]) {
        if (this.arrs === undefined) return;
        for (let arr of this.arrs) this.buildArrBand(vBands, arr);
    }

    private buildArrList(arr:Arr, arrValues: ArrValues, arrBandUI:ArrBandUI): ViewModel {
        return new VmArrList(arr, arrValues, arrBandUI);
    }

    protected view = Form;
}

const Form = observer(({vm}:{vm:VmFieldsForm}) => {
    let {ui} = vm;
    let {className, bands, visibleBands} = ui;
    let vBands = bands;
    if (visibleBands !== undefined && visibleBands.length > 0) vBands = visibleBands;
    return <form className={className}>
        {vBands.map(v => {
            let {band:Band, key} = v;
            return <Band key={key} {...v} />
        })}
    </form>;
});
