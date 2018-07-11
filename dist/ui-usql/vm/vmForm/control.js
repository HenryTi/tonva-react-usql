import * as React from 'react';
import { observer } from 'mobx-react';
//import { FieldUI, InputUI } from "./formUI";
import { ViewModel } from "../viewModel";
import { isArray } from 'util';
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
const UnkownControl = ({ vm, className }) => {
    let { name, type } = vm.fieldUI;
    return React.createElement("input", { type: "text", className: className, placeholder: 'unkown control: ' + type + '-' + name });
};
export class VmInputControl extends VmControl {
    constructor() {
        super(...arguments);
        this.renderError = (className) => {
            let { errors } = this.formValues;
            let error = errors[this.name];
            if (error === undefined)
                return;
            return React.createElement("span", { className: className }, error);
        };
        this.ref = (input) => {
            this.input = input;
            this.setInputValue();
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
    get value() { return super.value; }
    set value(v) { super.value = v; this.setInputValue(); }
    setInputValue() {
        if (!this.input)
            return;
        let v = this.value;
        this.input.value = v || '';
    }
}
const InputControl = observer(({ vm, className }) => {
    let { fieldUI, ref, inputType, onFocus, onBlur, onChange, renderError } = vm;
    let { placeholder, readOnly, form } = fieldUI;
    if (readOnly === undefined)
        readOnly = false;
    if (readOnly === false) {
        if (form.readOnly === true)
            readOnly = true;
    }
    let ctrlCN, errCN;
    if (className !== undefined) {
        if (typeof className === 'string')
            ctrlCN = className;
        else if (isArray(className) === true) {
            ctrlCN = className[0];
            errCN = className[1];
        }
    }
    if (readOnly === true)
        return React.createElement("input", { className: ctrlCN, ref: ref, type: inputType, readOnly: true });
    return React.createElement(React.Fragment, null,
        React.createElement("input", { className: ctrlCN, ref: ref, type: inputType, onFocus: onFocus, onBlur: onBlur, onChange: onChange, placeholder: placeholder, readOnly: readOnly }),
        renderError(errCN));
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