import { VmBand, VmFieldBand, VmArrBand, VmFieldsBand, VmSubmitBand } from "./vmBand";
import { Field, ArrFields } from "../../entities";
import { VmForm, FieldInputs, FormOptions, FormValues } from "./vmForm";
import { FormUI, BandUI, FieldBandUI, ArrBandUI, FieldsBandUI, SubmitBandUI, FieldUI, Compute } from "../formUI";
import { VmSubmit } from "./vmSubmit";
import { VmField, buildVmField, VmComputeField } from "./vmField";
import { JSONContent } from "..";
import { VmArr } from "./vmArr";
import { VmTuidField } from "./vmField/vmTuidField";

export class BandsBuilder {
    private vmForm: VmForm;
    private onSubmit: (values:any)=>Promise<void>;
    private fields: Field[];
    private arrs: ArrFields[];
    //private ui: FormUI;
    private bandUIs: BandUI[];
    private compute: Compute;
    private res: any;
    private formValues: FormValues;
    private readOnly: boolean;
    constructor(vmForm:VmForm, options: FormOptions, onSubmit: (values:any)=>Promise<void>) {
        this.vmForm = vmForm;
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
        this.formValues = vmForm.formValues;
        this.readOnly = vmForm.readOnly;
    }

    build():VmBand[] {
        return this.bandUIs === undefined? this.bandsOnFly() : this.bandsFromUI();
    }

    private labelFromName(name:string, res:any):string {
        if (res === undefined) return;
        let {fields} = res;
        if (fields === undefined) return;
        return fields[name] || name;
    }

    private bandsOnFly():VmBand[] {
        let bands:VmBand[] = [];
        this.bandsFromFields(bands, this.fields, this.res);
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) bands.push(this.bandFromArr(arr));
        }
        if (this.onSubmit !== undefined) {
            bands.push(new VmSubmitBand(new VmSubmit(this.vmForm)));
        }
        return bands;
    }

    private bandsFromFields(bands:VmBand[], fields:Field[], res:any) {
        if (fields === undefined) return;
        for (let field of fields) bands.push(this.bandFromField(field, res));
    }

    private bandsFromUI():VmBand[] {
        let bands:VmBand[] = [];
        for (let bandUI of this.bandUIs)  {
            let band = this.bandFromUI(bandUI);
            bands.push(band);
        }
        return bands;
    }

    private bandFromUI(bandUI:BandUI):VmBand {
        let {band} = bandUI;
        switch (band) {
            default: return this.bandFromFieldUI(bandUI as FieldBandUI);
            case 'arr': return this.bandFromArrUI(bandUI as ArrBandUI);
            case 'fields': return this.bandFromFieldsUI(bandUI as FieldsBandUI);
            case 'submit': return this.bandFromSubmitUI(bandUI as SubmitBandUI);
        }
    }

    private bandFromFieldUI(bandUI: FieldBandUI): VmFieldBand {
        let {label} = bandUI;
        let vmField = this.vmFieldFromUI(bandUI);
        return new VmFieldBand(label, vmField);
    }
    private bandFromArrUI(bandUI: ArrBandUI): VmArrBand {
        let {label, name} = bandUI;
        let vmArr = this.vmArrFromUI(bandUI);
        return new VmArrBand(label, vmArr);
    }
    private bandFromFieldsUI(bandUI: FieldsBandUI): VmFieldsBand {
        let {label, fieldUIs} = bandUI;
        let vmFields = fieldUIs.map(v => this.vmFieldFromUI(v));
        return new VmFieldsBand(label, vmFields);
    }
    private bandFromSubmitUI(bandUI: SubmitBandUI): VmSubmitBand {
        if (this.onSubmit === undefined) return;
        let vmSubmit = new VmSubmit(this.vmForm);
        return new VmSubmitBand(vmSubmit);
    }

    private vmFieldFromField(field:Field): VmField {
        let fieldUI:FieldUI = undefined;
        if (this.compute !== undefined) {
            let fieldCompute = this.compute[field.name];
            if (fieldCompute !== undefined) {
                return new VmComputeField(field, fieldUI, this.formValues);
            }
        }
        let ret = buildVmField(field, fieldUI, this.formValues, this.compute, this.readOnly);
        if (ret !== undefined) return ret;
        return new VmTuidField(field, fieldUI, this.vmForm);
    }
    private bandFromField(field:Field, res:any):VmBand {
        let {name} = field;
        let vmField = this.vmFieldFromField(field);
        return new VmFieldBand(this.labelFromName(name, res) || name, vmField);
    }

    private bandFromArr(arr: ArrFields):VmBand {
        let {name, fields} = arr;
        //let row = JSONContent;
        //let bands:VmBand[] = [];
        //this.bandsFromFields(bands, fields, res);
        let vmArr = new VmArr(this.vmForm, arr); // name, res && res.label || name, row, bands);
        return new VmArrBand(name, vmArr);
    }

    private vmFieldFromUI(fieldUI:FieldUI):VmField {
        return;
    }

    private vmArrFromUI(arrBandUI:ArrBandUI):VmArr {
        return;
    }
}
