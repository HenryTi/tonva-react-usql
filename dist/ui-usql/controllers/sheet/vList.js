import * as React from 'react';
import { Page } from 'tonva-tools';
import { List, Muted, LMR, EasyDate } from 'tonva-react-form';
import { VEntity } from '../VM';
export class VSheetList extends VEntity {
    constructor() {
        super(...arguments);
        this.rowClick = async (brief) => {
            if (brief.processing === 1)
                return;
            this.event('action', brief.id);
        };
        this.rowContent = (row) => {
            let { id, no, discription, date, processing } = row;
            let left = React.createElement(React.Fragment, null,
                no,
                " \u00A0 ",
                React.createElement(Muted, null, discription),
                " ",
                processing === 1 ? '...' : '');
            let right = React.createElement(Muted, null,
                React.createElement(EasyDate, { date: date }));
            return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
        };
        this.renderRow = (row, index) => React.createElement(this.row, Object.assign({}, row));
        this.view = () => {
            let sheets = this.entity.stateSheets;
            return React.createElement(Page, { header: this.label + ' - ' + this.stateLabel },
                React.createElement(List, { items: sheets, item: { render: this.renderRow, onClick: this.rowClick } }));
        };
    }
    async showEntry(item) {
        this.row = this.ui.listRow || this.rowContent;
        this.stateName = item.state;
        this.stateLabel = this.controller.getStateLabel(this.stateName);
        await this.entity.getStateSheets(this.stateName, 0, 30);
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vList.js.map