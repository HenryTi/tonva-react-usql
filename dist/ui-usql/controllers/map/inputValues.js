import * as React from 'react';
import { VEntity } from "../VM";
import { Page } from "tonva-tools";
export class VInputValues extends VEntity {
    constructor() {
        super(...arguments);
        this.onValuesSubmit = async () => {
            this.ceasePage();
            let values = this.vForm.getValues();
            this.return(values);
        };
        this.view = () => {
            return React.createElement(Page, null, this.vForm.render());
        };
    }
    async showEntry(param) {
        this.vForm = this.createForm(this.onValuesSubmit);
        this.openPageElement(React.createElement(this.view, null));
    }
}
//# sourceMappingURL=inputValues.js.map