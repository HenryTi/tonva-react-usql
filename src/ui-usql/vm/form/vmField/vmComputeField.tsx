import React from 'react';
import { FieldUI } from '../../formUI';
import { VmField } from './vmField';
import { Field } from '../../../entities';
import { FormValues } from '../vmForm';
import { observer } from 'mobx-react';

export class VmComputeField extends VmField {
    constructor(field: Field, fieldUI: FieldUI, formValues:FormValues) {
        super(field, fieldUI, formValues, undefined, true);
    }
    protected view = observer(() => {
        let value = this.formValues.values[this.field.name];
        return <div 
            className="form-control form-control-plaintext border border-info rounded bg-light cursor-pointer">
            {value} &nbsp;
        </div>;
    });
}
