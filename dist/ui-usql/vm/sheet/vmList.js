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
import { VmEntity } from '../VM';
export class VmSheetList extends VmEntity {
    constructor() {
        super(...arguments);
        this.rowClick = (brief) => __awaiter(this, void 0, void 0, function* () {
            if (brief.processing === 1)
                return;
            this.event('action', brief.id);
            //this.navVm(VmSheetAction, brief.id);
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
        this.view = () => {
            let sheets = this.entity.stateSheets;
            return React.createElement(Page, { header: this.label + ' - ' + this.stateLabel },
                React.createElement(List, { items: sheets, item: { render: this.renderRow, onClick: this.rowClick } }));
        };
    }
    showEntry(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.stateName = item.state;
            this.stateLabel = this.coordinator.getStateLabel(this.stateName);
            yield this.entity.getStateSheets(this.stateName, 0, 30);
        });
    }
}
//# sourceMappingURL=vmList.js.map