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
import { VmView } from './vmView';
import { VmEntity } from '../VM';
export class VmArchived extends VmEntity {
    constructor() {
        super(...arguments);
        this.view = () => {
            return React.createElement(Page, { header: this.label + ':' + '-' + this.brief.no }, this.vmView.render());
        };
    }
    showEntry(inBrief) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.entity.getArchive(inBrief.id);
            let { brief, data: sheetData, flows } = data;
            this.brief = brief;
            this.vmView = new VmView(this.coordinator, sheetData, this.brief.state, flows);
            this.open(this.view);
        });
    }
}
//# sourceMappingURL=vmArchived.js.map