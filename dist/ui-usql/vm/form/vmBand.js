import * as React from 'react';
import { uid } from 'tonva-react-form';
export class VmBand {
    constructor(label) {
        this.view = () => React.createElement("div", null);
        this.label = label;
    }
    render() {
        return React.createElement("div", { key: this.key, className: 'form-group row' },
            React.createElement("label", { className: 'col-sm-2 col-form-label text-sm-right' }, this.label),
            React.createElement("div", { className: "col-sm-10" }, this.renderContent()));
    }
    get key() { return this.label; }
    getVmFields() { return; }
    getVmArr() { return; }
    getVmSubmit() { return; }
    renderContent() {
        return React.createElement("div", { className: "form-control form-control-plaintext bg-white border border-info rounded " }, "content");
    }
}
export class VmFieldBand extends VmBand {
    constructor(label, vmField) {
        super(label);
        this.vmField = vmField;
    }
    get key() { return this.vmField.name; }
    getVmFields() { return [this.vmField]; }
    renderContent() {
        return this.vmField.render();
        /*
        <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            {this.vmField.render()}
        </div>;*/
    }
}
export class VmArrBand extends VmBand {
    constructor(label, vmArr) {
        super(label);
        this.vmArr = vmArr;
    }
    get key() { return this.vmArr.name; }
    getVmArr() { return this.vmArr; }
    render() {
        return React.createElement("div", { key: this.key, className: "form-group row flex-column" }, this.vmArr && this.vmArr.render());
    }
}
export class VmFieldsBand extends VmBand {
    constructor(label, vmFields) {
        super(label);
        this.vmFields = vmFields;
    }
    get key() { return this.label || uid(); }
    getVmFields() { return this.vmFields; }
    renderContent() {
        return React.createElement("div", { className: "form-control form-control-plaintext bg-white border border-info rounded " }, "fields");
    }
}
export class VmSubmitBand extends VmBand {
    constructor(vmSubmit) {
        super(undefined);
        this.vmSubmit = vmSubmit;
    }
    getVmSubmit() { return this.vmSubmit; }
    render() {
        return React.createElement("div", { key: "$submit", className: "form-group row" },
            React.createElement("div", { className: "offset-sm-2 col-sm-10" }, this.vmSubmit.render()));
    }
}
//# sourceMappingURL=vmBand.js.map