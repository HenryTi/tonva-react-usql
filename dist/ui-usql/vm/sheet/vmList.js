var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page } from 'tonva-tools';
import { List, FA, LMR } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmSheetAction } from './vmSheetAction';
export class VmSheetList extends VmSheet {
    constructor() {
        super(...arguments);
        this.rowClick = (brief) => __awaiter(this, void 0, void 0, function* () {
            if (brief.processing === 1)
                return;
            this.navVm(VmSheetAction, brief);
        });
        this.renderRow = (row, index) => {
            let left = React.createElement(React.Fragment, null,
                row.processing === 1 ? '... ' : '',
                "id:",
                row.id,
                ", no:",
                row.no,
                ", discription:",
                row.discription,
                ", date:",
                row.date);
            let right = React.createElement(FA, { className: "align-self-center", name: "angle-right" });
            return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
        };
        this.view = SheetList;
    }
    beforeStart(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.stateName = item.state;
            this.stateLabel = this.getStateLabel(this.stateName);
            yield this.entity.getStateSheets(this.stateName, 0, 30);
        });
    }
}
const SheetList = ({ vm }) => {
    let { entity, label, stateLabel, renderRow, rowClick } = vm;
    let sheets = entity.stateSheets;
    return React.createElement(Page, { header: label + ' - ' + stateLabel },
        React.createElement(List, { items: sheets, item: { render: renderRow, onClick: rowClick } }));
};
//# sourceMappingURL=vmList.js.map