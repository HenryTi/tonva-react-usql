var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button, Badge } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted, LMR } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmSheetNew } from './vmNew';
import { VmSheetEdit } from './vmEdit';
import { VmSheetList } from './vmList';
import { VmSheetSchema } from './vmSchema';
import { VmArchives } from './vmArchives';
export class VmSheetMain extends VmSheet {
    constructor() {
        super(...arguments);
        this.vmNew = VmSheetNew;
        this.vmEdit = VmSheetEdit;
        this.vmSchema = VmSheetSchema;
        this.vmArchives = VmArchives;
        this.vmSheetList = VmSheetList;
        this.newClick = () => __awaiter(this, void 0, void 0, function* () {
            let t = (this.ui && this.ui.new) || this.vmNew;
            yield this.nav(t);
        });
        this.schemaClick = () => __awaiter(this, void 0, void 0, function* () { return yield this.nav(this.vmSchema); });
        this.archivesClick = () => __awaiter(this, void 0, void 0, function* () { return yield this.nav(this.vmArchives); });
        this.sheetStateClick = (state) => __awaiter(this, void 0, void 0, function* () { return yield this.nav(this.vmSheetList, state); });
        this.renderState = (item, index) => {
            let { state, count } = item;
            let stateName = state === '$' ? '新单' : state;
            let badge = React.createElement(Badge, { className: "ml-5 align-self-end", color: "success" }, count);
            return React.createElement(LMR, { className: "px-3 py-2", left: stateName, right: badge });
        };
        this.view = Main;
    }
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.getStateSheetCount();
        });
    }
}
const Main = ({ vm }) => {
    let { label, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick } = vm;
    return React.createElement(Page, { header: label },
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: newClick }, "\u65B0\u5EFA"),
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: schemaClick }, "\u6A21\u677F")),
        React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                "\u5F85\u5904\u7406",
                label), none: "[ \u65E0 ]", items: entity.statesCount.filter(row => row.count), item: { render: renderState, onClick: sheetStateClick } }),
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { color: "primary", onClick: archivesClick },
                "\u5DF2\u5F52\u6863",
                label)));
};
//# sourceMappingURL=vmMain.js.map