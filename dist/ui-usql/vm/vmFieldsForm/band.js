import * as React from 'react';
export const FieldBand = ({ label, control, field }) => {
    return React.createElement("div", { className: 'form-group row' },
        React.createElement("label", { className: 'col-sm-2 col-form-label' }, label),
        React.createElement("div", { className: "col-sm-10" }, control.renderView()));
};
export const FieldsBand = ({ label, fieldUIs }) => {
    let f0 = fieldUIs[0];
    return React.createElement("div", { className: 'form-group row' },
        React.createElement("label", { className: 'col-sm-2 col-form-label' }, label),
        React.createElement("div", { className: "col-sm-10" }, fieldUIs.map(v => v.control.renderView())));
};
export const ArrBand = ({ label, name, bands, vmList }) => {
    return React.createElement("div", { className: "form-group row flex-column" }, vmList.renderView());
};
export const SubmitBand = ({ content, onSubmit }) => {
    return React.createElement("div", { className: "form-group row" },
        React.createElement("div", { className: "offset-sm-2 col-sm-10" },
            React.createElement("button", { type: "button", onClick: onSubmit, className: "btn btn-primary" }, content)));
};
//# sourceMappingURL=band.js.map