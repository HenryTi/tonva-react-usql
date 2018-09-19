var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
export class VActionMain extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            this.returns = yield this.controller.submit(this.vmForm.values);
            this.closePage();
            this.openPage(this.resultPage);
        });
        this.mainPage = () => {
            let { label } = this.controller;
            return React.createElement(Page, { header: label }, this.vmForm.render('mx-3 my-2'));
        };
        this.resultPage = () => {
            let { label } = this.controller;
            return React.createElement(Page, { header: label, back: "close" },
                "\u5B8C\u6210\uFF01",
                React.createElement("pre", null, JSON.stringify(this.returns, undefined, ' ')));
        };
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vmForm = this.createForm(this.onSubmit, param);
            this.openPage(this.mainPage);
        });
    }
}
//# sourceMappingURL=vActionMain.js.map