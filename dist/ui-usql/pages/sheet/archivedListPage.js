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
import { List, LMR, FA } from 'tonva-react-form';
import { ArchivedPage } from './archivedPage';
export class ArchivedListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: undefined
        };
        this.mapper = this.mapper.bind(this);
        this.click = this.click.bind(this);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.props.ui.entity.getArchives(undefined, 10);
            this.setState({ rows: res });
        });
    }
    click(brief) {
        if (brief.processing === 1)
            return;
        nav.push(React.createElement(ArchivedPage, { ui: this.props.ui, data: brief }));
    }
    mapper(row, index) {
        let left = React.createElement(React.Fragment, null,
            row.processing === 1 ? '... ' : '',
            "id:",
            row.id,
            ", no:",
            row.no,
            ", discription:",
            row.discription,
            ", date:",
            row.date);
        let right = React.createElement(FA, { className: "align-self-center", name: "angle-right" });
        return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
    }
    render() {
        let { name } = this.props.ui.entity;
        return React.createElement(Page, { header: '已归档' + name },
            React.createElement(List, { items: this.state.rows, item: { render: this.mapper, onClick: this.click } }));
    }
}
//# sourceMappingURL=archivedListPage.js.map