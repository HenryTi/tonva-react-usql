var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { TonvaForm, FA } from 'tonva-react-form';
;
export class EditPage extends React.Component {
    constructor(props) {
        super(props);
        //this.addNew = this.addNew.bind(this);
        this.submit = this.submit.bind(this);
        this.next = this.next.bind(this);
        this.finish = this.finish.bind(this);
        let { ui } = this.props;
        let bindSlaves = ui.entity.schema.bindSlaves;
        if (bindSlaves !== undefined)
            this.bindSlaveUIs = bindSlaves.map(s => ui.entitiesUI.tuid.coll[s]);
        this.state = { item: this.props.data || {} };
        this.buildFormView();
    }
    submit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, data, master, masterId, onSubmited } = this.props;
            let { entity, caption } = ui;
            let { name } = entity;
            caption = caption || name;
            let { schema } = entity;
            let id;
            if (data !== undefined)
                id = data.id;
            let res;
            if (master === undefined) {
                res = yield ui.entity.save(id, values);
            }
            else {
                let first = 0;
                res = yield master.entity.bindSlaveSave(ui.entity.name, first, masterId, id, values);
            }
            let retId = res.id;
            if (retId < 0) {
                let unique = schema.unique;
                if (unique !== undefined) {
                    for (let u of unique) {
                        this.form.formView.setError(u, '不能重复');
                    }
                }
                return;
            }
            if (onSubmited !== undefined)
                onSubmited(res);
            if (data === undefined) {
                nav.push(React.createElement(Page, { header: caption + '提交成功', back: "none" },
                    React.createElement("div", { className: 'm-3' },
                        React.createElement("span", { className: "text-success" },
                            React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                            " \u6210\u529F\u63D0\u4EA4\uFF01"),
                        React.createElement("div", { className: 'mt-5' },
                            React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                            React.createElement(Button, { color: "primary", outline: true, onClick: this.finish }, "\u4E0D\u7EE7\u7EED")))));
                return;
            }
            nav.pop();
            nav.push(React.createElement(Page, { header: caption + '修改成功', back: "close" },
                React.createElement("div", { className: 'm-3' },
                    React.createElement("span", { className: "text-success" },
                        React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                        " \u6210\u529F\uFF01"))));
        });
    }
    next() {
        this.form.formView.clear();
        nav.pop();
    }
    finish() {
        nav.pop(2);
    }
    renderSlaveInputs() {
        let { ui, data } = this.props;
        let { slaves } = ui;
        if (slaves === undefined)
            return;
        let arr = [];
        for (let i in slaves) {
            let s = slaves[i];
            arr.push(React.createElement(ui.slaveInput, { key: s.name, ui: ui, slave: s, masterId: data.id }));
        }
        return React.createElement("div", { className: "px-3 py-1 mb-3 bg-ligh border-bottom border-info" }, arr);
    }
    render() {
        let { ui, data } = this.props;
        let { entity, caption, entitiesUI } = ui;
        let { name } = entity;
        caption = caption || name;
        let header, slaveInputs;
        if (data === undefined) {
            header = '新增' + caption;
        }
        else {
            header = caption + '资料';
            /*
            if (this.bindSlaveUIs !== undefined) {
                slaveInputs = <div className="px-3 py-1 mb-3 bg-ligh border-bottom border-info">
                    {this.bindSlaveUIs.map(s => {
                        return <ui.slaveInput key={s.entity.name} ui={ui} bindSlave={s} masterId={data.id} />
                    })}
                </div>;
            }
            */
        }
        return React.createElement(Page, { header: header },
            this.renderSlaveInputs(),
            React.createElement(TonvaForm
            //context={entitiesUI}
            , { 
                //context={entitiesUI}
                ref: tf => this.form = tf, className: "m-3", initValues: data, formRows: this.formRows, onSubmit: this.submit }));
    }
    buildFormView() {
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
    }
}
class Success extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.return = this.return.bind(this);
    }
    next() {
        this.props.callback();
        nav.pop();
    }
    return() {
        nav.pop(2);
    }
    render() {
        return React.createElement(Page, { header: '\u63D0\u4EA4\u6210\u529F' },
            React.createElement("div", null, "\u6210\u529F\u63D0\u4EA4\uFF01"),
            React.createElement(Button, { onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
            React.createElement(Button, { onClick: this.return }, "\u4E0D\u7EE7\u7EED"));
    }
}
//# sourceMappingURL=editPage.js.map