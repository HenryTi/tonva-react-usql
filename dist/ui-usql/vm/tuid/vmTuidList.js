var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { SearchBox, List } from 'tonva-react-form';
import { Page, PagedItems } from 'tonva-tools';
import { VmTuid } from './vmTuid';
export class VmTuidList extends VmTuid {
    constructor() {
        super(...arguments);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
        this.renderRow = (item, index) => {
            return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
        };
        this.rowClick = (item) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.entity.load(item.id);
            alert('edit');
        });
    }
    init() {
        this.pagedItems = new TuidPagedItems(this.entity);
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onSearch(undefined);
        });
    }
    render() {
        return React.createElement(TuidListPage, { vm: this });
    }
}
const Row = (item) => React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
let TuidListPage = class TuidListPage extends React.Component {
    render() {
        let { vm } = this.props;
        let { label } = this.props.vm;
        let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: vm.onSearch, placeholder: '搜索' + label });
        return React.createElement(Page, { header: header },
            React.createElement(List, { items: vm.pagedItems.items, item: { render: vm.renderRow, onClick: vm.rowClick }, before: '搜索' + label + '资料' }));
    }
};
TuidListPage = __decorate([
    observer
], TuidListPage);
export { TuidListPage };
class TuidPagedItems extends PagedItems {
    constructor(tuid) {
        super();
        this.tuid = tuid;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tuid.search(this.param, this.pageStart, this.pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
//# sourceMappingURL=vmTuidList.js.map