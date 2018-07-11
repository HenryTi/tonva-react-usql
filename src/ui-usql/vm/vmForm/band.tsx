import * as React from 'react';
import { FA } from 'tonva-react-form';
import { FieldBandUIX, FieldsBandUIX, ArrBandUIX, SubmitBandUIX } from "./formUIX";
import { defaultCreateObservableOptions } from '../../../../node_modules/mobx/lib/api/observable';
import { VmUnknownControl } from './control';

export type TypeFieldBand = ({}:FieldBandUIX) => JSX.Element;
export type TypeFieldsBand = ({}:FieldsBandUIX) => JSX.Element;
export type TypeArrBand = ({}:ArrBandUIX) => JSX.Element;
export type TypeSubmitBand = ({}:SubmitBandUIX) => JSX.Element;

const Unkown = ({name}:{name:string}) => <input type="text" className="form-control" placeholder={'unkown control: ' + name} />
const fieldClassName = ['form-control', 'd-block text-danger'];

export const FieldBand = ({label, control, field}:FieldBandUIX) => {
    return <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>
            {label}
        </label>
        <div className="col-sm-10">
            {control===undefined? <Unkown name={label} /> : control.render(fieldClassName)}
        </div>
    </div>;
}

export const FieldsBand = ({label, fieldUIs}:FieldsBandUIX) => {
    let f0 = fieldUIs[0];
    return <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>
            {label}
        </label>
        <div className="col-sm-10">
            {fieldUIs.map(v => {
                let c = v.control;
                return c===undefined? 
                    <Unkown name={label} /> : 
                    c.render(fieldClassName)
            })}
        </div>
    </div>;
}

export const ArrBand = ({label, name, bands, vmArr}: ArrBandUIX) => {
    return <div className="form-group row flex-column">
        {vmArr && vmArr.render()}
    </div>;
}

export const SubmitBand = ({content, onSubmit, form}: SubmitBandUIX) => {
    let {defaultSubmitCaption, submitCaption, readOnly} = form;
    if (readOnly === true) return null;
    return <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
            <button type="button" onClick={onSubmit} className="btn btn-primary">
                {submitCaption || defaultSubmitCaption}
            </button>
        </div>
    </div>;
}
