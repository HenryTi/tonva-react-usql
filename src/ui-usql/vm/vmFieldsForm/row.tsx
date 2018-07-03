/*
import * as React from 'react';
import { ViewModel } from "../viewModel";
import { Field } from '../field';
import { observable } from 'mobx';
import { VmForm } from '.';

export abstract class VmFormRow extends ViewModel {
    protected form: VmForm;
    protected key:any;
    protected label:any;

    constructor(form:VmForm, key:any, label:any) {
        super();
        this.form = form;
        this.key = key;
        this.label = label;
    }

    protected renderContent() {
        return <div className="form-control-plaintext">
            VMFormRow base
        </div>
    }

    protected renderControl() {
        return <div className="col-sm-10">
            {this.renderContent()}
        </div>;
    }

    reset() {}

    renderView() {
        return <div key={this.key} className='form-group row'>
            <label className='col-sm-2 col-form-label'>
                {this.label}
            </label>
            {this.renderControl()}
        </div>;
    }
}

export class VmFormSubmitButtonRow extends VmFormRow {
    protected submitButton:JSX.Element;
    constructor(form:VmForm, submitButton:JSX.Element) {
        super(form, undefined, undefined);
        this.submitButton = submitButton;
    }

    protected renderContent() {
        return <div className="form-control-plaintext">
            {this.submitButton}
        </div>
    }

    renderView() {
        return this.submitButton && super.renderView();
    }
}

export abstract class VmFormFieldRow extends VmFormRow {
    protected field: Field;
    protected ui: any;

    constructor(form:VmForm, field:Field, ui?: any) {
        let fn = field.name;
        let _label = fn;
        if (ui !== undefined) {
            let {label} = ui;
            if (label !== undefined) _label = label;
        }
        super(form, fn, _label);
        this.field = field;
        this.ui = ui;
    }

    protected abstract renderInput():JSX.Element;

    protected renderContent() {
        return this.renderInput();
    }

    getValue() {return this.form.getValue(this.field.name)}
    setValue(value:any) { this.form.setValue(this.field.name, value); }
    protected parse(text:string):any {return text}
}

export class VmFormFieldRowUnkown extends VmFormFieldRow {
    protected renderInput():JSX.Element {
        return <div className="form-control-plaintext">
            unknown field: {JSON.stringify(this.field)}
        </div>
    }
}

export abstract class VmFormFieldRowInput extends VmFormFieldRow {
    private input: HTMLInputElement;
    @observable protected error: string;

    constructor(form:VmForm, field:Field, ui?:any) {
        super(form, field, ui);
        this.ref = this.ref.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    protected inputType:string;

    protected renderError() {
        if (this.error === undefined) return;
        return <div>{this.error}</div>
    }
    protected renderContent() {
        return <>
            {this.renderInput()}
            {this.renderError()}
        </>
    }

    reset() {
        this.input.value = '';
        this.setValue(null);
    }

    protected ref(input:HTMLInputElement) {
        this.input = input;
        if (input) {
            let v = this.getValue();
            if (v !== null) this.input.value = v;
        }
    }

    protected onFocus() {
        this.error = undefined;
    }

    protected onBlur() {
        this.error = 'error';
    }

    protected onChange(evt: React.ChangeEvent<any>) {
        this.setValue(this.parse(evt.currentTarget.value));
    }

    protected renderInput() {
        return <input className="form-control"
            ref={this.ref}
            type={this.inputType}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange} />;
    }
}

export class VmFormFieldRowNumber extends VmFormFieldRowInput {
    protected inputType:string = 'number';

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

export class VmFormFieldRowString extends VmFormFieldRowInput {
    protected inputType:string = 'text';
}
*/