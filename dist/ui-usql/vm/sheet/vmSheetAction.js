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
import { tonvaDebug } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
import { VmSheet } from './vmSheet';
import { VmView } from './vmView';
export class VmSheetAction extends VmSheet {
    constructor() {
        super(...arguments);
        this.actionClick = (action) => __awaiter(this, void 0, void 0, function* () {
            let { id, flow, state } = this.brief;
            let res = yield this.entity.action(id, flow, state, action.name);
            alert(JSON.stringify(res));
            nav.pop();
        });
        this.view = SheetAction;
    }
    start(inBrief) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.entity.getSheet(inBrief.id);
            let { brief, data: sheetData, flows } = data;
            this.brief = brief;
            this.sheetData = sheetData;
            this.flows = flows;
            this.vmView = new VmView(this.vmApi, this.entity, this.ui, this.sheetData, this.brief.state, flows);
            _super("start").call(this);
        });
    }
}
const SheetAction = ({ vm }) => {
    let { label, entity, brief, actionClick, vmView } = vm;
    let state = brief.state;
    let stateLabel = vm.getStateLabel(state);
    let s = entity.schema.states.find(v => v.name === state);
    let actions = s.actions;
    tonvaDebug();
    return React.createElement(Page, { header: label + ':' + stateLabel + '-' + brief.no },
        React.createElement("div", { className: "my-3" },
            React.createElement("div", { className: "mx-3 mb-3" }, actions.map((v, index) => React.createElement(Button, { key: index, className: "mr-2", color: "primary", onClick: () => actionClick(v) }, vm.getActionLabel(state, v.name)))),
            vmView.render()));
};
//# sourceMappingURL=vmSheetAction.js.map