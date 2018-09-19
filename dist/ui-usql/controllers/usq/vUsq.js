import React from "react";
import { List, Muted } from "tonva-react-form";
import { CLink } from "../link";
import { View } from "tonva-tools";
export class VUsq extends View {
    constructor(crUsq) {
        super(crUsq);
        //protected crUsq: CUsq;
        this.isSysVisible = false;
        this.view = () => {
            let { res, usq } = this.controller;
            let linkItem = {
                render: (vmLink, index) => vmLink.render(),
                onClick: undefined,
            };
            let lists = [
                {
                    header: res.tuid || 'TUID',
                    items: this.vmTuidLinks,
                },
                {
                    cn: 'my-2',
                    header: res.map || 'MAP',
                    items: this.vmMapLinks,
                },
                {
                    cn: 'my-2',
                    header: res.sheet || 'SHEET',
                    items: this.vmSheetLinks
                },
                {
                    cn: 'my-2',
                    header: res.action || 'ACTION',
                    items: this.vmActionLinks
                },
                {
                    cn: 'my-2',
                    header: res.query || 'QUERY',
                    items: this.vmQueryLinks
                },
                {
                    cn: 'mt-2 mb-4',
                    header: res.book || 'BOOK',
                    items: this.vmBookLinks
                }
            ];
            return React.createElement(React.Fragment, null,
                React.createElement("div", { className: "px-3 py-1 small" }, res.usq || usq),
                lists.map(({ cn, header, items }, index) => items.length > 0 && React.createElement(List, { key: index, className: cn, header: React.createElement("div", { className: "px-3 py-1 bg-light" },
                        React.createElement(Muted, null, header)), items: items, item: linkItem })));
        };
        //this.crUsq = crUsq;
        let { tuidArr, mapArr, sheetArr, actionArr, queryArr, bookArr } = crUsq.entities;
        this.vmTuidLinks = tuidArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crTuidMain(v)));
        this.vmMapLinks = mapArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crMap(v)));
        this.vmSheetLinks = sheetArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crSheet(v)));
        this.vmActionLinks = actionArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crAction(v)));
        this.vmQueryLinks = queryArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crQuery(v)));
        this.vmBookLinks = bookArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crBook(v)));
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    render(param) {
        if (this.view === undefined)
            return React.createElement("div", null, "??? viewModel \u5FC5\u987B\u5B9A\u4E49 view ???");
        return React.createElement(this.view);
    }
}
//# sourceMappingURL=vUsq.js.map