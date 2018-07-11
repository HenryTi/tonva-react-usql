var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { List, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VmQuery } from './vmQuery';
export class VmQueryMain extends VmQuery {
    constructor() {
        super(...arguments);
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            yield this.entity.resetPage(30, this.vmForm.values);
            yield this.entity.loadPage();
            this.replacePage(React.createElement(QueryResultPage, { vm: this }));
        });
        this.again = () => {
            this.vmForm.reset();
            this.replacePage(React.createElement(QueryPage, { vm: this }));
        };
        this.view = QueryPage;
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vmForm = this.createVmFieldsForm();
            this.vmForm.onSubmit = this.onSubmit;
        });
    }
    renderExtra() {
        return;
    }
}
export const QueryPage = ({ vm }) => {
    let { label, vmForm } = vm;
    return React.createElement(Page, { header: label },
        vmForm.render('mx-3 my-2'),
        vm.renderExtra());
};
const QueryResultPage = ({ vm }) => {
    let { entity, label, again } = vm;
    let { name, list } = entity;
    let rightClose = React.createElement("button", { className: "btn btn-outline-success btn-sm", onClick: again },
        React.createElement(FA, { name: "search" }),
        " \u518D\u67E5\u8BE2");
    return React.createElement(Page, { header: label, right: rightClose },
        React.createElement(List, { items: list, item: {} }));
};
//# sourceMappingURL=vmQueryMain.js.map