var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { ViewModel } from "../viewModel";
import { observer } from 'mobx-react';
import { observable } from 'mobx';
export class VmSubmit extends ViewModel {
    constructor(vmForm) {
        super();
        this.view = observer(() => {
            let { onSubmit, isOk } = this.vmForm;
            return React.createElement("button", { type: "button", onClick: onSubmit, className: this.className, disabled: isOk === false }, this.caption);
        });
        this.vmForm = vmForm;
        this.caption = this.vmForm.submitCaption;
        this.className = 'btn btn-primary';
    }
}
__decorate([
    observable
], VmSubmit.prototype, "caption", void 0);
__decorate([
    observable
], VmSubmit.prototype, "className", void 0);
//# sourceMappingURL=vmSubmit.js.map