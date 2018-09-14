var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import classNames from 'classnames';
export class VmLink {
}
export class VmEntityLink extends VmLink {
    constructor(crEntity) {
        super();
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            yield this.crEntity.start();
        });
        this.view = (className) => {
            let { icon, label } = this.crEntity;
            return React.createElement("div", { className: classNames('px-3', 'py-2', 'align-items-center', 'cursor-pointer', className), onClick: this.onClick },
                icon,
                " \u00A0 ",
                label);
        };
        this.crEntity = crEntity;
    }
    render(className) {
        return React.createElement(this.view, className);
    }
}
//# sourceMappingURL=vmLink.js.map