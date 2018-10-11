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
import { VEntity } from '../VM';
import { FA } from 'tonva-react-form';
export class VSheetNew extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            let values = this.vForm.getValues();
            let ret = yield this.controller.saveSheet(values, this.vForm.values);
            this.ceasePage();
            this.openPage(this.finishedPage);
        });
        this.view = () => React.createElement(Page, { header: this.label }, this.vForm.render());
        this.restart = () => __awaiter(this, void 0, void 0, function* () {
            this.ceasePage();
            yield this.event('new');
        });
        this.finishedPage = () => {
            return React.createElement(Page, { header: "\u5DF2\u4FDD\u5B58", back: "close" },
                React.createElement("div", { className: "p-3 d-flex flex-column align-items-center" },
                    React.createElement("div", { className: "text-success" },
                        React.createElement(FA, { name: "check-circle-o" }),
                        " \u6210\u529F"),
                    React.createElement("div", { className: "p-3" },
                        React.createElement("button", { className: "btn btn-sm btn-primary", onClick: this.restart }, "\u7EE7\u7EED\u5F00\u5355"),
                        React.createElement("button", { className: "ml-3 btn btn-sm btn-outline-info", onClick: () => this.backPage() }, "\u8FD4\u56DE"))));
        };
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vForm = this.createForm(this.onSubmit, param);
            this.openPage(this.view);
        });
    }
}
//# sourceMappingURL=vNew.js.map