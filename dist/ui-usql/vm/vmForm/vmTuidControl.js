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
import { nav } from 'tonva-tools';
//import { VmTuidPicker, TypeVmTuidPicker } from './vmTuidPicker';
import { VmTuidPicker } from './vmPicker';
import { VmControl, RedMark } from './control';
export class VmTuidControl extends VmControl {
    constructor(fieldUI, formValues, vmApi, tuid, tuidContent, pickerConfig) {
        super(fieldUI, formValues);
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            if (this.readOnly === true) {
                let vm = this.vmApi.newVmTuidView(this.tuid);
                if (this.value !== undefined)
                    yield vm.start(this.value);
                return;
            }
            let typePicker = this.pickerConfig.picker;
            if (typePicker === undefined)
                typePicker = VmTuidPicker;
            let vmTuidPicker = new typePicker(this.vmApi, '搜索 - ' + this.tuid.name, this.tuid, this.onSelected, this.pickerConfig && this.pickerConfig.row);
            yield vmTuidPicker.loadSchema();
            nav.push(vmTuidPicker.render());
        });
        this.onSelected = (item) => __awaiter(this, void 0, void 0, function* () {
            this.setValue(item.id);
        });
        /*
        idChanged(id:number) {
            this.tuid.useId(id);
            this.value = id;
        }*/
        this.view = TuidControl;
        this.vmApi = vmApi;
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.pickerConfig = pickerConfig;
        this.onClick = this.onClick.bind(this);
        this.setValue(formValues.values[this.name]);
        //if (id !== null) this.idChanged(id);
    }
    setValue(id) {
        this.tuid.useId(id);
        this.value = id;
    }
}
const buttonStyle = {
    textAlign: 'left',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    overflow: 'hidden'
};
const TuidControl = observer(({ vm }) => {
    let { tuid, value, fieldUI, tuidContent: TuidContent, onClick, readOnly } = vm;
    tuid.useId(value);
    let tuidObj = tuid.getId(value);
    let content = !tuidObj ?
        React.createElement(React.Fragment, null,
            "\u70B9\u51FB\u9009\u62E9 ",
            tuid.name) :
        (typeof tuidObj === 'object' ?
            React.createElement(TuidContent, Object.assign({}, tuidObj))
            : React.createElement(TuidContent, { id: value }));
    if (readOnly === true) {
        return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer", onClick: onClick }, content);
    }
    let redDot;
    let { field, required } = fieldUI;
    if (required === true || field.null === false) {
        redDot = React.createElement(RedMark, null);
    }
    return React.createElement(React.Fragment, null,
        redDot,
        React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: buttonStyle, onClick: onClick }, content));
});
//# sourceMappingURL=vmTuidControl.js.map