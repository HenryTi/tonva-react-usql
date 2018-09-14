var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VmEntity } from '../VM';
export class VmTuidMain extends VmEntity {
    constructor() {
        super(...arguments);
        this.onNew = () => this.event('new'); //this.coordinator.navVm(VmTuidEdit);
        this.onList = () => this.event('list'); // this.coordinator.navVm(VmTuidList);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () { return this.event('list', key); }); //await this.coordinator.navVm(VmTuidList, key);
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPage(this.view);
        });
    }
    entityRender(link, index) {
        return link.render();
    }
    entityClick(link) {
        return __awaiter(this, void 0, void 0, function* () {
            yield link.onClick();
        });
    }
    get view() {
        let { label, proxyLinks } = this.coordinator;
        return () => React.createElement(Page, { header: label }, proxyLinks === undefined ?
            React.createElement(React.Fragment, null,
                React.createElement(SearchBox, { className: "w-100", onSearch: this.onSearch, placeholder: '搜索' + label }),
                React.createElement("div", { className: 'my-3' },
                    React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.onNew }, "\u65B0\u589E"),
                    React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.onList }, "\u5217\u8868"))) :
            React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                    label,
                    " \u4EE3\u7406\u4E0B\u5217Tuid"), items: proxyLinks, item: { render: this.entityRender, onClick: this.entityClick } }));
    }
}
/*
const MainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, onNew, onList, onSearch} = vm;
    return <Page header={label}>
        <SearchBox className="w-100" onSearch={onSearch} placeholder={'搜索'+label} />
        <div className='my-3'>
            <Button className="ml-3" color="primary" onClick={onNew}>新增</Button>
            <Button className="ml-3" color="primary" onClick={onList}>列表</Button>
        </div>
    </Page>;
}
        
const ProxyMainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, crUsq, entity, entityClick, entityRender, proxies} = vm;
    let arr:string[] = [];
    for (let i in proxies) {
        arr.push(i);
    }
    return <Page header={label}>
        <List className="my-2"
            header={<Muted>{label} 代理下列Tuid</Muted>}
            items={arr.map(v => crUsq.vmLinkFromName('tuid', v))}
            item={{render: entityRender, onClick:entityClick}} />
    </Page>
}
*/ 
//# sourceMappingURL=vmTuidMain.js.map