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
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { VmTuid } from './vmTuid';
export class VmTuidEdit extends VmTuid {
    constructor() {
        super(...arguments);
        this.next = () => __awaiter(this, void 0, void 0, function* () {
            this.resetForm();
            nav.pop();
        });
        this.finish = () => {
            nav.pop(2);
        };
        this.view = TuidNewPage;
        /*
        renderView() {
            return <TuidNewPage vm={this} />;
        }*/
    }
    loadId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.id = id;
        });
    }
    initValues() {
        this.values = this.buildObservableValues(this.entity.schema.fields);
    }
    resetForm() {
        this.resetValues();
        this.vmFieldsForm.reset();
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.entity.save(this.id, this.values);
            if (ret) {
                alert('这里还要判断返回值，先不处理了 \n' + JSON.stringify(ret));
            }
            nav.push(React.createElement(Page, { header: this.caption + '提交成功', back: "none" },
                React.createElement("div", { className: 'm-3' },
                    React.createElement("span", { className: "text-success" },
                        React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                        " \u6210\u529F\u63D0\u4EA4\uFF01"),
                    React.createElement("div", { className: 'mt-5' },
                        React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                        React.createElement(Button, { color: "primary", outline: true, onClick: this.finish }, "\u4E0D\u7EE7\u7EED")))));
            return;
        });
    }
}
const TuidNewPage = observer(({ vm }) => {
    let { caption, values, renderForm } = vm;
    return React.createElement(Page, { header: '新增 - ' + caption }, renderForm('mx-3 my-2'));
});
//# sourceMappingURL=vmTuidEdit.js.map