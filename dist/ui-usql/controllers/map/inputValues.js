import * as React from 'react';
import { VEntity } from "../VM";
import { Page } from "tonva-tools";
export class VInputValues extends VEntity {
    constructor() {
        super(...arguments);
        this.view = () => {
            return React.createElement(Page, null, this.controller.vForm.render());
        };
    }
    async showEntry(param) {
        this.controller.vForm.reset();
        this.openPageElement(React.createElement(this.view, null));
    }
}
//# sourceMappingURL=inputValues.js.map