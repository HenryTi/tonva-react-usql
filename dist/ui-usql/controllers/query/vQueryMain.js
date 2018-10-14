import * as React from 'react';
import { observer } from 'mobx-react';
import { List, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
import { DefaultRow } from './defaultRow';
export class VQueryMain extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = async () => {
            let params = this.vForm.getValues();
            if (this.entity.isPaged === true) {
                await this.entity.resetPage(30, params);
                await this.entity.loadPage();
                this.replacePage(this.pageResult);
            }
            else {
                let data = await this.entity.query(params);
                this.replacePage(this.queryResult, data);
            }
        };
        this.again = () => {
            this.vForm.reset();
            this.replacePage(this.view);
        };
        this.renderRow = (item, index) => React.createElement(this.row, Object.assign({}, item));
        this.view = () => React.createElement(Page, { header: this.label },
            this.vForm.render('mx-3 my-2'),
            this.renderExtra());
        this.pageResult = () => {
            let { name, list } = this.entity;
            let rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: this.label, right: rightClose },
                React.createElement(List, { items: list, item: { render: this.renderRow } }));
        };
        this.queryResult = observer((result) => {
            let rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: this.label, right: rightClose },
                React.createElement("pre", null, JSON.stringify(result, undefined, '\t')));
        });
    }
    async showEntry(param) {
        this.vForm = this.createForm(this.onSubmit, param);
        let { row, queryRow } = this.ui;
        this.row = queryRow || row || DefaultRow;
        this.openPage(this.view);
    }
    renderExtra() {
        return;
    }
}
//# sourceMappingURL=vQueryMain.js.map