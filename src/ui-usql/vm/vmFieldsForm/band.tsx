import * as React from 'react';
import { FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI } from "./formUI";

export type TypeFieldBand = ({}:FieldBandUI) => JSX.Element;
export type TypeFieldsBand = ({}:FieldsBandUI) => JSX.Element;
export type TypeArrBand = ({}:ArrBandUI) => JSX.Element;
export type TypeSubmitBand = ({}:SubmitBandUI) => JSX.Element;

export const FieldBand = ({label, control, field}:FieldBandUI) => {
    return <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>
            {label}
        </label>
        <div className="col-sm-10">
            {control.renderView()}
        </div>
    </div>;
}

export const FieldsBand = ({label, fieldUIs}:FieldsBandUI) => {
    let f0 = fieldUIs[0];
    return <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>
            {label}
        </label>
        <div className="col-sm-10">
            {fieldUIs.map(v => v.control.renderView())}
        </div>
    </div>;
}

export const ArrBand = ({label, name, bands, vmList}: ArrBandUI) => {
    return <div className="form-group row flex-column">
        {vmList.renderView()}
    </div>;
}

export const SubmitBand = ({content, onSubmit}: SubmitBandUI) => {
    return <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
            <button type="button" onClick={onSubmit} className="btn btn-primary">
                {content}
            </button>
        </div>
    </div>;
}
