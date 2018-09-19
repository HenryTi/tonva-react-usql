import React from 'react';
import { FieldUI } from '../../formUI';
import { VField } from './vField';
import { Field } from '../../../entities';
import { FormValues } from '../vForm';
import { observer } from 'mobx-react';

export class VComputeField extends VField {
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
