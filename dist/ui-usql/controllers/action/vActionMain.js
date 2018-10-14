import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
export class VActionMain extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = async () => {
            let values = this.vForm.getValues();
            this.returns = await this.controller.submit(values);
            this.closePage();
            this.openPage(this.resultPage);
        };
        this.mainPage = () => {
            let { label } = this.controller;
            return React.createElement(Page, { header: label }, this.vForm.render('mx-3 my-2'));
        };
        this.resultPage = () => {
            let { label } = this.controller;
            return React.createElement(Page, { header: label, back: "close" },
                "\u5B8C\u6210\uFF01",
                React.createElement("pre", null, JSON.stringify(this.returns, undefined, ' ')));
        };
    }
    async showEntry(param) {
        this.vForm = this.createForm(this.onSubmit, param);
        this.openPage(this.mainPage);
    }
}
//# sourceMappingURL=vActionMain.js.map