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
import { nav, Page, PagedItems } from 'tonva-tools';
import { SearchBox, List } from 'tonva-react-form';
import { EditPage } from './editPage';
class TuidPagedItems extends PagedItems {
    constructor(tuidUI) {
        super();
        this.tuidUI = tuidUI;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tuidUI.entity.search(this.param, this.pageStart, this.pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
let ListPage = class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.pagedItems = new TuidPagedItems(this.props.ui);
        this.onSearch = this.onSearch.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowClick = this.rowClick.bind(this);
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onSearch(this.props.data);
        });
    }
    onSearch(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
    }
    renderRow(item, index) {
        return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
    }
    rowClick(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui } = this.props;
            let data = yield ui.entity.load(item.id);
            nav.push(React.createElement(EditPage, { ui: ui, data: data }));
        });
    }
    render() {
        let { data: initKey, ui } = this.props;
        let { entity, caption } = ui;
        let { name, schema } = entity;
        caption = caption || name;
        let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: initKey, onSearch: this.onSearch, placeholder: '搜索' + caption });
        return React.createElement(Page, { header: header },
            React.createElement(List, { items: this.pagedItems.items, item: { render: this.renderRow, onClick: this.rowClick }, before: '搜索' + caption + '资料' }));
    }
};
ListPage = __decorate([
    observer
], ListPage);
export { ListPage };
//# sourceMappingURL=listPage.js.map