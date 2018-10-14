import * as React from 'react';
import { Page } from 'tonva-tools';
import { VSheetView } from './vSheetView';
export class VArchived extends VSheetView {
    constructor() {
        //protected controller: CSheet;
        //brief: any;
        super(...arguments);
        this.view = () => {
            let { brief } = this.sheetData;
            return React.createElement(Page, { header: this.label + ':' + '-' + brief.no },
                React.createElement(this.sheetView, null));
        };
    }
    async showEntry(sheetData) {
        this.sheetData = sheetData;
        /*
        let {brief, data, flows} = await this.controller.getArchived(inBrief.id);
        this.brief = brief;
        this.data = data;
        this.flows = flows;
        */
        this.vForm = this.createForm(undefined, this.sheetData.data);
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vArchived.js.map