import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmSheet } from './vmSheet';
export class VmSheetSchema extends VmSheet {
    constructor() {
        super(...arguments);
        this.view = SchemaPage;
    }
}
const SchemaPage = ({ vm }) => {
    let { label, entity } = vm;
    return React.createElement(Page, { header: label + "模板" },
        React.createElement("pre", { className: "mx-3 my-2" }, JSON.stringify(entity.schema, undefined, ' ')));
};
//# sourceMappingURL=vmSchema.js.map