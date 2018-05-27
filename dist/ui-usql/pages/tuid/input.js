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
import { EntityLink } from '../entityLink';
let GeneralTuidInput = class GeneralTuidInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.onClick = this.onClick.bind(this);
        this.onPicked = this.onPicked.bind(this);
        this.inputOnBlur = this.inputOnBlur.bind(this);
        this.state = {
            id: this.props.id,
            proxyId: undefined,
            proxyName: undefined,
        };
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.ui.entity.loadSchema();
        });
    }
    onPicked(value) {
        let { id, prox } = value;
        this.setState(value);
        //id: id,
        //proxyId: number;
        //proxyName: string;
        //})
        let { ui, onIdChanged } = this.props;
        if (id !== undefined)
            ui.entity.useId(id);
        onIdChanged({ id: id });
    }
    onClick() {
        let { ui } = this.props;
        let id = this.state.id;
        let tuid = ui.entity;
        let proxies = tuid.schema.proxies;
        let { pickPage: PickPage } = ui.input;
        if (PickPage === undefined)
            PickPage = PickTuidPage;
        if (proxies === undefined) {
            nav.push(React.createElement(PickPage, Object.assign({}, this.props, { id: id, onPicked: this.onPicked })));
        }
        else {
            nav.push(React.createElement(SelectTuidPage, Object.assign({}, this.props, { id: id, proxies: proxies, onPicked: this.onPicked })));
        }
    }
    inputOnBlur(evt) {
        let value = evt.currentTarget.value;
        let id = Number(value);
        if (id <= 0) {
            evt.currentTarget.value = '';
            return;
        }
        let { onIdChanged } = this.props;
        this.props.ui.entity.useId(id);
        onIdChanged({ id: id });
    }
    render() {
        let { ui, onIdChanged } = this.props;
        let content = this.content(ui.input);
        if (onIdChanged === undefined) {
            return React.createElement("span", null, content);
        }
        return React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: { textAlign: 'left', paddingLeft: '0.75rem' }, onClick: this.onClick }, content);
    }
    content(input) {
        let { ui } = this.props;
        let { entity, caption, entitiesUI } = ui;
        let id = this.state.id;
        let content;
        if (id === undefined) {
            let { proxyName, proxyId } = this.state;
            if (proxyId !== undefined) {
                return this.idContent(proxyName, proxyId);
            }
            return React.createElement("div", null,
                "\u70B9\u51FB\u641C\u7D22",
                caption);
        }
        let proxies = entity.proxies;
        if (proxies === undefined) {
            let val = entity.getId(id);
            if (typeof val === 'number') {
                return this.idContent(caption, id);
            }
            let InputContent = input.inputContent;
            if (val === undefined)
                return this.idContent(caption, id);
            if (InputContent === undefined)
                return React.createElement("div", null,
                    caption,
                    ": ",
                    JSON.stringify(val));
            return React.createElement(InputContent, { value: val });
        }
        // ==== proxy tuid =====
        let val = entity.getId(id);
        if (typeof val === 'number')
            return this.idContent(caption, id);
        let { type, $proxy } = val;
        let tuidUI = entitiesUI.tuid.coll[type];
        let InputContent = tuidUI.input.inputContent;
        caption = tuidUI.caption;
        id = $proxy;
        val = tuidUI.entity.getId($proxy);
        if (typeof val === 'number')
            return this.idContent(caption, id);
        if (InputContent === undefined || val === undefined) {
            return this.idContent(caption, id);
        }
        return React.createElement(InputContent, { value: val });
    }
    idContent(caption, id) {
        return React.createElement("div", null,
            caption,
            ": ",
            id);
    }
};
GeneralTuidInput = __decorate([
    observer
], GeneralTuidInput);
export { GeneralTuidInput };
class SelectTuidPage extends React.Component {
    constructor(props) {
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.onPicked = this.onPicked.bind(this);
        this.proxies = [];
        let { proxies } = this.props;
        for (let i in proxies) {
            let p = proxies[i];
            this.proxies.push({
                tuidName: p.name,
            });
        }
    }
    itemRender(proxy, index) {
        return React.createElement(EntityLink, { ui: this.props.ui.entitiesUI.tuid.coll[proxy.tuidName] });
    }
    itemClick(proxy) {
        this.proxy = proxy;
        let { ui } = this.props;
        let proxyTuidUI = ui.entitiesUI.tuid.coll[proxy.tuidName];
        let proxyTuid = proxyTuidUI.entity;
        let { pickPage: PickPage } = ui.input;
        if (PickPage === undefined)
            PickPage = PickTuidPage;
        nav.pop();
        nav.push(React.createElement(PickPage, Object.assign({}, this.props, { ui: proxyTuidUI, onPicked: this.onPicked })));
    }
    onPicked(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let { onPicked, ui } = this.props;
            let { id } = value;
            let proxy = this.proxy.tuidName;
            onPicked({ id: undefined, proxyId: id, proxyName: proxy });
            let proxiedValue = yield ui.entity.proxied(proxy, id);
            if (!proxiedValue) {
                console.log("proxiedValue is null");
                return;
            }
            let { id: pid, $proxy, type } = proxiedValue;
            onPicked({ id: pid });
        });
    }
    render() {
        let { ui } = this.props;
        return React.createElement(Page, { header: "\u9009\u62E9" },
            React.createElement(List, { items: this.proxies, item: { render: this.itemRender, onClick: this.itemClick } }));
    }
}
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
            let result = yield this.props.ui.entity.search(key, 0, 30);
            this.setState({
                items: result
            });
        });
    }
    renderRow(item, index) {
        let { candidateRow: CandidateRow } = this.props.ui.input;
        if (CandidateRow !== undefined)
            return React.createElement(CandidateRow, { item: item, index: index });
        return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
    }
    rowClick(item) {
        this.props.onPicked(item);
        nav.pop();
    }
    render() {
        let { ui } = this.props;
        let header = React.createElement(SearchBox, { className: "mx-1 w-100", placeholder: ui.caption, onSearch: this.onSearch });
        return React.createElement(Page, { header: header },
            React.createElement(List, { className: "my-3", before: '搜索' + ui.caption, items: this.state.items, item: { render: this.renderRow, onClick: this.rowClick } }));
    }
}
//# sourceMappingURL=input.js.map