import * as React from 'react';
import { observer } from 'mobx-react';
import { Badge } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted, LMR } from 'tonva-react-form';
import { VEntity } from '../VM';
export class VSheetMain extends VEntity {
    constructor() {
        super(...arguments);
        this.newClick = () => this.event('new');
        this.schemaClick = () => this.event('schema');
        this.archivesClick = () => this.event('archives');
        this.sheetStateClick = (state) => this.event('state', state);
        this.renderState = (item, index) => {
            let { state, count } = item;
            if (count === 0)
                return null;
            let badge = React.createElement(Badge, { className: "ml-5 align-self-end", color: "success" }, count);
            return React.createElement(LMR, { className: "px-3 py-2", left: this.controller.getStateLabel(state), right: badge });
        };
        this.view = observer(() => {
            let list = this.controller.statesCount.filter(row => row.count);
            let right = React.createElement("button", { className: "btn btn-outline-primary", onClick: this.archivesClick }, "\u5DF2\u5F52\u6863");
            let templet;
            if (this.isDev === true) {
                templet = React.createElement("button", { className: "btn btn-primary mr-2", color: "primary", onClick: this.schemaClick }, "\u6A21\u677F");
            }
            return React.createElement(Page, { header: this.label },
                React.createElement(LMR, { className: "mx-3 my-2", right: right },
                    React.createElement("button", { className: "btn btn-primary mr-2", color: "primary", onClick: this.newClick }, "\u65B0\u5EFA"),
                    templet),
                React.createElement(List, { className: "my-2", header: React.createElement(Muted, { className: "mx-3 my-1" },
                        "\u5F85\u5904\u7406",
                        this.label), none: "[ \u65E0 ]", items: list, item: { render: this.renderState, onClick: this.sheetStateClick } }));
        });
    }
    async showEntry() {
        await this.controller.getStateSheetCount();
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vMain.js.map