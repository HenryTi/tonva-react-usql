var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { nav, Page } from 'tonva-tools';
import { List } from 'tonva-react-form';
import { EditPage } from './editPage';
import config from '../consts';
export class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            more: false,
            rows: undefined,
        };
        this.mapper = this.mapper.bind(this);
        this.click = this.click.bind(this);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.props.ui.entity.search('', 0, 30);
            this.setState({
                more: res.more,
                rows: res.rows
            });
        });
    }
    click(row) {
        nav.push(React.createElement(EditPage, { ui: this.props.ui, data: row }));
    }
    mapper(row, index) {
        //let {name, discription, d2} = row;
        return React.createElement("div", { className: 'app-row' },
            React.createElement("label", null,
                React.createElement("img", { src: config.appIcon })),
            React.createElement("div", null, JSON.stringify(row)));
    }
    /*
        <div>
        <div>{name}</div>
        <span>{discription}</span>
    </div>
    <footer>
        <span style={{color:'red'}}>{d2.toFixed(2)}</span>
        <span style={{fontSize:'smaller'}}>&nbsp;元</span>
    </footer>
    */
    render() {
        let { ui } = this.props;
        let { entity, caption } = ui;
        let { name } = entity;
        return React.createElement(Page, { header: caption || name },
            React.createElement(List, { items: this.state.rows, item: { render: this.mapper, onClick: this.click } }));
    }
}
//# sourceMappingURL=listPage.old.js.map