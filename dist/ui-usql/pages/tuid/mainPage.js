import * as React from 'react';
import { Button } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { LMR, SearchBox } from 'tonva-react-form';
import { EditPage } from './editPage';
import { SearchPage } from './searchPage';
export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    addNew() {
        nav.push(React.createElement(EditPage, { ui: this.props.ui }));
    }
    list() {
        nav.push(React.createElement(SearchPage, { ui: this.props.ui }));
    }
    onSearch(key) {
        nav.push(React.createElement(SearchPage, { ui: this.props.ui, data: key }));
    }
    render() {
        let { entity, caption } = this.props.ui;
        let { name, schema } = entity;
        caption = caption || name;
        let right = React.createElement(SearchBox, { className: "mr-3", onSearch: this.onSearch, placeholder: '搜索' + caption });
        return React.createElement(Page, { header: caption || name },
            React.createElement(LMR, { className: "mt-3", right: right },
                React.createElement("div", null,
                    React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.addNew }, "\u65B0\u589E"),
                    React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.list }, "\u5217\u8868"))));
    }
}
// <pre>{JSON.stringify(schema, undefined, ' ')}</pre>
//# sourceMappingURL=mainPage.js.map