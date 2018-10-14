import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
export class VSheetNew extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = async () => {
            let values = this.vForm.getValues();
            let valuesWithBox = this.vForm.values;
            //let ret = 
            await this.controller.onSave(values, valuesWithBox);
            /*
            this.ceasePage();
            //this.openPage(this.finishedPage);
            await this.controller.showSaved(ret);
            */
        };
        this.view = () => React.createElement(Page, { header: this.label }, this.vForm.render());
    }
    async showEntry(param) {
        this.vForm = this.createForm(this.onSubmit, param);
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vNew.js.map