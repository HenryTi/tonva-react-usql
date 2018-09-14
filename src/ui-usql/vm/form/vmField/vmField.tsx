import * as React from 'react';
import { computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { ViewModel } from "../../viewModel";
import { FormValues, FieldCall, FieldInputs } from '../vmForm';
import { Rule, RuleRequired, RuleInt, RuleNum, RuleMin, RuleMax } from '../rule';
import { Field } from '../../../entities';
import { FieldUI, InputUI, NumberUI, Compute, StringUI } from '../../formUI';

//export type TypeControl = React.StatelessComponent<{vm: ViewModel, className:string}>;

export abstract class VmField extends ViewModel {
    protected fieldUI: FieldUI;
    protected field: Field;
    protected formValues: FormValues;
    protected formReadOnly: boolean;
    protected rules: Rule[];
    protected formCompute: Compute;
    constructor(field:Field, fieldUI: FieldUI, formValues:FormValues, formCompute: Compute, readOnly:boolean) {
        super();
        this.field = field;
        this.name = field.name;
        this.fieldUI = fieldUI || {} as any;
        this.formValues = formValues;
        this.formCompute = formCompute;
        this.formReadOnly = readOnly;
        this.init();
    }

    name: string;

    protected init() {
        this.buildRules();
    }

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
    protected fieldUI: InputUI;
    protected input: HTMLInputElement;

    protected inputType:string;
    protected get maxLength():number {return}

    protected renderError = (className:string) => {
        let {errors} = this.formValues;
        let error = errors[this.name];
        if (error === undefined) return;
        return <div className={className}><FA name="exclamation-circle" /> {error}</div>
    }

    get value() {
        return super.value;
    }
    setValue(v:any) {
        super.setValue(v); this.setInputValue(); 
    }

    protected ref = (input:HTMLInputElement) => {
        this.input = input;
        this.setInputValue();
    }

    private setInputValue() {
        if (!this.input) return;
        let v = this.value;
        this.input.value = v === null || v === undefined? '' : v;
    }

    protected onFocus = () => {
        this.error = undefined;
    }

    protected onBlur = () => {
        let defy = this.checkRules;
        if (defy.length > 0) {
            this.error = defy[0];
        }
        if (this.formCompute !== undefined) {
            let {values} = this.formValues;
            for (let i in this.formCompute) {
                values[i] = this.formCompute[i].call(values);
            }
        }
    }

    protected onChange = (evt: React.ChangeEvent<any>) => {
        let v = this.parse(evt.currentTarget.value);
        if (v === null) {
            return;
        }
        this.setValue(v);
    }

    protected onKeyPress: (event:React.KeyboardEvent<HTMLInputElement>) => void;
    
    protected view = observer(() => {
        let {placeHolder, required} = this.fieldUI;
        let ctrlCN = 'form-control form-control-input';
        let errCN = 'text-danger small mt-1 mx-2';
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
                readOnly={this.readOnly}
                maxLength={this.maxLength}
                onKeyPress={this.onKeyPress} />
            {this.renderError(errCN)}
        </>
    });
}

export const RedMark = () => <b style={{color:'red', position:'absolute', left:'0.1em', top:'0.5em'}}>*</b>;

export class VmStringField extends VmInputControl {
    protected fieldUI: StringUI;
    protected inputType:string = 'text';
    protected get maxLength():number {return this.field.size}
}

const KeyCode_Neg = 45;
const KeyCode_Dot = 46;

export abstract class VmNumberControl extends VmInputControl {
    protected fieldUI: NumberUI;
    protected extraChars: number[];

    protected init() {
        super.init();
        this.extraChars = [];
        if (this.fieldUI !== undefined) {
            let {min, max} = this.fieldUI;
            if (min !== undefined) {
                //this.rules.push((v:number) => {if (v === undefined) return; if (v<min) return ErrMin + min; return true;});
                if (min < 0) this.extraChars.push(KeyCode_Neg);
            }
            else {
                this.extraChars.push(KeyCode_Neg);
            }
    
            if (max !== undefined) {
                //this.rules.push((v:number) => {if (v === undefined) return; if (v>max) return ErrMax + max; return true});
            }
        }
        switch (this.field.type) {
            case 'dec':
            case 'bigint':
            case 'int':
            case 'smallint':
            case 'tinyint':
                this.extraChars.push(KeyCode_Dot); break;
        }
    }

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
            if (text.trim().length === 0) return undefined;
            let ret = Number(text);
            return (ret === NaN)? null : ret;
        }
        catch {
            return null;
        }
    }

    protected onKeyPress = (event:React.KeyboardEvent<HTMLInputElement>) => {
        let ch = event.charCode;
        if (ch === 8 || ch === 0 || ch === 13 || ch >= 48 && ch <= 57) return;
        if (this.extraChars !== undefined) {
            if (this.extraChars.indexOf(ch) >= 0) {
                switch (ch) {
                    case KeyCode_Dot: this.onKeyDot(); break;
                    case KeyCode_Neg: this.onKeyNeg(); event.preventDefault(); break;
                }
                return;
            }
        }
        event.preventDefault();
    }

    private onKeyDot() {
        let v = this.input.value;
        let p = v.indexOf('.');
        if (p >= 0) this.input.value = v.replace('.', '');
    }
    private onKeyNeg() {
        let v = this.input.value;
        let p = v.indexOf('-');
        if (p >= 0) v = v.replace('-', '');
        else v = '-'+v;
        this.input.value = v;
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
