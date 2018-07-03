var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { nav } from 'tonva-tools';
import { ViewModel } from '../viewModel';
export class VmLink extends ViewModel {
}
export class VmEntityLinkBase extends VmLink {
    constructor(vmEntity, link) {
        super();
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            yield this.vmEntity.load();
            nav.push(this.vmEntity.renderView());
        });
        this.vmEntity = vmEntity;
        this.view = link;
    }
}
export class VmEntityLink extends VmEntityLinkBase {
    constructor(vmEntity) {
        super(vmEntity, Link);
    }
}
const Link = ({ vm }) => {
    let { vmEntity } = vm;
    return React.createElement("div", { className: "px-3 py-2  align-items-center" },
        vmEntity.icon,
        " \u00A0 ",
        vmEntity.caption);
};
//# sourceMappingURL=vmLink.js.map