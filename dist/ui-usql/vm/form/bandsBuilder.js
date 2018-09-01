import { VmFieldBand, VmArrBand, VmFieldsBand, VmSubmitBand } from "./vmBand";
import { VmSubmit } from "./vmSubmit";
import { buildVmField } from "./vmField";
import { VmArr } from "./vmArr";
import { VmTuidField } from "./vmField/vmTuidField";
export class BandsBuilder {
    constructor(vmForm, options, onSubmit) {
        this.vmForm = vmForm;
        this.onSubmit = onSubmit;
        this.fields = options.fields;
        this.arrs = options.arrs;
        this.ui = options.ui;
        this.res = options.res;
        this.formValues = vmForm.formValues;
        this.readOnly = vmForm.readOnly;
    }
    build() {
        return this.ui === undefined ? this.bandsOnFly() : this.bandsFromUI(this.ui);
    }
    labelFromName(name, res) {
        if (res === undefined)
            return;
        let { fields } = res;
        if (fields === undefined)
            return;
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
    bandsOnFly() {
        let bands = [];
        this.bandsFromFields(bands, this.fields, this.res);
        if (this.arrs !== undefined) {
            for (let arr of this.arrs)
                bands.push(this.bandFromArr(arr));
        }
        if (this.onSubmit !== undefined) {
            bands.push(new VmSubmitBand(new VmSubmit(this.vmForm)));
        }
        return bands;
    }
    bandsFromFields(bands, fields, res) {
        if (fields === undefined)
            return;
        for (let field of fields)
            bands.push(this.bandFromField(field, res));
    }
    bandsFromUI(ui) {
        let { bandUIs } = ui;
        let bands = [];
        if (bandUIs === undefined)
            return bands;
        for (let bandUI of bandUIs) {
            let band = this.bandFromUI(bandUI);
            bands.push(band);
        }
        return bands;
    }
    bandFromUI(bandUI) {
        let { band } = bandUI;
        switch (band) {
            default: return this.bandFromFieldUI(bandUI);
            case 'arr': return this.bandFromArrUI(bandUI);
            case 'fields': return this.bandFromFieldsUI(bandUI);
            case 'submit': return this.bandFromSubmitUI(bandUI);
        }
    }
    bandFromFieldUI(bandUI) {
        let { label } = bandUI;
        let vmField = this.vmFieldFromUI(bandUI);
        return new VmFieldBand(label, vmField);
    }
    bandFromArrUI(bandUI) {
        let { label, name } = bandUI;
        let vmArr = this.vmArrFromUI(bandUI);
        return new VmArrBand(label, vmArr);
    }
    bandFromFieldsUI(bandUI) {
        let { label, fieldUIs } = bandUI;
        let vmFields = fieldUIs.map(v => this.vmFieldFromUI(v));
        return new VmFieldsBand(label, vmFields);
    }
    bandFromSubmitUI(bandUI) {
        if (this.onSubmit === undefined)
            return;
        let vmSubmit = new VmSubmit(this.vmForm);
        return new VmSubmitBand(vmSubmit);
    }
    vmFieldFromField(field) {
        if (field === undefined)
            debugger;
        //let {name, type} = field;
        let fieldUI = undefined;
        let ret = buildVmField(field, fieldUI, this.formValues, this.readOnly);
        if (ret !== undefined)
            return ret;
        return new VmTuidField(field, fieldUI, this.vmForm);
    }
    bandFromField(field, res) {
        let { name } = field;
        let vmField = this.vmFieldFromField(field);
        return new VmFieldBand(this.labelFromName(name, res) || name, vmField);
    }
    bandFromArr(arr) {
        let { name, fields } = arr;
        //let row = JSONContent;
        //let bands:VmBand[] = [];
        //this.bandsFromFields(bands, fields, res);
        let vmArr = new VmArr(this.vmForm, arr); // name, res && res.label || name, row, bands);
        return new VmArrBand(name, vmArr);
    }
    vmFieldFromUI(fieldUI) {
        return;
    }
    vmArrFromUI(arrBandUI) {
        return;
    }
}
//# sourceMappingURL=bandsBuilder.js.map