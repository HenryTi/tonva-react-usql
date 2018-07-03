import * as React from 'react';
import { List, Muted, EasyDate, FA } from 'tonva-react-form';
import { VmEntity, vmLinkIcon } from '../entity';
export class VmSheet extends VmEntity {
    constructor(vmApi, sheet) {
        super(vmApi, sheet);
        this.typeFlowRow = FlowRow;
        this.flowRow = (item, index) => React.createElement(this.typeFlowRow, { item: item });
        this.typeSheetView = SheetView;
    }
    get icon() { return vmLinkIcon('text-primary', 'wpforms'); }
}
const FlowRow = (item) => {
    let { date, user, preState, state, action } = item;
    if (action === undefined)
        action = React.createElement(React.Fragment, null,
            React.createElement(FA, { className: "text-primary", name: "pencil-square-o" }),
            " \u5236\u5355");
    let to;
    switch (state) {
        case '$': break;
        case '#':
            to = React.createElement(React.Fragment, null,
                React.createElement(FA, { className: "text-success", name: "file-archive-o" }));
            break;
        default:
            to = React.createElement(React.Fragment, null,
                React.createElement(FA, { className: "text-muted", name: "arrow-right" }),
                " \u00A0 ",
                state);
            break;
    }
    return React.createElement("div", { className: "row" },
        React.createElement("div", { className: "col-sm" },
            React.createElement("div", { className: "pl-3 py-2" }, action)),
        React.createElement("div", { className: "col-sm" },
            React.createElement("div", { className: "p-2" }, to)),
        React.createElement("div", { className: "col-sm text-right" },
            React.createElement("div", { className: "p-2" },
                React.createElement(Muted, null,
                    React.createElement(EasyDate, { date: date })))));
};
const SheetView = ({ vm }) => {
    let { className, sheetState, data, flows, flowRow } = vm;
    let removed;
    if (sheetState === '-')
        removed = React.createElement("div", { className: "mx-3 my-2", style: { color: 'red' } }, "\u672C\u5355\u636E\u4F5C\u5E9F");
    let flow = React.createElement(List, { header: React.createElement(Muted, null, "\u6D41\u7A0B"), items: flows, item: { render: flowRow } });
    return React.createElement("div", { className: className },
        removed,
        "/* ddd */",
        flow);
};
/*
<MainDetailsView
ui={ui}
mainDetails={this.mainDetails}
values={data} />
*/ 
//# sourceMappingURL=vmSheet.js.map