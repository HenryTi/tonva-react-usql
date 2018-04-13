var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { TonvaForm } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
    }
    submit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui } = this.props;
            values.arr1 = [
                { t1: 11, k: 'a b' },
                { t1: 22, k: 'bbbb' },
            ];
            values.arr2 = [
                { k1: '1----abb ddd' },
                { k1: '2----ddddd' },
            ];
            let ret = yield ui.entity.submit(values);
            nav.pop();
            nav.push(React.createElement(ActionResultPage, { ui: ui, data: ret }));
            return;
        });
    }
    render() {
        let { ui } = this.props;
        let { caption, entity } = ui;
        let { name, schema } = entity;
        return React.createElement(Page, { header: caption || name },
            React.createElement(TonvaForm, { className: "m-3", formRows: this.formRows, onSubmit: this.submit }));
    }
}
class ActionResultPage extends React.Component {
    render() {
        let { ui, data } = this.props;
        let { caption, entity } = ui;
        let { name } = entity;
        return React.createElement(Page, { header: caption || name, back: "close" },
            React.createElement("pre", null, JSON.stringify(data, undefined, ' ')));
    }
}
//# sourceMappingURL=mainPage.js.map