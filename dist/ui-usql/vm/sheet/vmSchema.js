import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmSheet } from './vmSheet';
export class VmSchema extends VmSheet {
    constructor() {
        super(...arguments);
        this.view = SchemaPage;
    }
}
const SchemaPage = ({ vm }) => {
    let { caption, entity } = vm;
    return React.createElement(Page, { header: caption + "模板" },
        React.createElement("pre", { className: "mx-3 my-2" }, JSON.stringify(entity.schema, undefined, ' ')));
};
//# sourceMappingURL=vmSchema.js.map