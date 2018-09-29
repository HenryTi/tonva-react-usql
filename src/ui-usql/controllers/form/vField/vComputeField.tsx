import React from 'react';
import { FieldUI } from '../../formUI';
import { VField } from './vField';
import { Field } from '../../../entities';
import { FormValues } from '../vForm';
import { observer } from 'mobx-react';
import { FieldRes } from '../vBand';

export class VComputeField extends VField {
    constructor(field: Field, fieldUI: FieldUI, fieldRes: FieldRes, formValues:FormValues) {
        super(field, fieldUI, fieldRes, formValues, undefined, true);
    }
    protected view = observer(() => {
        let value = this.formValues.values[this.field.name];
        let {placeHolder, suffix} = this.fieldRes;
        let ctrlCN = 'form-control form-control-input bg-light';
        if (value === null) value = '';
        let input = <input className={ctrlCN}
            type="text"
            placeholder={placeHolder}
            readOnly={true}
            value={value}/>
        let inputGroup;
        if (suffix === undefined)
            inputGroup = input;
        else
            inputGroup = <div className="input-group">
                {input}
                <div className="input-group-append">
                    <span className="input-group-text">{suffix}</span>
                </div>
            </div>;
        return inputGroup;
        /*
            return <div 
            className="form-control form-control-plaintext border border-info rounded bg-light cursor-pointer">
            {value} &nbsp;
        </div>;
        */
    });
}
