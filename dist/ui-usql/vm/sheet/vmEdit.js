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
import { VmSheet } from './vmSheet';
export class VmSheetEdit extends VmSheet {
    constructor() {
        super(...arguments);
        this.view = Edit;
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vmForm = this.createVmFieldsForm();
        });
    }
}
const Edit = ({ vm }) => {
    let { label, vmForm } = vm;
    return React.createElement(Page, { header: label }, vmForm.render());
};
//# sourceMappingURL=vmEdit.js.map