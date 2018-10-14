import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
export class VBookMain extends VEntity {
    constructor() {
        super(...arguments);
        this.view = () => React.createElement(Page, { header: this.label }, "Book");
    }
    async showEntry(param) {
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vBookMain.js.map