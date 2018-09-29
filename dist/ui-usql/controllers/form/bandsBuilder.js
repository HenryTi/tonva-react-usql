import { VFieldBand, VArrBand, VFieldsBand, VSubmitBand } from "./vBand";
import { VSubmit } from "./vSubmit";
import { buildVField, VComputeField } from "./vField";
import { VArr } from "./vArr";
import { VTuidField } from "./vField/vTuidField";
export class BandsBuilder {
    constructor(vForm, options, onSubmit) {
        this.vForm = vForm;
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
        this.formValues = vForm.formValues;
        this.readOnly = vForm.readOnly;
    }
    build() {
        return this.bandUIs === undefined ? this.bandsOnFly() : this.bandsFromUI();
    }
    resFromName(name, res) {
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
            bands.push(new VSubmitBand(new VSubmit(this.vForm)));
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
        let vField = this.vFieldFromUI(bandUI);
        return new VFieldBand(label, vField);
    }
    bandFromArrUI(bandUI) {
        let { label, name } = bandUI;
        let vArr = this.vArrFromUI(bandUI);
        return new VArrBand(label, vArr);
    }
    bandFromFieldsUI(bandUI) {
        let { label, fieldUIs } = bandUI;
        let vFields = fieldUIs.map(v => this.vFieldFromUI(v));
        return new VFieldsBand(label, vFields);
    }
    bandFromSubmitUI(bandUI) {
        if (this.onSubmit === undefined)
            return;
        let vSubmit = new VSubmit(this.vForm);
        return new VSubmitBand(vSubmit);
    }
    vFieldFromField(field, fieldRes) {
        let fieldUI = undefined;
        if (this.compute !== undefined) {
            let fieldCompute = this.compute[field.name];
            if (fieldCompute !== undefined) {
                return new VComputeField(field, fieldUI, fieldRes, this.formValues);
            }
        }
        let ret = buildVField(field, fieldUI, fieldRes, this.formValues, this.compute, this.readOnly);
        if (ret !== undefined)
            return ret;
        return new VTuidField(field, fieldUI, fieldRes, this.vForm);
    }
    bandFromField(field, res) {
        let { name } = field;
        let fieldRes = this.resFromName(name, res);
        let label;
        if (typeof fieldRes === 'object') {
            label = fieldRes.label;
        }
        else {
            label = fieldRes;
            fieldRes = undefined;
        }
        let vField = this.vFieldFromField(field, fieldRes);
        return new VFieldBand(label || name, vField);
    }
    bandFromArr(arr) {
        let { name, fields } = arr;
        //let row = JSONContent;
        //let bands:VBand[] = [];
        //this.bandsFromFields(bands, fields, res);
        let vArr = new VArr(this.vForm, arr); // name, res && res.label || name, row, bands);
        return new VArrBand(name, vArr);
    }
    vFieldFromUI(fieldUI) {
        return;
    }
    vArrFromUI(arrBandUI) {
        return;
    }
}
//# sourceMappingURL=bandsBuilder.js.map