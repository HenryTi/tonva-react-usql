import * as React from 'react';
import { Page } from 'tonva-tools';
import { FormMode } from '../form';
import { VSheetView } from './vSheetView';
export class VSheetEdit extends VSheetView {
    constructor() {
        super(...arguments);
        this.onSubmit = async () => {
            let values = this.vForm.getValues();
            await this.controller.saveSheet(values, this.vForm.values);
            this.closePage();
            this.return(this.vForm.values);
        };
        this.view = () => React.createElement(Page, { header: this.label }, this.vForm.render());
    }
    async showEntry(param) {
        this.sheetData = param;
        this.vForm = this.createForm(this.onSubmit, param.data, FormMode.edit);
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vEdit.js.map