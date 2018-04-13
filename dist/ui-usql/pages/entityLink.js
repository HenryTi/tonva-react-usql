import * as React from 'react';
import { FA } from 'tonva-react-form';
export class EntityLink extends React.Component {
    render() {
        let { ui } = this.props;
        let { caption, entitySet } = ui;
        return React.createElement("div", { className: "px-3 py-2 d-flex align-items-center" },
            React.createElement(FA, { className: "text-info", size: "lg", name: ui.icon || entitySet.icon, fixWidth: true }),
            React.createElement("span", null,
                "\u00A0\u00A0\u00A0\u00A0",
                caption));
    }
}
//# sourceMappingURL=entityLink.js.map