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
export class Link {
}
export class CrLink extends Link {
    constructor(coordinator) {
        super();
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            yield this.coordinator.start();
        });
        this.view = (className) => {
            return React.createElement("div", { className: classNames('px-3', 'py-2', 'align-items-center', 'cursor-pointer', className), onClick: this.onClick },
                this.icon,
                " \u00A0 ",
                this.label);
        };
        this.coordinator = coordinator;
        this.icon = coordinator.icon;
        this.label = coordinator.label;
    }
    render(className) {
        return React.createElement(this.view, className);
    }
}
//# sourceMappingURL=crLink.js.map