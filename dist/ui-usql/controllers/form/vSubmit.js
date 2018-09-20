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
export class VSubmit extends ViewModel {
    constructor(vForm) {
        super();
        this.view = observer(() => {
            let { onSubmit, isOk, formValues } = this.vForm;
            return React.createElement("button", { type: "button", onClick: () => onSubmit(formValues.values), className: this.className, disabled: isOk === false }, this.caption);
        });
        this.vForm = vForm;
        this.caption = this.vForm.submitCaption;
        this.className = 'btn btn-primary';
    }
}
__decorate([
    observable
], VSubmit.prototype, "caption", void 0);
__decorate([
    observable
], VSubmit.prototype, "className", void 0);
//# sourceMappingURL=vSubmit.js.map