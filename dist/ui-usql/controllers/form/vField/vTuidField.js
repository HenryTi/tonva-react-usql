var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { VField, RedMark } from "./vField";
const buttonStyle = {
    textAlign: 'left',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    overflow: 'hidden'
};
export class VTuidField extends VField {
    constructor(field, fieldUI, vForm) {
        super(field, fieldUI, vForm.formValues, vForm.compute, vForm.readOnly);
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            if (this.readOnly === true) {
                //alert('await super.onClick();');
                yield this.tuid.showInfo(this.value.id);
                return;
            }
            let id;
            if (this.input !== undefined) {
                id = yield this.input.call(this.vForm, this.field.tuid, this.vForm.values);
            }
            else {
                alert('call undefined');
                id = 0;
            }
            this.setValue(id);
        });
        this.view = observer(() => {
            let content;
            if (this.value === null)
                content = React.createElement(React.Fragment, null, this.input.nullCaption);
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
                return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer", onClick: this.onClick }, content);
            }
            let redDot;
            let { required } = this.fieldUI;
            if (required === true || this.field.null === false) {
                redDot = React.createElement(RedMark, null);
            }
            return React.createElement(React.Fragment, null,
                redDot,
                React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: buttonStyle, onClick: this.onClick }, content));
        });
        this.tuid = field._tuid;
        this.vForm = vForm;
        this.input = vForm.inputs[field.name];
    }
}
//# sourceMappingURL=vTuidField.js.map