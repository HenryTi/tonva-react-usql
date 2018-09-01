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
import { VmEntity } from '../VM';
export class VmTuidListBase extends VmEntity {
    constructor() {
        super(...arguments);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
        this.renderRow = (item, index) => {
            return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
        };
        this.clickRow = (item) => {
            this.callOnSelected(item);
        };
        this.view = observer(() => {
            //let {label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId} = vm;
            let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: this.onSearch, placeholder: '搜索' + this.label });
            let { owner } = this.entity;
            let ownerTop;
            if (owner !== undefined) {
                let ownerObj = owner.valueFromId(this.ownerId);
                ownerTop = React.createElement("div", null,
                    "owner: ",
                    JSON.stringify(ownerObj));
            }
            return React.createElement(Page, { header: header },
                ownerTop,
                React.createElement(List, { items: this.pagedItems.items, item: { render: this.renderRow, onClick: this.clickRow }, before: '搜索' + this.label + '资料' }));
        });
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pagedItems = new TuidPagedItems(this.entity);
            this.param = param;
            if (this.entity.owner !== undefined)
                this.ownerId = Number(param);
            // 初始查询, key是空的
            yield this.onSearch('');
            this.open(this.view);
        });
    }
    callOnSelected(item) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    }
}
const Row = (item) => React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
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
export class VmTuidList extends VmTuidListBase {
    onSelected(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.event('edit', item.id);
        });
    }
}
//# sourceMappingURL=vmTuidList.js.map