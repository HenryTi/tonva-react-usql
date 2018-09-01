import React from "react";
import { List, Muted } from "tonva-react-form";
import { VmEntityLink } from "../link";
export class VmUsq {
    constructor(crUsq) {
        this.isSysVisible = false;
        this.view = () => {
            let { res, api } = this.crUsq;
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
                React.createElement("div", { className: "px-3 py-1 small" }, res.usq || api),
                lists.map(({ cn, header, items }, index) => items.length > 0 && React.createElement(List, { key: index, className: cn, header: React.createElement("div", { className: "px-3 py-1 bg-light" },
                        React.createElement(Muted, null, header)), items: items, item: linkItem })));
        };
        this.crUsq = crUsq;
        let { tuidArr, mapArr, sheetArr, actionArr, queryArr, bookArr } = crUsq.entities;
        this.vmTuidLinks = tuidArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crTuidMain(v)));
        this.vmMapLinks = mapArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crMap(v)));
        this.vmSheetLinks = sheetArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crSheet(v)));
        this.vmActionLinks = actionArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crAction(v)));
        this.vmQueryLinks = queryArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crQuery(v)));
        this.vmBookLinks = bookArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crBook(v)));
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    render() {
        if (this.view === undefined)
            return React.createElement("div", null, "??? viewModel \u5FC5\u987B\u5B9A\u4E49 view ???");
        return React.createElement(this.view);
    }
}
//# sourceMappingURL=vmUsq.js.map