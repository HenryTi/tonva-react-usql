import * as React from 'react';
import { observer } from 'mobx-react';
import { FieldUI } from "./formUI";
import { ViewModel } from "../viewModel";
import { FormValues } from './vmFieldsForm';

export function buildControl(fieldUI: FieldUI, formValues:FormValues): VmControl {
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
    fieldUI: FieldUI;
    protected formValues: FormValues;
    protected name: string;
    constructor(fieldUI: FieldUI, formValues:FormValues) {
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

const UnkownControl = ({vm}:{vm:VmControl}) => {
    let {name, type} = vm.fieldUI;
    return <input type="text" className="form-control" id="staticEmail" 
        placeholder={'unkown control: ' + type + '-' + name} />;
}

export abstract class VmInputControl extends VmControl {
    private input: HTMLInputElement;

    inputType:string;
    renderError = () => {
        let {errors} = this.formValues;
        let error = errors[this.name];
        if (error === undefined) return;
        return <div>{error}</div>
    }

    reset() {
        this.input.value = '';
        //this.setValue(null);
    }

    ref = (input:HTMLInputElement) => {
        this.input = input;
        if (input) {
            let v = this.value;
            if (v !== null) this.input.value = v;
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

const InputControl = observer(({vm}:{vm: VmInputControl}) => {
    let {ref, inputType, onFocus, onBlur, onChange, renderError} = vm;
    return <><input className="form-control"
        ref={ref}
        type={inputType}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange} />
        {renderError()}
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

