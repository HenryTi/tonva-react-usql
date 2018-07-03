import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
import { VmEntityLinkBase } from '../link';
export class VmTuidMain extends VmTuid {
    constructor() {
        super(...arguments);
        this.onNew = () => this.nav(VmTuidEdit);
        this.onList = () => this.nav(VmTuidList);
        this.view = MainPage;
    }
}
const MainPage = ({ vm }) => {
    let { caption, onNew, onList } = vm;
    return React.createElement(Page, { header: caption },
        "Tuid",
        React.createElement("button", { className: "btn btn-primary", onClick: onNew }, "\u65B0\u5EFA"),
        React.createElement("button", { className: "btn btn-primary", onClick: onList }, "\u5217\u8868"));
};
const Button = ({ vm }) => {
    let { caption, onClick } = vm;
    return React.createElement("button", { className: "btn btn-primary", onClick: onClick }, caption);
};
//{new LinkButton<VmTuidEdit>(new VmTuidEdit(vm.vm), '新建')}
export class LinkButton extends VmEntityLinkBase {
    constructor(vmEntity, caption) {
        super(vmEntity, Button);
        this.caption = caption;
    }
}
//# sourceMappingURL=vmTuidMain.js.map