var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { VmQuery } from './vmQuery';
export class VmQueryMain extends VmQuery {
    constructor() {
        super(...arguments);
        this.close = () => nav.pop(2);
        this.resultPage = observer(QueryResultPage);
        this.view = QueryPage;
    }
    initValues() {
        this.values = this.buildObservableValues(this.entity.schema.fields);
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.resetPage(30, this.values);
            yield this.entity.loadPage();
            nav.push(React.createElement(this.resultPage, { vm: this }));
        });
    }
    /*
    renderForm(className?:string) {
        let fieldUIs:any[] = undefined;
        let vmForm = this.newVmForm(
            this.entity.schema.fields, fieldUIs, className);
        return vmForm.renderView();
    }*/
    renderExtra() {
        return;
    }
}
export const QueryPage = ({ vm }) => {
    let { caption, values } = vm;
    return React.createElement(Page, { header: caption },
        vm.renderForm('mx-3 my-2'),
        vm.renderExtra());
};
const QueryResultPage = ({ vm }) => {
    let { entity, caption, close } = vm;
    let { name, list } = entity;
    let rightClose = React.createElement("button", { className: "btn btn-outline-secondary btn-sm", onClick: close },
        React.createElement(FA, { name: "close" }));
    return React.createElement(Page, { header: caption || name, right: rightClose },
        React.createElement(List, { items: list, item: {} }));
};
//# sourceMappingURL=vmQueryMain.js.map