var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { SearchBox, List } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
let GeneralTuidInput = class GeneralTuidInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.onClick = this.onClick.bind(this);
        this.onPicked = this.onPicked.bind(this);
        this.inputOnBlure = this.inputOnBlure.bind(this);
        let { id, tuid, entitiesUI } = this.props;
        if (entitiesUI === undefined) {
            console.log('TonvaForm props 应该包含 context=EntitiesUI');
            return;
        }
        this.tuidUI = entitiesUI.tuid.coll[tuid];
        if (this.tuidUI === undefined) {
            console.log('Tuid ' + tuid + ' 没有定义');
            return;
        }
    }
    onPicked(value) {
        if (value === undefined)
            return;
        let { onPicked } = this.props;
        this.tuidUI.entity.useId(value.id);
        onPicked(value);
    }
    onClick() {
        let { id, input, params, onPicked } = this.props;
        let { pickPage: PickPage } = input;
        if (PickPage === undefined)
            PickPage = PickTuidPage;
        nav.push(React.createElement(PickPage, { id: id, input: input, tuidUI: this.tuidUI, params: params, onPicked: this.onPicked }));
    }
    inputOnBlure(evt) {
        let value = evt.currentTarget.value;
        let id = Number(value);
        if (id <= 0) {
            evt.currentTarget.value = '';
            return;
        }
        let { onPicked } = this.props;
        //this.tuidUI.entity.useId(id);
        onPicked({ id: id });
    }
    render() {
        let { id, tuid, input, entitiesUI, params, readOnly } = this.props;
        if (this.tuidUI === undefined) {
            if (readOnly === true)
                return React.createElement("span", null, tuid + '没有定义或未处理');
            return React.createElement("input", { className: "form-control", type: "number", step: 1, onBlur: this.inputOnBlure, placeholder: tuid + '没有定义或未处理，可直接输入数字' });
        }
        let caption = this.tuidUI.caption;
        let content;
        if (id === undefined) {
            content = React.createElement("div", null,
                "\u70B9\u51FB\u641C\u7D22",
                caption);
        }
        else {
            let val = this.tuidUI.entity.getId(id);
            switch (typeof val) {
                case 'number':
                    content = React.createElement("div", null,
                        caption,
                        ": ",
                        id);
                    break;
                default:
                    content = input.inputContent ?
                        React.createElement(input.inputContent, { value: val }) :
                        React.createElement(React.Fragment, null,
                            caption,
                            ": ",
                            id);
                    break;
            }
        }
        if (readOnly === true) {
            return React.createElement("span", null, content);
        }
        return React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: { textAlign: 'left', paddingLeft: '0.75rem' }, onClick: this.onClick }, content);
    }
};
GeneralTuidInput = __decorate([
    observer
], GeneralTuidInput);
export { GeneralTuidInput };
class PickTuidPage extends React.Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.state = {
            items: null
        };
    }
    onSearch(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.props.tuidUI.entity.search(key, 0, 30);
            this.setState({
                items: result
            });
        });
    }
    renderRow(item, index) {
        let { candidateRow: CandidateRow } = this.props.input;
        if (CandidateRow !== undefined)
            return React.createElement(CandidateRow, { item: item, index: index });
        return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
    }
    rowClick(item) {
        this.props.onPicked(item);
        nav.pop();
    }
    render() {
        let { tuidUI, input } = this.props;
        let header = React.createElement(SearchBox, { className: "mx-1 w-100", placeholder: tuidUI.caption, onSearch: this.onSearch });
        return React.createElement(Page, { header: header },
            React.createElement(List, { className: "my-3", before: '搜索' + tuidUI.caption, items: this.state.items, item: { render: this.renderRow, onClick: this.rowClick } }));
    }
}
//# sourceMappingURL=input.js.map