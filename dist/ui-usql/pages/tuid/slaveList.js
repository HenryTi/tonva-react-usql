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
import { Button } from 'reactstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { nav, Page, PagedItems } from 'tonva-tools';
import { List, FA } from 'tonva-react-form';
import { EditPage } from './editPage';
class PagedSlaveItems extends PagedItems {
    constructor(master, slave, masterId) {
        super();
        this.master = master;
        this.slave = slave;
        this.masterId = masterId;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.master.entity.slaves(this.slave.entity.name, this.masterId, this.pageStart, this.pageSize);
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.order;
    }
}
let SlaveList = class SlaveList extends React.Component {
    constructor(props) {
        super(props);
        this.items = undefined;
        this.itemClick = this.itemClick.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.newClick = this.newClick.bind(this);
        this.onNewSubmited = this.onNewSubmited.bind(this);
        this.onSlaveSaved = this.onSlaveSaved.bind(this);
        let { ui, slave, masterId } = this.props;
        this.pagedItems = new PagedSlaveItems(ui, slave, masterId);
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { masterId, ui, slave } = this.props;
            //await this.slave.entity.loadSchema();
            //await ui.entity.slaves(slave.entity.name);
            yield this.pagedItems.first(undefined);
        });
    }
    itemClick(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, slave, masterId } = this.props;
            yield slave.entity.loadSchema();
            let data = yield slave.entity.load(item.id);
            nav.push(React.createElement(EditPage, { master: ui, masterId: masterId, ui: slave, data: data, onSubmited: this.onSlaveSaved }));
        });
    }
    onSlaveSaved(res) {
        let { ui, masterId, slave } = this.props;
        slave.entity.resetCache(res.id);
    }
    itemRender(item, index) {
        let { slave } = this.props;
        let { inputContent: InputContent } = slave.input;
        let { id } = item;
        slave.entity.useId(id);
        let content;
        let value = slave.entity.getId(id);
        if (value !== undefined) {
            if (InputContent !== undefined)
                content = React.createElement(InputContent, { value: value });
            else
                content = React.createElement(React.Fragment, null, JSON.stringify(item));
        }
        else {
            content = React.createElement(React.Fragment, null,
                slave.caption,
                ": ",
                id);
        }
        return React.createElement("div", { className: "px-3 py-2" }, content);
    }
    newClick() {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, masterId, slave } = this.props;
            yield slave.entity.loadSchema();
            nav.push(React.createElement(EditPage, { ui: slave, data: undefined, master: ui, masterId: masterId, onSubmited: this.onNewSubmited }));
        });
    }
    onNewSubmited(res) {
        this.pagedItems.items.push(res);
    }
    render() {
        let { ui, slave } = this.props;
        let right = React.createElement(Button, { color: "success", onClick: this.newClick },
            React.createElement(FA, { name: "plus" }));
        return React.createElement(Page, { header: slave.caption + ' - 属于' + ui.caption, right: right },
            React.createElement(List, { items: this.pagedItems.items, item: { onClick: this.itemClick, render: this.itemRender } }));
    }
};
__decorate([
    observable
], SlaveList.prototype, "items", void 0);
SlaveList = __decorate([
    observer
], SlaveList);
export { SlaveList };
//# sourceMappingURL=slaveList.js.map