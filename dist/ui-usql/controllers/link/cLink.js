import * as React from 'react';
import classNames from 'classnames';
export class Link {
}
export class CLink extends Link {
    constructor(controller) {
        super();
        this.onClick = async () => {
            await this.controller.start();
        };
        this.view = (className) => {
            return React.createElement("div", { className: classNames('px-3', 'py-2', 'align-items-center', 'cursor-pointer', className), onClick: this.onClick },
                this.icon,
                " \u00A0 ",
                this.label);
        };
        this.controller = controller;
        this.icon = controller.icon;
        this.label = controller.label;
    }
    render(className) {
        return React.createElement(this.view, className);
    }
}
//# sourceMappingURL=cLink.js.map