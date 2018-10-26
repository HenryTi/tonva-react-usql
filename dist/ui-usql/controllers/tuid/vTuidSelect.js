import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
import { SearchBox, List } from 'tonva-react-form';
import React from 'react';
import { RowContent } from '../form/viewModel';
import { observer } from 'mobx-react';
export class VTuidSelect extends VEntity {
    constructor() {
        super(...arguments);
        this.mainView = observer(() => {
            let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: this.onSearchMain, placeholder: '搜索' + this.label });
            return React.createElement(Page, { header: header, back: "close" },
                React.createElement(List, { items: this.controller.PageItems.items, item: { render: this.renderMainRow, onClick: this.clickMainRow }, before: '搜索' + this.label + '资料' }));
        });
        this.onSearchMain = async (key) => {
            await this.controller.searchMain(key);
            //await this.PageItems.first(key);
        };
        this.renderMainRow = (item, index) => React.createElement(this.mainRowContent, Object.assign({}, item));
        this.clickMainRow = async (item) => {
            this.ceasePage();
            if (this.controller.entity.owner === undefined) {
                this.return(item);
                return;
            }
            await this.showDiv(this.entity.getIdFromObj(item));
        };
        this.divView = (param) => {
            return React.createElement(Page, { header: "\u9009\u62E9Div" },
                React.createElement(List, { items: param.items, item: { render: this.renderDivRow, onClick: this.clickDivRow } }));
        };
        this.renderDivRow = (item, index) => React.createElement(this.divRowContent, Object.assign({}, item));
        this.clickDivRow = (item) => {
            this.ceasePage();
            this.return(item);
        };
    }
    async showEntry(param) {
        if (param === undefined)
            await this.showMain(param);
        else
            await this.showDiv(param);
    }
    async showMain(param) {
        this.mainRowContent = this.ui.rowContent || RowContent;
        await this.controller.searchMain(param);
        this.openPage(this.mainView);
    }
    async showDiv(ownerValue) {
        let { divs } = this.ui;
        if (divs !== undefined) {
            this.divRowContent = divs[this.entity.name].rowContent;
        }
        if (this.divRowContent === undefined) {
            this.divRowContent = RowContent;
        }
        let divItems = await this.controller.getDivItems(ownerValue);
        this.openPage(this.divView, { items: divItems });
    }
}
//# sourceMappingURL=vTuidSelect.js.map