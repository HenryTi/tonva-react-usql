import { VBand, VFieldBand, VArrBand, VFieldsBand, VSubmitBand } from "./vBand";
import { Field, ArrFields } from "../../entities";
import { VForm, FieldInputs, FormOptions, FormValues } from "./vForm";
import { FormUI, BandUI, FieldBandUI, ArrBandUI, FieldsBandUI, SubmitBandUI, FieldUI, Compute } from "../formUI";
import { VSubmit } from "./vSubmit";
import { VField, buildVField, VComputeField } from "./vField";
import { JSONContent } from "..";
import { VArr } from "./vArr";
import { VTuidField } from "./vField/vTuidField";

export class BandsBuilder {
    private vForm: VForm;
    private onSubmit: (values:any)=>Promise<void>;
    private fields: Field[];
    private arrs: ArrFields[];
    //private ui: FormUI;
    private bandUIs: BandUI[];
    private compute: Compute;
    private res: any;
    private formValues: FormValues;
    private readOnly: boolean;
    constructor(vForm:VForm, options: FormOptions, onSubmit: (values:any)=>Promise<void>) {
        this.vForm = vForm;
        this.onSubmit = onSubmit;
        let {fields, arrs, ui, res} = options;
        this.fields = fields;
        this.arrs = arrs;
        if (ui !== undefined) {
            let {bandUIs, compute} = ui;
            this.bandUIs = bandUIs;
            this.compute = compute;
        }
        this.res = res;
        this.formValues = vForm.formValues;
        this.readOnly = vForm.readOnly;
    }

    build():VBand[] {
        return this.bandUIs === undefined? this.bandsOnFly() : this.bandsFromUI();
    }

    private labelFromName(name:string, res:any):string {
        if (res === undefined) return;
        let {fields} = res;
        if (fields === undefined) return;
        return fields[name] || name;
    }

    private bandsOnFly():VBand[] {
        let bands:VBand[] = [];
        this.bandsFromFields(bands, this.fields, this.res);
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) bands.push(this.bandFromArr(arr));
        }
        if (this.onSubmit !== undefined) {
            bands.push(new VSubmitBand(new VSubmit(this.vForm)));
        }
        return bands;
    }

    private bandsFromFields(bands:VBand[], fields:Field[], res:any) {
        if (fields === undefined) return;
        for (let field of fields) bands.push(this.bandFromField(field, res));
    }

    private bandsFromUI():VBand[] {
        let bands:VBand[] = [];
        for (let bandUI of this.bandUIs)  {
            let band = this.bandFromUI(bandUI);
            bands.push(band);
        }
        return bands;
    }

    private bandFromUI(bandUI:BandUI):VBand {
        let {band} = bandUI;
        switch (band) {
            default: return this.bandFromFieldUI(bandUI as FieldBandUI);
            case 'arr': return this.bandFromArrUI(bandUI as ArrBandUI);
            case 'fields': return this.bandFromFieldsUI(bandUI as FieldsBandUI);
            case 'submit': return this.bandFromSubmitUI(bandUI as SubmitBandUI);
        }
    }

    private bandFromFieldUI(bandUI: FieldBandUI): VFieldBand {
        let {label} = bandUI;
        let vField = this.vFieldFromUI(bandUI);
        return new VFieldBand(label, vField);
    }
    private bandFromArrUI(bandUI: ArrBandUI): VArrBand {
        let {label, name} = bandUI;
        let vArr = this.vArrFromUI(bandUI);
        return new VArrBand(label, vArr);
    }
    private bandFromFieldsUI(bandUI: FieldsBandUI): VFieldsBand {
        let {label, fieldUIs} = bandUI;
        let vFields = fieldUIs.map(v => this.vFieldFromUI(v));
        return new VFieldsBand(label, vFields);
    }
    private bandFromSubmitUI(bandUI: SubmitBandUI): VSubmitBand {
        if (this.onSubmit === undefined) return;
        let vSubmit = new VSubmit(this.vForm);
        return new VSubmitBand(vSubmit);
    }

    private vFieldFromField(field:Field): VField {
        let fieldUI:FieldUI = undefined;
        if (this.compute !== undefined) {
            let fieldCompute = this.compute[field.name];
            if (fieldCompute !== undefined) {
                return new VComputeField(field, fieldUI, this.formValues);
            }
        }
        let ret = buildVField(field, fieldUI, this.formValues, this.compute, this.readOnly);
        if (ret !== undefined) return ret;
        return new VTuidField(field, fieldUI, this.vForm);
    }
    private bandFromField(field:Field, res:any):VBand {
        let {name} = field;
        let vField = this.vFieldFromField(field);
        return new VFieldBand(this.labelFromName(name, res) || name, vField);
    }

    private bandFromArr(arr: ArrFields):VBand {
        let {name, fields} = arr;
        //let row = JSONContent;
        //let bands:VBand[] = [];
        //this.bandsFromFields(bands, fields, res);
        let vArr = new VArr(this.vForm, arr); // name, res && res.label || name, row, bands);
        return new VArrBand(name, vArr);
    }

    private vFieldFromUI(fieldUI:FieldUI):VField {
        return;
    }

    private vArrFromUI(arrBandUI:ArrBandUI):VArr {
        return;
    }
}
