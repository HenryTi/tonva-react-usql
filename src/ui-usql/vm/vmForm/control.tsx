import * as React from 'react';
import { computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { ViewModel } from "../viewModel";
import { FormValues } from './vmForm';
import { InputUIX, FieldUIX, NumberUIX, StringUIX } from './formUIX';
import { isArray } from 'util';
import { Rule, RuleRequired, RuleInt, RuleNum, RuleMin, RuleMax } from './rule';

export type TypeControl = React.StatelessComponent<{vm: ViewModel, className:string}>;

export function buildControl(fieldUI: FieldUIX, formValues:FormValues): VmControl {
    let ctrl: VmControl;
    switch (fieldUI.type) {
        default: ctrl = new VmUnknownControl(fieldUI, formValues); break;
        case 'string': ctrl = new VmStringControl(fieldUI, formValues); break;
        case 'dec': ctrl = new VmDecControl(fieldUI, formValues); break;
        case 'int': ctrl = new VmIntControl(fieldUI, formValues); break;
    }
    return ctrl;
}

export abstract class VmControl extends ViewModel {
    fieldUI: FieldUIX;
    protected formValues: FormValues;
    protected name: string;
    protected rules: Rule[];
    constructor(fieldUI: FieldUIX, formValues:FormValues) {
        super();
        this.fieldUI = fieldUI;
        this.name = fieldUI.name;
        this.formValues = formValues;
        this.buildRules();
    }

    protected buildRules() {
        this.rules = [];
        let {field, required} = this.fieldUI;
        if (required === true || field !== undefined && field.null === false) {
            this.rules.push(new RuleRequired);
        }
    }

    @computed get checkRules(): string[] {
        let defy = [];
        for (let r of this.rules) r.check(defy, this.value);
        return defy;
    }

    @computed get isOk() {
        if (this.rules.length === 0) return true;
        let defy = this.checkRules;
        return defy.length === 0;
    }

    @computed get value() { return this.formValues.values[this.name]; }
    set value(v:any) { this.formValues.values[this.name]=v; }
    get error() { return this.formValues.errors[this.name]; }
    set error(err:any) { this.formValues.errors[this.name]=err; }
    protected parse(str:string):any {return str;}
}

export class VmUnknownControl extends VmControl {
    protected view = UnkownControl;
}

const UnkownControl = ({vm, className}:{vm:VmControl, className:string}) => {
    let {name, type} = vm.fieldUI;
    return <input type="text" className={className}
        placeholder={'unkown control: ' + type + '-' + name} />;
}

export abstract class VmInputControl extends VmControl {
    fieldUI: InputUIX;
    private input: HTMLInputElement;

    inputType:string;
    renderError = (className:string) => {
        let {errors} = this.formValues;
        let error = errors[this.name];
        if (error === undefined) return;
        return <span className={className}>{error}</span>
    }

    get value() {return super.value;}
    set value(v:any) { super.value = v; this.setInputValue(); }

    ref = (input:HTMLInputElement) => {
        this.input = input;
        this.setInputValue();
    }

    private setInputValue() {
        if (!this.input) return;
        let v = this.value;
        this.input.value = v || '';
    }

    onFocus = () => {
        this.error = undefined;
    }

    onBlur = () => {
        let defy = this.checkRules;
        if (defy.length > 0) {
            this.error = defy[0];
        }
    }

    onChange = (evt: React.ChangeEvent<any>) => {
        this.value = this.parse(evt.currentTarget.value);
    }

    protected view = InputControl;
}

export const RedMark = () => <b style={{color:'red', position:'absolute', left:'0.1em', top:'0.5em'}}>*</b>;
const InputControl = observer(({vm, className}:{vm:VmInputControl, className:string|string[]}) => {
    let {fieldUI, ref, inputType, onFocus, onBlur, onChange, renderError} = vm;
    let {placeHolder, readOnly, form} = fieldUI;
    if (readOnly === undefined) readOnly=false;
    if (readOnly === false) {
        if (form.readOnly === true) readOnly = true;
    }
    let ctrlCN, errCN;
    if (className !== undefined) {
        if (typeof className === 'string') ctrlCN = className;
        else if (isArray(className) === true) {
            ctrlCN = className[0];
            errCN = className[1];
        }
    }
    if (readOnly === true)
        return <input className={ctrlCN}
            ref={ref}
            type={inputType}
            readOnly={true}
        />;

    let redDot;
    let {field, required} = fieldUI;
    if (required === true || field.null === false) {
        redDot = <RedMark />;
    }
    return <>
        {redDot}
        <input className={ctrlCN}
            ref={ref}
            type={inputType}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeHolder}
            readOnly={readOnly} />
        {renderError(errCN)}
    </>
});

export class VmStringControl extends VmInputControl {
    inputType:string = 'text';
}

export abstract class VmNumberControl extends VmInputControl {
    fieldUI: NumberUIX;

    protected buildRules() {
        super.buildRules();
        this.rules.push(new RuleNum);
        let {min, max} = this.fieldUI;
        if (min !== undefined) this.rules.push(new RuleMin(min));
        if (max !== undefined) this.rules.push(new RuleMax(max));
    }

    inputType:string = 'number';

    protected parse(text:string):any {
        try {
            let ret = Number(text);
            return (ret === NaN)? null : ret;
        }
        catch {
            return null;
        }
    }
}

export class VmIntControl extends VmNumberControl {
    protected buildRules() {
        super.buildRules();
        this.rules.push(new RuleInt);
    }
}

export class VmDecControl extends VmNumberControl {
}

