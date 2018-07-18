var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
export class VmTuidMain extends VmTuid {
    constructor() {
        super(...arguments);
        this.onNew = () => this.navVm(VmTuidEdit);
        this.onList = () => this.navVm(VmTuidList);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () { return yield this.navVm(VmTuidList, key); });
    }
    entityRender(link, index) {
        return link.render();
    }
    entityClick(link) {
        return __awaiter(this, void 0, void 0, function* () {
            yield link.onClick();
        });
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let { proxies } = this.entity.schema;
            this.view = proxies === undefined ? MainPage : ProxyMainPage;
        });
    }
}
const MainPage = ({ vm }) => {
    let { label, onNew, onList, onSearch } = vm;
    return React.createElement(Page, { header: label },
        React.createElement(SearchBox, { className: "w-100", onSearch: onSearch, placeholder: '搜索' + label }),
        React.createElement("div", { className: 'my-3' },
            React.createElement(Button, { className: "ml-3", color: "primary", onClick: onNew }, "\u65B0\u589E"),
            React.createElement(Button, { className: "ml-3", color: "primary", onClick: onList }, "\u5217\u8868")));
};
const ProxyMainPage = ({ vm }) => {
    let { label, vmApi, entity, entityClick, entityRender } = vm;
    let { proxies } = entity.schema;
    let arr = [];
    for (let i in proxies) {
        arr.push(i);
    }
    return React.createElement(Page, { header: label },
        React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                label,
                " \u4EE3\u7406\u4E0B\u5217Tuid"), items: arr.map(v => vmApi.vmLinkFromName('tuid', v)), item: { render: entityRender, onClick: entityClick } }));
};
//# sourceMappingURL=vmTuidMain.js.map