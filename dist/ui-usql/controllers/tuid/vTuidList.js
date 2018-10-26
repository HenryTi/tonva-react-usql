import * as React from 'react';
import { observer } from 'mobx-react';
import { SearchBox, List } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
import { RowContent } from '../form/viewModel';
export class VTuidMainListBase extends VEntity {
    constructor() {
        super(...arguments);
        this.onSearch = async (key) => {
            await this.controller.searchMain(key);
            //await this.PageItems.first(key);
        };
        this.renderRow = (item, index) => React.createElement(this.rowContent, Object.assign({}, item));
        this.clickRow = (item) => {
            this.callOnSelected(item);
        };
        this.rowKey = (item) => {
            let { id } = item;
            return id;
        };
        this.view = observer(() => {
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
                React.createElement(List, { items: this.controller.PageItems.items, item: { render: this.renderRow, onClick: this.clickRow, key: this.rowKey }, before: '搜索' + this.label + '资料' }));
        });
    }
    async showEntry(param) {
        this.rowContent = this.ui.rowContent || RowContent;
        if (this.entity.owner !== undefined)
            this.ownerId = Number(param);
        // 初始查询, key是空的
        //await this.onSearch('');
        await this.controller.searchMain('');
        this.openPage(this.view);
    }
    callOnSelected(item) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    }
}
export class VTuidMainList extends VTuidMainListBase {
    async onSelected(item) {
        this.event('edit', item.id);
    }
}
export class VTuidDivListBase extends VEntity {
    constructor() {
        super(...arguments);
        this.onSearch = async (key) => {
            await this.controller.searchMain(key);
            //await this.PageItems.first(key);
        };
        this.renderRow = (item, index) => {
            return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
        };
        this.clickRow = (item) => {
            this.callOnSelected(item);
        };
        this.view = observer(() => {
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
                React.createElement(List, { items: this.controller.PageItems.items, item: { render: this.renderRow, onClick: this.clickRow }, before: '搜索' + this.label + '资料' }));
        });
    }
    async showEntry(param) {
        //this.PageItems = new TuidPageItems(this.entity);
        if (this.entity.owner !== undefined)
            this.ownerId = Number(param);
        // 初始查询, key是空的
        //await this.onSearch('');
        await this.controller.searchMain('');
        this.openPage(this.view);
    }
    callOnSelected(item) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    }
}
export class VTuidDivList extends VTuidDivListBase {
    async onSelected(item) {
        this.event('edit', item.id);
    }
}
//# sourceMappingURL=vTuidList.js.map