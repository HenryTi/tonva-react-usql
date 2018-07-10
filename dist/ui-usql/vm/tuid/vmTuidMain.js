import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
import { VmEntityLink } from '../link';
export class VmTuidMain extends VmTuid {
    constructor() {
        super(...arguments);
        this.onNew = () => this.nav(VmTuidEdit);
        this.onList = () => this.nav(VmTuidList);
        this.view = MainPage;
    }
}
const MainPage = ({ vm }) => {
    let { label, onNew, onList } = vm;
    return React.createElement(Page, { header: label },
        "Tuid",
        React.createElement("button", { className: "btn btn-primary", onClick: onNew }, "\u65B0\u5EFA"),
        React.createElement("button", { className: "btn btn-primary", onClick: onList }, "\u5217\u8868"));
};
//{new LinkButton<VmTuidEdit>(new VmTuidEdit(vm.vm), '新建')}
export class LinkButton extends VmEntityLink {
    constructor(vmEntity, caption) {
        super(vmEntity);
        this.view = Button;
        this.caption = caption;
    }
}
const Button = ({ vm }) => {
    let { caption, onClick } = vm;
    return React.createElement("button", { className: "btn btn-primary", onClick: onClick }, caption);
};
//# sourceMappingURL=vmTuidMain.js.map