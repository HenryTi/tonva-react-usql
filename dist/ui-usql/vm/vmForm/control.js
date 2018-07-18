var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ViewModel } from "../viewModel";
import { isArray } from 'util';
import { RuleRequired, RuleInt, RuleNum, RuleMin, RuleMax } from './rule';
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
        this.buildRules();
    }
    buildRules() {
        this.rules = [];
        let { field, required } = this.fieldUI;
        if (required === true || field !== undefined && field.null === false) {
            this.rules.push(new RuleRequired);
        }
    }
    get checkRules() {
        let defy = [];
        for (let r of this.rules)
            r.check(defy, this.value);
        return defy;
    }
    get isOk() {
        if (this.rules.length === 0)
            return true;
        let defy = this.checkRules;
        return defy.length === 0;
    }
    get value() { return this.formValues.values[this.name]; }
    set value(v) { this.formValues.values[this.name] = v; }
    get error() { return this.formValues.errors[this.name]; }
    set error(err) { this.formValues.errors[this.name] = err; }
    parse(str) { return str; }
    get readOnly() {
        let { readOnly, form } = this.fieldUI;
        if (readOnly === true)
            return true;
        return form && form.readOnly === true;
    }
}
__decorate([
    computed
], VmControl.prototype, "checkRules", null);
__decorate([
    computed
], VmControl.prototype, "isOk", null);
__decorate([
    computed
], VmControl.prototype, "value", null);
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
            let defy = this.checkRules;
            if (defy.length > 0) {
                this.error = defy[0];
            }
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
export const RedMark = () => React.createElement("b", { style: { color: 'red', position: 'absolute', left: '0.1em', top: '0.5em' } }, "*");
const InputControl = observer(({ vm, className }) => {
    let { fieldUI, ref, inputType, onFocus, onBlur, onChange, renderError, readOnly } = vm;
    let { placeHolder, form } = fieldUI;
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
    let redDot;
    let { field, required } = fieldUI;
    if (required === true || field.null === false) {
        redDot = React.createElement(RedMark, null);
    }
    return React.createElement(React.Fragment, null,
        redDot,
        React.createElement("input", { className: ctrlCN, ref: ref, type: inputType, onFocus: onFocus, onBlur: onBlur, onChange: onChange, placeholder: placeHolder, readOnly: readOnly }),
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
    buildRules() {
        super.buildRules();
        this.rules.push(new RuleNum);
        let { min, max } = this.fieldUI;
        if (min !== undefined)
            this.rules.push(new RuleMin(min));
        if (max !== undefined)
            this.rules.push(new RuleMax(max));
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
    buildRules() {
        super.buildRules();
        this.rules.push(new RuleInt);
    }
}
export class VmDecControl extends VmNumberControl {
}
//# sourceMappingURL=control.js.map