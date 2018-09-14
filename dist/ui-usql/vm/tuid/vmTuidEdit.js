var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VmEntity } from '../VM';
export class VmTuidEdit extends VmEntity {
    constructor() {
        super(...arguments);
        /*
        protected async beforeStart(param?:any) {
            this.vmForm = this.createVmFieldsForm();
            if (param !== undefined) {
                this.id = param.id;
                this.vmForm.values = param;
            }
            this.vmForm.onSubmit = this.onSubmit;
        }
        */
        this.next = () => __awaiter(this, void 0, void 0, function* () {
            this.vmForm.reset();
            this.closePage();
        });
        this.finish = () => {
            this.closePage(2);
            this.event('edit-end');
        };
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            let { values } = this.vmForm;
            let ret = yield this.coordinator.entity.save(this.id, values);
            let { id } = ret;
            if (id < 0) {
                let { unique } = this.coordinator.entity;
                if (unique !== undefined) {
                    for (let u of unique) {
                        this.vmForm.setError(u, '不能重复');
                    }
                }
                return;
            }
            this.openPageElement(React.createElement(Page, { header: this.label + '提交成功', back: "none" },
                React.createElement("div", { className: 'm-3' },
                    React.createElement("span", { className: "text-success" },
                        React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                        " \u6210\u529F\u63D0\u4EA4\uFF01"),
                    React.createElement("div", { className: 'mt-5' },
                        React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                        React.createElement(Button, { color: "primary", outline: true, onClick: this.finish }, "\u4E0D\u7EE7\u7EED")))));
            this.event('item-changed', { id: this.id, values: values });
            return;
        });
        //protected view = TuidNewPage;
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vmForm = this.createForm(this.onSubmit, param);
            if (param !== undefined) {
                this.id = param.id;
            }
            this.openPage(this.editView);
        });
    }
    get editView() {
        return () => React.createElement(Page, { header: (this.id === undefined ? '新增' : '编辑') + ' - ' + this.label }, this.vmForm.render('mx-3 my-2'));
    }
    resetForm() {
        this.vmForm.reset();
    }
}
/*
const TuidNewPage = observer(({vm}:{vm:VmTuidEdit}) => {
    let {label, id, vmForm} = vm;
    return <Page header={(id===undefined? '新增':'编辑') + ' - ' + label}>
        {vmForm.render('mx-3 my-2')}
    </Page>;
});
*/ 
//# sourceMappingURL=vmTuidEdit.js.map