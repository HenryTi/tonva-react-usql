import { VmBand, VmFieldBand, VmArrBand, VmFieldsBand, VmSubmitBand } from "./vmBand";
import { Field, ArrFields } from "../../entities";
import { VmForm, FieldInputs, FormOptions, FormValues } from "./vmForm";
import { FormUI, BandUI, FieldBandUI, ArrBandUI, FieldsBandUI, SubmitBandUI, FieldUI } from "./formUI";
import { VmSubmit } from "./vmSubmit";
import { VmField, buildVmField } from "./vmField";
import { JSONContent } from "..";
import { VmArr } from "./vmArr";
import { VmTuidField } from "./vmField/vmTuidField";

export class BandsBuilder {
    private vmForm: VmForm;
    private onSubmit: (values:any)=>Promise<void>;
    private fields: Field[];
    private arrs: ArrFields[];
    private ui: any;
    private res: any;
    private formValues: FormValues;
    private readOnly: boolean;
    constructor(vmForm:VmForm, options: FormOptions, onSubmit: (values:any)=>Promise<void>) {
        this.vmForm = vmForm;
        this.onSubmit = onSubmit;
        this.fields = options.fields;
        this.arrs = options.arrs;
        this.ui = options.ui;
        this.res = options.res;
        this.formValues = vmForm.formValues;
        this.readOnly = vmForm.readOnly;
    }

    build():VmBand[] {
        return this.ui === undefined? this.bandsOnFly() : this.bandsFromUI(this.ui);
    }

    private labelFromName(name:string, res:any):string {
        if (res === undefined) return;
        let {fields} = res;
        if (fields === undefined) return;
        return fields[name] || name;
    }

    /*
    private arrResFromName(name:string):any {
        if (this.res === undefined) return;
        let {arrs} = this.res;
        if (arrs === undefined) return;
        return arrs[name];
    }
    */
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

    private bandsFromUI(ui:FormUI):VmBand[] {
        let { bandUIs } = ui;
        let bands:VmBand[] = [];
        if (bandUIs === undefined) return bands;
        for (let bandUI of bandUIs)  {
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
        if (field === undefined) debugger;
        //let {name, type} = field;
        let fieldUI:FieldUI = undefined;
        let ret = buildVmField(field, fieldUI, this.formValues, this.readOnly);
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
