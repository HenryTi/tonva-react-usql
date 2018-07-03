import * as React from 'react';
import { List } from 'tonva-react-form';
import { ViewModel } from '../viewModel';
export class VmArrList extends ViewModel {
    constructor(arr, arrValues, arrBandUI) {
        super();
        this.renderItem = (item, index) => {
            return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
        };
        this.itemClick = (item) => {
            alert(JSON.stringify(item));
        };
        this.arr = arr;
        this.arrValues = arrValues;
        this.arrBandUI = arrBandUI;
        this.list = [{ a: 1, b: 2, c: 3 }, { a: 3.3, b: 22, c: 3 }];
    }
    renderView() {
        return React.createElement(List, { header: this.arrBandUI.label, items: this.list, item: { render: this.renderItem, onClick: this.itemClick } });
    }
}
//# sourceMappingURL=vmArrList.js.map