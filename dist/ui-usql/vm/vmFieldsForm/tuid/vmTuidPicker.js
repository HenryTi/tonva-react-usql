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
import { VmTuid } from '../../tuid/vmTuid';
import { RowContent } from '../../viewModel';
export class VmTuidPicker extends VmTuid {
    constructor(vmApi, tuid, vmTuidControl, pagedItems) {
        super(vmApi, tuid);
        this.itemRender = (item, index) => React.createElement(this.row, { values: item });
        this.itemClick = (item) => {
            let id = this.idFromValue(item);
            this.vmTuidControl.idChanged(id);
            nav.pop();
        };
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
        this.view = Picker;
        this.vmTuidControl = vmTuidControl;
        this.pagedItems = pagedItems || new PickerPagedItems(tuid);
        let pc = this.vmTuidControl.pickerConfig;
        this.row = pc.row || RowContent;
        this.idFromValue = pc.idFromValue;
        if (this.idFromValue === undefined)
            this.idFromValue = (values) => values.id;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onSearch(undefined);
        });
    }
}
class PickerPagedItems extends PagedItems {
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
const Picker = observer(({ vm }) => {
    let { onSearch, itemRender, itemClick } = vm;
    let header = React.createElement(SearchBox, { className: "w-100", onSearch: onSearch, placeholder: '搜索 - ' + vm.entity.name });
    return React.createElement(Page, { header: header },
        React.createElement(List, { items: vm.pagedItems.items, item: { render: itemRender, onClick: itemClick } }));
});
//# sourceMappingURL=vmTuidPicker.js.map