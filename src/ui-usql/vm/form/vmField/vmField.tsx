import * as React from 'react';
import { computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { ViewModel } from "../../viewModel";
import { FormValues, FieldCall, FieldInputs } from '../vmForm';
import { Rule, RuleRequired, RuleInt, RuleNum, RuleMin, RuleMax } from '../rule';
import { Field } from '../../../entities';
import { FieldUI, InputUI, NumberUI } from '../formUI';

//export type TypeControl = React.StatelessComponent<{vm: ViewModel, className:string}>;

export abstract class VmField extends ViewModel {
    protected fieldUI: FieldUI;
    protected field: Field;
    protected formValues: FormValues;
    protected formReadOnly: boolean;
    protected rules: Rule[];
    constructor(field:Field, fieldUI: FieldUI, formValues:FormValues, readOnly:boolean) {
        super();
        this.field = field;
        this.name = field.name;
        this.fieldUI = fieldUI || {} as any;
        this.formValues = formValues;
        this.formReadOnly = readOnly;
        this.buildRules();
    }

    name: string;

    protected buildRules() {
        this.rules = [];
        let {required} = this.fieldUI;
        if (required === true || this.field !== undefined && this.field.null === false) {
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
    setValue(v:any) { 
        this.formValues.values[this.name]=v; 
    }
    get error() { return this.formValues.errors[this.name]; }
    set error(err:any) { this.formValues.errors[this.name]=err; }
    protected parse(str:string):any {return str;}
    get readOnly() {
        //let {readOnly} = this.fieldUI;
        //if (readOnly === true) return true;
        return this.formReadOnly === true;
    }
}

export class VmUnknownField extends VmField {
    protected view = () => {
        let {name, type} = this.fieldUI;
        return <input type="text" className="form-control form-control-plaintext border border-info rounded bg-light"
            placeholder={'unkown control: ' + type + '-' + name} />;
    }
}

export abstract class VmInputControl extends VmField {
    fieldUI: InputUI;
    private input: HTMLInputElement;

    inputType:string;
    renderError = (className:string) => {
        let {errors} = this.formValues;
        let error = errors[this.name];
        if (error === undefined) return;
        return <span className={className}>{error}</span>
    }

    get value() {return super.value;}
    setValue(v:any) {
        super.setValue(v); this.setInputValue(); 
    }

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
        this.setValue(this.parse(evt.currentTarget.value));
    }

    protected view = observer(() => {
        let {placeHolder, required} = this.fieldUI;
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
            return <input className={ctrlCN}
                ref={this.ref}
                type={this.inputType}
                readOnly={true}
            />;
    
        let redDot;
        if (required === true || this.field.null === false) {
            redDot = <RedMark />;
        }
        return <>
            {redDot}
            <input className={ctrlCN}
                ref={this.ref}
                type={this.inputType}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
                placeholder={placeHolder}
                readOnly={this.readOnly} />
            {this.renderError(errCN)}
        </>
    });
}

export const RedMark = () => <b style={{color:'red', position:'absolute', left:'0.1em', top:'0.5em'}}>*</b>;

export class VmStringField extends VmInputControl {
    inputType:string = 'text';
}

export abstract class VmNumberControl extends VmInputControl {
    fieldUI: NumberUI;

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

export class VmIntField extends VmNumberControl {
    protected buildRules() {
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
