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
import { observer } from 'mobx-react';
import { nav, Page, PagedItems } from 'tonva-tools';
import { List, FA, LMR } from 'tonva-react-form';
import { EditPage } from './editPage';
class PagedSlaveItems extends PagedItems {
    constructor(master, page, masterId) {
        super();
        this.master = master;
        this.page = page;
        this.masterId = masterId;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.page.page({
                "_$master": this.masterId
            }, this.pageStart, this.pageSize);
            //return await this.master.entity.bindSlaves(this.bindSlave.entity.name, this.masterId, this.pageStart, this.pageSize);
            return ret;
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
        this.itemClick = this.itemClick.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.addClick = this.addClick.bind(this);
        this.onNewSubmited = this.onNewSubmited.bind(this);
        this.onBindSlaveSaved = this.onBindSlaveSaved.bind(this);
        this.slaveChanged = this.slaveChanged.bind(this);
        let { ui, slave, masterId } = this.props;
        this.pagedItems = new PagedSlaveItems(ui, slave.page.entity, masterId);
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { masterId, ui, slave } = this.props;
            //await this.slave.entity.loadSchema();
            //await ui.entity.bindSlaves(slave.entity.name);
            yield this.pagedItems.first(undefined);
        });
    }
    itemClick(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, slave, masterId } = this.props;
            let { tuid } = slave;
            //await slave.entity.loadSchema();
            let data = yield tuid.entity.load(item.id);
            nav.push(React.createElement(EditPage, { master: ui, masterId: masterId, ui: tuid, data: data, onSubmited: this.onBindSlaveSaved }));
        });
    }
    onBindSlaveSaved(res) {
        let { ui, masterId, slave } = this.props;
        slave.tuid.entity.resetCache(res.id);
    }
    itemRender(item, index) {
        let { slave, ui } = this.props;
        let { tuid } = slave;
        let { inputContent: InputContent } = tuid.input;
        let { $slave } = item;
        tuid.entity.useId($slave);
        let content;
        let value = tuid.entity.getId($slave);
        if (value !== undefined) {
            if (InputContent !== undefined) {
                return React.createElement(LMR, { className: "px-3 py-2", left: React.createElement(InputContent, { value: value }), right: JSON.stringify(item) });
            }
            else {
                content = React.createElement(React.Fragment, null, JSON.stringify(item));
            }
        }
        else {
            content = React.createElement(React.Fragment, null,
                tuid.caption,
                ": ",
                $slave);
        }
        return React.createElement("div", { className: "px-3 py-2" }, content);
    }
    addClick() {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, masterId, slave } = this.props;
            let { tuid } = slave;
            nav.push(React.createElement(SetSlave, Object.assign({ slaveChanged: this.slaveChanged }, this.props)));
        });
    }
    slaveChanged(slaveId, slaved) {
        let items = this.pagedItems.items;
        let index = items.findIndex(v => v.$slave === slaveId);
        if (slaved === 0) {
            if (index >= 0)
                items.splice(index, 1);
        }
        else {
            if (index < 0)
                items.unshift({ $slave: slaveId });
        }
    }
    onNewSubmited(res) {
        this.pagedItems.items.push(res);
    }
    render() {
        let { ui, slave } = this.props;
        let { tuid } = slave;
        let { items } = this.pagedItems;
        let right = React.createElement(Button, { color: "success", onClick: this.addClick },
            React.createElement(FA, { name: "plus" }));
        return React.createElement(Page, { header: tuid.caption + ' - 属于' + ui.caption, right: right },
            React.createElement(List, { items: items, item: { onClick: this.itemClick, render: this.itemRender } }));
    }
};
SlaveList = __decorate([
    observer
], SlaveList);
export { SlaveList };
class PagedSlaveSelectItems extends PagedItems {
    constructor(page) {
        super(true);
        this.page = page;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.page.page(this.param, this.pageStart, this.pageSize);
            //return await this.master.entity.bindSlaves(this.bindSlave.entity.name, this.masterId, this.pageStart, this.pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.$slave;
    }
}
let SetSlave = class SetSlave extends React.Component {
    constructor(props) {
        super(props);
        this.pagedItems = new PagedSlaveSelectItems(this.props.slave.pageSlave.entity);
        this.addClick = this.addClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { masterId, ui, slave } = this.props;
            //await this.slave.entity.loadSchema();
            //await ui.entity.bindSlaves(slave.entity.name);
            yield this.pagedItems.first(undefined);
        });
    }
    addClick() {
    }
    onSelect(item, isSelected, anySelected) {
    }
    itemClick(item) {
    }
    setSlave(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let { masterId } = this.props;
            item.slaved = 1;
            let { $slave, slaved } = item;
            yield this.props.slave.add.entity.submit({
                _$master: masterId,
                arr1: [{ _$slave: $slave }]
            });
            this.props.slaveChanged($slave, slaved);
        });
    }
    unsetSlave(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let { masterId } = this.props;
            item.slaved = 0;
            let { $slave, slaved } = item;
            yield this.props.slave.del.entity.submit({
                _$master: masterId,
                arr1: [{ _$slave: $slave }]
            });
            this.props.slaveChanged($slave, slaved);
        });
    }
    itemRender(item, index) {
        let { $slave, slaved } = item;
        let right, flag;
        if (slaved === 0) {
            flag = React.createElement("div", { className: "p-2" },
                React.createElement(FA, { name: "x", fixWidth: true }));
            right = React.createElement(Button, { className: "m-1", color: "success", size: "sm", onClick: () => this.setSlave(item) },
                React.createElement(FA, { name: "plus" }));
        }
        else {
            flag = React.createElement("div", { className: "p-2 text-danger" },
                React.createElement(FA, { name: "check", fixWidth: true }));
            right = React.createElement(Button, { className: "m-1", color: "link", size: "sm", onClick: () => this.unsetSlave(item) },
                React.createElement(FA, { name: "minus" }));
        }
        let tuid = this.props.slave.tuid;
        tuid.entity.useId($slave);
        let value = tuid.entity.getId($slave);
        let InputContent = tuid.input.inputContent;
        return React.createElement(LMR, { left: flag, right: right },
            React.createElement("div", { className: "py-2" },
                React.createElement(InputContent, { value: value }),
                JSON.stringify(item)));
    }
    render() {
        let { ui, slave } = this.props;
        let { tuid } = slave;
        let { items } = this.pagedItems;
        let item = {
            onClick: this.itemClick,
            render: this.itemRender,
        };
        return React.createElement(Page, { header: '设置 ' + ui.caption + ' 属于 ' + tuid.caption },
            React.createElement(List, { items: items, item: item }));
    }
};
SetSlave = __decorate([
    observer
], SetSlave);
//# sourceMappingURL=slaveList.js.map