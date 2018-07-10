import * as React from 'react';
import { observer } from 'mobx-react';
//import { FieldUI, InputUI } from "./formUI";
import { ViewModel } from "../viewModel";
import { FormValues } from './vmForm';
import { InputUIX, FieldUIX } from './formUIX';
import { isArray } from 'util';

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
    constructor(fieldUI: FieldUIX, formValues:FormValues) {
        super();
        this.fieldUI = fieldUI;
        this.name = fieldUI.name;
        this.formValues = formValues;
    }

    get value() { return this.formValues.values[this.name]; }
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

    reset() {
        this.input.value = '';
        //this.setValue(null);
    }

    ref = (input:HTMLInputElement) => {
        this.input = input;
        if (input) {
            let v = this.value;
            this.input.value = (v !== null)? v : '';
        }
    }

    onFocus = () => {
        this.error = undefined;
    }

    onBlur = () => {
        this.error = 'error';
    }

    onChange = (evt: React.ChangeEvent<any>) => {
        this.value = this.parse(evt.currentTarget.value);
    }

    protected view = InputControl;
}

const InputControl = observer(({vm, className}:{vm:VmInputControl, className:string|string[]}) => {
    let {fieldUI, ref, inputType, onFocus, onBlur, onChange, renderError} = vm;
    let {placeholder, readOnly, form} = fieldUI;
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

    return <><input className={ctrlCN}
        ref={ref}
        type={inputType}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly} />
        {renderError(errCN)}
    </>
});

export class VmStringControl extends VmInputControl {
    inputType:string = 'text';
}

export abstract class VmNumberControl extends VmInputControl {
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
}

export class VmDecControl extends VmNumberControl {
}

