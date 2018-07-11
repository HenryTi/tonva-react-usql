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
import { vmLinkIcon } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmAction } from './vmAction';
export class VmActionMain extends VmAction {
    constructor() {
        super(...arguments);
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            this.returns = yield this.entity.submit(this.vmForm.values);
            this.replacePage(React.createElement(ResultPage, { vm: this }));
        });
        this.view = ActionPage;
    }
    get icon() { return vmLinkIcon('text-success', 'hand-o-right'); }
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.vmForm = this.createVmFieldsForm();
            this.vmForm.onSubmit = this.onSubmit;
        });
    }
}
const ActionPage = observer(({ vm }) => {
    let { label, vmForm } = vm;
    return React.createElement(Page, { header: label }, vmForm.render('mx-3 my-2'));
});
const ResultPage = ({ vm }) => {
    let { label, returns } = vm;
    return React.createElement(Page, { header: label, back: "close" },
        "\u5B8C\u6210\uFF01",
        React.createElement("pre", null, JSON.stringify(returns, undefined, ' ')));
};
//# sourceMappingURL=vmActionMain.js.map