import { VmFieldBand, VmArrBand, VmFieldsBand, VmSubmitBand } from "./vBand";
import { VSubmit } from "./vSubmit";
import { buildVmField, VComputeField } from "./vField";
import { VArr } from "./vArr";
import { VTuidField } from "./vField/vTuidField";
export class BandsBuilder {
    constructor(vmForm, options, onSubmit) {
        this.vmForm = vmForm;
        this.onSubmit = onSubmit;
        let { fields, arrs, ui, res } = options;
        this.fields = fields;
        this.arrs = arrs;
        if (ui !== undefined) {
            let { bandUIs, compute } = ui;
            this.bandUIs = bandUIs;
            this.compute = compute;
        }
        this.res = res;
        this.formValues = vmForm.formValues;
        this.readOnly = vmForm.readOnly;
    }
    build() {
        return this.bandUIs === undefined ? this.bandsOnFly() : this.bandsFromUI();
    }
    labelFromName(name, res) {
        if (res === undefined)
            return;
        let { fields } = res;
        if (fields === undefined)
            return;
        return fields[name] || name;
    }
    bandsOnFly() {
        let bands = [];
        this.bandsFromFields(bands, this.fields, this.res);
        if (this.arrs !== undefined) {
            for (let arr of this.arrs)
                bands.push(this.bandFromArr(arr));
        }
        if (this.onSubmit !== undefined) {
            bands.push(new VmSubmitBand(new VSubmit(this.vmForm)));
        }
        return bands;
    }
    bandsFromFields(bands, fields, res) {
        if (fields === undefined)
            return;
        for (let field of fields)
            bands.push(this.bandFromField(field, res));
    }
    bandsFromUI() {
        let bands = [];
        for (let bandUI of this.bandUIs) {
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
        let vmSubmit = new VSubmit(this.vmForm);
        return new VmSubmitBand(vmSubmit);
    }
    vmFieldFromField(field) {
        let fieldUI = undefined;
        if (this.compute !== undefined) {
            let fieldCompute = this.compute[field.name];
            if (fieldCompute !== undefined) {
                return new VComputeField(field, fieldUI, this.formValues);
            }
        }
        let ret = buildVmField(field, fieldUI, this.formValues, this.compute, this.readOnly);
        if (ret !== undefined)
            return ret;
        return new VTuidField(field, fieldUI, this.vmForm);
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
        let vmArr = new VArr(this.vmForm, arr); // name, res && res.label || name, row, bands);
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