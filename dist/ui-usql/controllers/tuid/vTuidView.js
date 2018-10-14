import * as React from 'react';
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
export class VTuidView extends VEntity {
    constructor() {
        super(...arguments);
        this.next = async () => {
            this.vForm.reset();
            this.closePage();
        };
        this.finish = () => {
            this.closePage(2);
        };
        this.onSubmit = async () => {
            let values = this.vForm.getValues();
            let ret = await this.entity.save(this.id, values);
            if (ret) {
                alert('这里还要判断返回值，先不处理了 \n' + JSON.stringify(ret));
            }
            this.openPage(() => React.createElement(Page, { header: this.label + '提交成功', back: "none" },
                React.createElement("div", { className: 'm-3' },
                    React.createElement("span", { className: "text-success" },
                        React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                        " \u6210\u529F\u63D0\u4EA4\uFF01"),
                    React.createElement("div", { className: 'mt-5' },
                        React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                        React.createElement(Button, { color: "primary", outline: true, onClick: this.finish }, "\u4E0D\u7EE7\u7EED")))));
            return;
        };
        this.view = () => React.createElement(Page, { header: this.label }, this.vForm.render('py-3'));
    }
    buildForm(param) {
        this.vForm = this.createForm(undefined, param);
    }
    async showEntry(param) {
        this.buildForm(param);
        this.openPage(this.view);
    }
    render(param) {
        this.buildForm(param);
        return this.vForm.render();
    }
    async loadId(id) {
        this.id = id;
    }
    resetForm() {
        this.vForm.reset();
    }
}
//# sourceMappingURL=vTuidView.js.map