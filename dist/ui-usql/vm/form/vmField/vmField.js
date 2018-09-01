var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ViewModel } from "../../viewModel";
import { RuleRequired, RuleInt, RuleNum, RuleMin, RuleMax } from '../rule';
//export type TypeControl = React.StatelessComponent<{vm: ViewModel, className:string}>;
export class VmField extends ViewModel {
    constructor(field, fieldUI, formValues, readOnly) {
        super();
        this.field = field;
        this.name = field.name;
        this.fieldUI = fieldUI || {};
        this.formValues = formValues;
        this.formReadOnly = readOnly;
        this.buildRules();
    }
    buildRules() {
        this.rules = [];
        let { required } = this.fieldUI;
        if (required === true || this.field !== undefined && this.field.null === false) {
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
    setValue(v) {
        this.formValues.values[this.name] = v;
    }
    get error() { return this.formValues.errors[this.name]; }
    set error(err) { this.formValues.errors[this.name] = err; }
    parse(str) { return str; }
    get readOnly() {
        //let {readOnly} = this.fieldUI;
        //if (readOnly === true) return true;
        return this.formReadOnly === true;
    }
}
__decorate([
    computed
], VmField.prototype, "checkRules", null);
__decorate([
    computed
], VmField.prototype, "isOk", null);
__decorate([
    computed
], VmField.prototype, "value", null);
export class VmUnknownField extends VmField {
    constructor() {
        super(...arguments);
        this.view = () => {
            let { name, type } = this.fieldUI;
            return React.createElement("input", { type: "text", className: "form-control form-control-plaintext border border-info rounded bg-light", placeholder: 'unkown control: ' + type + '-' + name });
        };
    }
}
export class VmInputControl extends VmField {
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
            this.setValue(this.parse(evt.currentTarget.value));
        };
        this.view = observer(() => {
            let { placeHolder, required } = this.fieldUI;
            let ctrlCN = "form-control form-control-input";
            let errCN;
            /*
            if (className !== undefined) {
                if (typeof className === 'string') ctrlCN = className;
                else if (isArray(className) === true) {
                    ctrlCN = className[0];
                    errCN = className[1];
                }
            }*/
            if (this.readOnly === true)
                return React.createElement("input", { className: ctrlCN, ref: this.ref, type: this.inputType, readOnly: true });
            let redDot;
            if (required === true || this.field.null === false) {
                redDot = React.createElement(RedMark, null);
            }
            return React.createElement(React.Fragment, null,
                redDot,
                React.createElement("input", { className: ctrlCN, ref: this.ref, type: this.inputType, onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange, placeholder: placeHolder, readOnly: this.readOnly }),
                this.renderError(errCN));
        });
    }
    get value() { return super.value; }
    setValue(v) {
        super.setValue(v);
        this.setInputValue();
    }
    setInputValue() {
        if (!this.input)
            return;
        let v = this.value;
        this.input.value = v || '';
    }
}
export const RedMark = () => React.createElement("b", { style: { color: 'red', position: 'absolute', left: '0.1em', top: '0.5em' } }, "*");
export class VmStringField extends VmInputControl {
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
export class VmIntField extends VmNumberControl {
    buildRules() {
        super.buildRules();
        this.rules.push(new RuleInt);
    }
}
export class VmDecField extends VmNumberControl {
}
export class VmTextField extends VmStringField {
}
export class VmDateTimeField extends VmStringField {
}
//# sourceMappingURL=vmField.js.map