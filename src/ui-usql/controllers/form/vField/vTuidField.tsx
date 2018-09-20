import * as React from 'react';
import { observer } from 'mobx-react';
import { Field, Tuid } from '../../../entities';
import { VField, RedMark } from "./vField";
import { FieldUI } from '../../formUI';
import { FieldInputs, FormValues, FieldCall, VForm, FieldInput } from '../vForm';

const buttonStyle:React.CSSProperties = {
    textAlign:'left', 
    paddingLeft:'0.75rem', 
    paddingRight:'0.75rem', 
    overflow: 'hidden'
};

export class VTuidField extends VField {
    protected vForm: VForm;
    protected input: FieldInput;
    protected tuid: Tuid;

    constructor(field:Field, fieldUI: FieldUI, vForm: VForm) {
        super(field, fieldUI, vForm.formValues, vForm.compute, vForm.readOnly);
        this.tuid = field._tuid;
        this.vForm = vForm;
        this.input = vForm.inputs[field.name] as FieldInput;
    }

    onClick = async () => {
        if (this.readOnly === true) {
            //alert('await super.onClick();');
            await this.tuid.showInfo(this.value.id);
            return;
        }
        let id:number;
        if (this.input !== undefined) {
            id = await this.input.call(this.vForm, this.field.tuid, this.vForm.values);
        }
        else {
            alert('call undefined');
            id = 0;
        }
        this.setValue(id);
    }
    protected view = observer(() => {
        let content;
        if (this.value === null)
            content = <>{this.input.nullCaption}</>;
        else if (typeof this.value === 'object') {
            //this.tuid.useId(this.value);
            //let v = this.tuid.valueFromId(this.value);
            //v.templet = this.input.content;
            //content = <this.input.content {...v} />;
            //content = v.content;
            // content = this.tuid.createID(this.value).content();
            content = this.value.content();
        }
        else {
            let idBox = this.tuid.createID(this.value);
            content = idBox.content();
        }
        if (this.readOnly === true) {
            return <div 
                className="form-control form-control-plaintext border border-info rounded bg-light cursor-pointer"
                onClick={this.onClick}>
                {content}
            </div>;
        }
        let redDot;
        let {required} = this.fieldUI;
        if (required === true || this.field.null === false) {
            redDot = <RedMark />;
        }
        return <>
            {redDot}
            <button className="form-control btn btn-outline-info"
                type="button"
                style={buttonStyle}
                onClick={this.onClick}>
                {content}
            </button>
        </>;
    })
}
