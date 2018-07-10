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
import { Page, nav, PagedItems } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import { RowContent, ViewModel } from '../viewModel';
export class VmPicker extends ViewModel {
    constructor(options) {
        super();
        this.itemRender = (item, index) => React.createElement(this.row, { values: item });
        this.itemClick = (item) => __awaiter(this, void 0, void 0, function* () {
            if (this.onSelected === undefined)
                return;
            nav.pop();
            yield this.onSelected(item);
        });
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
        this.view = Picker;
        let { vmApi, pagedItems, caption, onSelected, row } = options;
        this.vmApi = vmApi;
        this.caption = caption;
        this.pagedItems = pagedItems; // || new PickerPagedItems(tuid);
        this.onSelected = onSelected;
        this.row = row || RowContent;
    }
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onSearch(undefined);
        });
    }
    start(initKey) {
        return __awaiter(this, void 0, void 0, function* () {
            this.initKey = initKey;
            if (this.initKey !== undefined)
                yield this.loadSchema();
            nav.push(this.render());
        });
    }
}
const Picker = observer(({ vm }) => {
    let { caption, initKey, onSearch, itemRender, itemClick } = vm;
    let header = React.createElement(SearchBox, { className: "w-100", onSearch: onSearch, placeholder: caption, initKey: initKey });
    return React.createElement(Page, { header: header },
        React.createElement(List, { items: vm.pagedItems.items, item: { render: itemRender, onClick: itemClick } }));
});
export class VmTuidPicker extends VmPicker {
    constructor(vmApi, caption, tuid, onSelected, row) {
        super({
            vmApi: vmApi,
            pagedItems: new TuidPagedItems(tuid),
            onSelected: onSelected,
            caption: caption,
            row: row || RowContent,
        });
    }
}
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
        else
            this.pageStart = item.id;
    }
}
export class VmQueryPicker extends VmPicker {
    constructor(vmApi, caption, query, onSelected, row) {
        super({
            vmApi: vmApi,
            pagedItems: new QueryPagedItems(query),
            onSelected: onSelected,
            caption: caption,
            row: row || RowContent,
        });
    }
}
class QueryPagedItems extends PagedItems {
    constructor(query) {
        super();
        this.query = query;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.query.page(this.param, this.pageStart, this.pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.id;
    }
}
//# sourceMappingURL=vmPicker.js.map