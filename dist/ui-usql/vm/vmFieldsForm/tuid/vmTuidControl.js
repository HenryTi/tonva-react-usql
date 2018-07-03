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
import { VmTuidPicker } from './vmTuidPicker';
import { VmControl } from '../control';
export class VmTuidControl extends VmControl {
    constructor(fieldUI, formValues, vmApi, tuid, tuidContent, pickerConfig) {
        super(fieldUI, formValues);
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            let typePicker = this.pickerConfig.picker;
            if (typePicker === undefined)
                typePicker = VmTuidPicker;
            let vmTuidPicker = new typePicker(this.vmApi, this.tuid, this);
            yield vmTuidPicker.load();
            nav.push(vmTuidPicker.renderView());
        });
        this.view = TuidControl;
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.pickerConfig = pickerConfig;
        this.onClick = this.onClick.bind(this);
    }
    idChanged(id) {
        this.tuid.useId(id);
        this.value = id;
    }
}
const TuidControl = observer(({ vm }) => {
    let { tuid, value, tuidContent: TuidContent, onClick } = vm;
    let tuidObj = tuid.getId(value);
    let content = !tuidObj ?
        React.createElement(React.Fragment, null,
            "\u70B9\u51FB\u9009\u62E9 ",
            tuid.name) :
        (typeof tuidObj === 'object' ?
            React.createElement(TuidContent, Object.assign({}, tuidObj))
            : React.createElement(TuidContent, { id: value }));
    return React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: { textAlign: 'left', paddingLeft: '0.75rem' }, onClick: onClick }, content);
});
//# sourceMappingURL=vmTuidControl.js.map