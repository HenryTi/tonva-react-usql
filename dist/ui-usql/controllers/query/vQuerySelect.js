import * as React from 'react';
import { SearchBox, List } from 'tonva-react-form';
import { Page, PageItems } from 'tonva-tools';
import { VEntity } from '../VM';
import { DefaultRow } from './defaultRow';
export class VQuerySelect extends VEntity {
    constructor() {
        super(...arguments);
        this.onSearch = async (key) => {
            await this.PageItems.first(key);
        };
        this.renderRow = (item, index) => React.createElement(this.row, Object.assign({}, item));
        this.clickRow = (item) => {
            this.callOnSelected(item);
        };
        this.view = () => {
            let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: this.onSearch, placeholder: '搜索' + this.label });
            return React.createElement(Page, { header: header },
                React.createElement(List, { items: this.PageItems.items, item: { render: this.renderRow, onClick: this.clickRow }, before: '搜索' + this.label + '资料' }));
        };
    }
    async showEntry(param) {
        let { row, selectRow } = this.ui;
        this.row = selectRow || row || DefaultRow;
        //this.entity = this.controller.entity;
        this.PageItems = new QueryPageItems(this.entity);
        await this.onSearch(param);
        this.openPage(this.view);
    }
    callOnSelected(item) {
        this.closePage();
        this.return(item);
    }
}
export class QueryPageItems extends PageItems {
    constructor(query) {
        super();
        this.query = query;
    }
    async load() {
        await this.query.loadSchema();
        let ret;
        if (this.query.isPaged === true)
            ret = await this.query.page(this.param, this.pageStart, this.pageSize);
        else {
            let data = await this.query.query(this.param);
            //let data = await this.query.unpackReturns(res);
            ret = data[this.query.returns[0].name];
        }
        return ret;
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
//# sourceMappingURL=vQuerySelect.js.map