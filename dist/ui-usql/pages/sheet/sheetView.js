import * as React from 'react';
import { List, Muted, EasyDate, FA } from 'tonva-react-form';
import { MainDetailsView } from '../tools';
export class SheetView extends React.Component {
    constructor(props) {
        super(props);
        let { ui } = this.props;
        this.mainDetails = ui.mapMainDetails();
        this.flowRow = this.flowRow.bind(this);
    }
    flowRow(item, index) {
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
    }
    render() {
        let { className, ui, sheetState, sheetData, flows } = this.props;
        let { entity: sheet } = ui;
        let removed;
        if (sheetState === '-')
            removed = React.createElement("div", { className: "mx-3 my-2", style: { color: 'red' } }, "\u672C\u5355\u636E\u4F5C\u5E9F");
        let flow = React.createElement(List, { header: React.createElement(Muted, null, "\u6D41\u7A0B"), items: flows, item: { render: this.flowRow } });
        return React.createElement("div", { className: className },
            removed,
            React.createElement(MainDetailsView, { ui: ui, mainDetails: this.mainDetails, values: sheetData }),
            flow);
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/ 
//# sourceMappingURL=sheetView.js.map