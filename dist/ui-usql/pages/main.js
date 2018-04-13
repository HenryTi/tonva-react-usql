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
import { List, Muted } from 'tonva-react-form';
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.entityRender = this.entityRender.bind(this);
        this.entityClick = this.entityClick.bind(this);
        /*
                this.actionClick = this.actionClick.bind(this);
                this.sheetClick = this.sheetClick.bind(this);
                this.queryClick = this.queryClick.bind(this);
                this.tuidClick = this.tuidClick.bind(this);
        */
    }
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
    /*
        private tuidRender<E extends Entity, U extends EntityUI<E>>(ui: U, index: number): JSX.Element {
            let {caption} = ui;
            return <div className="px-3 py-2">{caption}</div>
        }
        private actionRender(ui: ActionUI, index: number): JSX.Element {
            let {caption} = ui;
            return <div className="px-3 py-2">{caption}</div>
        }
        private sheetRender(ui: SheetUI, index: number): JSX.Element {
            let {caption} = ui;
            return <div className="px-3 py-2">{caption}</div>
        }
        private queryRender(ui: QueryUI, index: number): JSX.Element {
            let {caption} = ui;
            return <div className="px-3 py-2">{caption}</div>
        }
    
        private async tuidClick(ui:TuidUI) {
            await ui.entity.loadSchema();
            nav.push(<ui.mainPage ui={ui} />);
        }
        private async actionClick(ui:ActionUI) {
            await ui.entity.loadSchema();
            nav.push(<ui.mainPage ui={ui} />);
        }
        private async sheetClick(ui:SheetUI) {
            await ui.entity.loadSchema();
            nav.push(<ui.mainPage ui={ui} />);
        }
        private async queryClick(ui:QueryUI) {
            await ui.entity.loadSchema();
            nav.push(<ui.mainPage ui={ui} />);
        }
    */
    renderList(entitySet, caption) {
        return React.createElement(List, { className: 'my-2', header: React.createElement(Muted, null, entitySet.caption || caption), items: entitySet.list, item: { render: this.entityRender, onClick: this.entityClick } });
    }
    render() {
        let { ui } = this.props;
        let { caption, tuid, action, sheet, query, book, history } = ui;
        return React.createElement(Page, { header: caption },
            this.renderList(tuid, 'Tuid'),
            this.renderList(action, 'Action'),
            this.renderList(sheet, 'Sheet'),
            this.renderList(query, 'Query'),
            this.renderList(book, 'Book'),
            this.renderList(history, 'History'));
    }
}
//# sourceMappingURL=main.js.map