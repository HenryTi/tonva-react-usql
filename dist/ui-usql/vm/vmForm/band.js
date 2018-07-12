import * as React from 'react';
import { observer } from 'mobx-react';
const Unkown = ({ name }) => React.createElement("input", { type: "text", className: "form-control", placeholder: 'unkown control: ' + name });
const fieldClassName = ['form-control', 'd-block text-danger small px-2 pt-1'];
export const FieldBand = ({ label, control, field }) => {
    return React.createElement("div", { className: 'form-group row' },
        React.createElement("label", { className: 'col-sm-2 col-form-label' }, label),
        React.createElement("div", { className: "col-sm-10" }, control === undefined ? React.createElement(Unkown, { name: label }) : control.render(fieldClassName)));
};
export const FieldsBand = ({ label, fieldUIs }) => {
    let f0 = fieldUIs[0];
    return React.createElement("div", { className: 'form-group row' },
        React.createElement("label", { className: 'col-sm-2 col-form-label' }, label),
        React.createElement("div", { className: "col-sm-10" }, fieldUIs.map(v => {
            let c = v.control;
            return c === undefined ?
                React.createElement(Unkown, { name: label }) :
                c.render(fieldClassName);
        })));
};
export const ArrBand = ({ label, name, bands, vmArr }) => {
    return React.createElement("div", { className: "form-group row flex-column" }, vmArr && vmArr.render());
};
export const SubmitBand = observer(({ content, onSubmit, form }) => {
    let { defaultSubmitCaption, submitCaption, readOnly, isOk } = form;
    if (readOnly === true)
        return null;
    return React.createElement("div", { className: "form-group row" },
        React.createElement("div", { className: "offset-sm-2 col-sm-10" },
            React.createElement("button", { type: "button", onClick: onSubmit, className: "btn btn-primary", disabled: isOk === false }, submitCaption || defaultSubmitCaption)));
});
//# sourceMappingURL=band.js.map