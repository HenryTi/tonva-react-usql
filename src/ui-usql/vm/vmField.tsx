/*
import * as React from 'react';
import { ViewModel } from "./viewModel";
import { VmForm } from "./form/vmForm";
import { VmControl } from './control/control';

export abstract class VmField {
    name: string;
    protected vmForm: VmForm;
    protected control: VmControl;
    constructor(vmForm:VmForm, name:string, control: VmControl) {
        //super();
        this.vmForm = vmForm;
        this.name = name;
        this.control = control;
    }
    //protected view = () => <div />;
    render() {return this.control.render()}
}

export class VmInputField extends VmField {

}
export class VmNumberField extends VmInputField {

}

export class VmIntField extends VmNumberField {

}

export class VmDecField extends VmNumberField {

}

export class VmStringField extends VmInputField {

}

export class VmTextField extends VmInputField {

}

export class VmTuidField extends VmInputField {

}

export class VmDateTimeField extends VmInputField {
}
*/