import * as React from 'react';
import { observer } from 'mobx-react';
import { ViewModel } from "../viewModel";
export function buildControl(fieldUI, formValues) {
    let ctrl;
    switch (fieldUI.type) {
        default:
            ctrl = new VmUnknownControl(fieldUI, formValues);
            break;
        case 'string':
            ctrl = new VmStringControl(fieldUI, formValues);
            break;
        case 'dec':
            ctrl = new VmDecControl(fieldUI, formValues);
            break;
        case 'int':
            ctrl = new VmIntControl(fieldUI, formValues);
            break;
    }
    return ctrl;
}
export class VmControl extends ViewModel {
    constructor(fieldUI, formValues) {
        super();
        this.fieldUI = fieldUI;
        this.name = fieldUI.name;
        this.formValues = formValues;
    }
    get value() { return this.formValues.values[this.name]; }
    set value(v) { this.formValues.values[this.name] = v; }
    get error() { return this.formValues.errors[this.name]; }
    set error(err) { this.formValues.errors[this.name] = err; }
    parse(str) { return str; }
}
export class VmUnknownControl extends VmControl {
    constructor() {
        super(...arguments);
        this.view = UnkownControl;
    }
}
const UnkownControl = ({ vm }) => {
    let { name, type } = vm.fieldUI;
    return React.createElement("input", { type: "text", className: "form-control", id: "staticEmail", placeholder: 'unkown control: ' + type + '-' + name });
};
export class VmInputControl extends VmControl {
    constructor() {
        super(...arguments);
        this.renderError = () => {
            let { errors } = this.formValues;
            let error = errors[this.name];
            if (error === undefined)
                return;
            return React.createElement("div", null, error);
        };
        this.ref = (input) => {
            this.input = input;
            if (input) {
                let v = this.value;
                if (v !== null)
                    this.input.value = v;
            }
        };
        this.onFocus = () => {
            this.error = undefined;
        };
        this.onBlur = () => {
            this.error = 'error';
        };
        this.onChange = (evt) => {
            this.value = this.parse(evt.currentTarget.value);
        };
        this.view = InputControl;
    }
    reset() {
        this.input.value = '';
        //this.setValue(null);
    }
}
const InputControl = observer(({ vm }) => {
    let { ref, inputType, onFocus, onBlur, onChange, renderError } = vm;
    return React.createElement(React.Fragment, null,
        React.createElement("input", { className: "form-control", ref: ref, type: inputType, onFocus: onFocus, onBlur: onBlur, onChange: onChange }),
        renderError());
});
export class VmStringControl extends VmInputControl {
    constructor() {
        super(...arguments);
        this.inputType = 'text';
    }
}
export class VmNumberControl extends VmInputControl {
    constructor() {
        super(...arguments);
        this.inputType = 'number';
    }
    parse(text) {
        try {
            let ret = Number(text);
            return (ret === NaN) ? null : ret;
        }
        catch (_a) {
            return null;
        }
    }
}
export class VmIntControl extends VmNumberControl {
}
export class VmDecControl extends VmNumberControl {
}
//# sourceMappingURL=control.js.map