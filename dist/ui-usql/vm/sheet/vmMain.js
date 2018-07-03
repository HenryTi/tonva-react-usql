var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmEdit } from './vmEdit';
import { VmSchema } from './vmSchema';
import { VmArchives } from './vmArchives';
export class VmSheetMain extends VmSheet {
    constructor() {
        super(...arguments);
        this.vmEdit = VmEdit;
        this.vmSchema = VmSchema;
        this.vmArchives = VmArchives;
        this.vmSheetState = VmEdit;
        this.newClick = () => __awaiter(this, void 0, void 0, function* () { return yield this.nav(this.vmEdit); });
        this.schemaClick = () => __awaiter(this, void 0, void 0, function* () { return yield this.nav(this.vmSchema); });
        this.archivesClick = () => __awaiter(this, void 0, void 0, function* () { return yield this.nav(this.vmArchives); });
        this.sheetStateClick = () => __awaiter(this, void 0, void 0, function* () { return yield this.nav(this.vmSheetState); });
        this.renderState = (item, index) => {
            return React.createElement("div", null);
        };
        this.view = Main;
    }
}
const Main = ({ vm }) => {
    let { caption, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick } = vm;
    return React.createElement(Page, { header: caption },
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: newClick }, "\u65B0\u5EFA"),
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: schemaClick }, "\u6A21\u677F")),
        React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                "\u5F85\u5904\u7406",
                caption), none: "[ \u65E0 ]", items: entity.statesCount.filter(row => row.count), item: { render: renderState, onClick: sheetStateClick } }),
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { color: "primary", onClick: archivesClick },
                "\u5DF2\u5F52\u6863",
                caption)));
};
//# sourceMappingURL=vmMain.js.map