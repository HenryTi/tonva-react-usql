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
import { SearchBox, List, Muted } from 'tonva-react-form';
export class MainPage extends React.Component {
    render() {
        let { entity, caption } = this.props.ui;
        let proxies = entity.schema.proxies;
        if (proxies === undefined)
            return React.createElement(TuidMainPage, Object.assign({}, this.props));
        return React.createElement(TuidProxyMainPage, Object.assign({}, this.props));
    }
}
class TuidMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    addNew() {
        //nav.push(<EditPage ui={this.props.ui} />);
        let ui = this.props.ui;
        nav.push(React.createElement(ui.editPage, { ui: ui }));
    }
    list() {
        //nav.push(<SearchPage ui={this.props.ui} />);
        let ui = this.props.ui;
        nav.push(React.createElement(ui.listPage, { ui: ui }));
    }
    onSearch(key) {
        //nav.push(<SearchPage ui={this.props.ui} data={key} />);
        let ui = this.props.ui;
        nav.push(React.createElement(ui.listPage, { ui: ui, data: key }));
    }
    render() {
        let { entity, caption } = this.props.ui;
        let { name, schema } = entity;
        caption = caption || name;
        let header = React.createElement(SearchBox, { className: "w-100", onSearch: this.onSearch, placeholder: '搜索' + caption });
        return React.createElement(Page, { header: caption },
            React.createElement(SearchBox, { className: "w-100", onSearch: this.onSearch, placeholder: '搜索' + caption }),
            React.createElement("div", { className: 'my-3' },
                React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.addNew }, "\u65B0\u589E"),
                React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.list }, "\u5217\u8868")));
    }
}
class TuidProxyMainPage extends React.Component {
    entityRender(ui, index) {
        let { caption } = ui;
        return ui.link ?
            React.createElement(ui.link, { ui: ui }) :
            React.createElement("div", { className: "px-3 py-2" }, caption);
    }
    entityClick(ui) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ui.entity.loadSchema();
            nav.push(React.createElement(ui.mainPage, { ui: ui }));
        });
    }
    render() {
        let ui = this.props.ui;
        let { entity, entitySet } = ui;
        let { coll } = entitySet;
        let proxies = entity.schema.proxies;
        let tuidUIs = [];
        for (let i in proxies) {
            let tuidUI = coll[i];
            tuidUIs.push(tuidUI);
        }
        return React.createElement(Page, { header: ui.caption },
            React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                    ui.caption,
                    " \u4EE3\u7406\u4E0B\u5217Tuid"), items: tuidUIs, item: { render: this.entityRender, onClick: this.entityClick } }));
    }
}
//# sourceMappingURL=mainPage.js.map