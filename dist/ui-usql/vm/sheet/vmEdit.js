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
export class VmSheetEdit extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = (values) => {
            alert('not implemented');
            return;
        };
        this.view = () => React.createElement(Page, { header: this.label }, this.vmForm.render());
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vmForm = this.createForm(this.onSubmit, param);
            this.openPage(this.view);
        });
    }
}
//# sourceMappingURL=vmEdit.js.map