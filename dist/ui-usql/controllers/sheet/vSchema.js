import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
export class VSheetSchema extends VEntity {
    constructor() {
        super(...arguments);
        this.view = () => React.createElement(Page, { header: this.label + "模板" },
            React.createElement("pre", { className: "mx-3 my-2" }, this.entity.schemaStringify()));
    }
    async showEntry(param) {
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vSchema.js.map