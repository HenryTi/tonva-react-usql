var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import * as _ from 'lodash';
import { Api } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { ViewModel, JSONContent } from './viewModel';
import { Entities } from '../entities';
import { VmEntityLink } from './link';
import { VmBookMain } from './book';
import { VmSheetMain } from './sheet';
import { VmActionMain } from './action';
import { VmQueryMain } from './query';
import { VmTuidMain, VmTuidView } from './tuid';
import { VmTuidControl, VmTuidPicker } from './vmForm';
export class VmApi extends ViewModel {
    constructor(appId, apiId, api, access, ui) {
        super();
        this.isSysVisible = false;
        this.renderLink = (vmLink, index) => {
            return vmLink.render();
        };
        this.linkClick = (vmLink) => {
            vmLink.onClick();
        };
        this.navVm = (vmType, entity, ui, param) => __awaiter(this, void 0, void 0, function* () {
            let vm = yield this.create(vmType, entity, ui);
            yield vm.start(param);
        });
        this.view = ApiView;
        //this.vmApp = vmApp;
        this.api = api;
        this.id = apiId;
        this.ui = ui;
        this.access = access;
        let token = undefined;
        let apiOwner, apiName;
        let p = api.split('/');
        switch (p.length) {
            case 1:
                apiOwner = '$$$';
                apiName = p[0];
                break;
            case 2:
                apiOwner = p[0];
                apiName = p[1];
                break;
            default:
                console.log('api must be apiOwner/apiName format');
                return;
        }
        let hash = document.location.hash;
        let baseUrl = hash === undefined || hash === '' ?
            'debug/' : 'tv/';
        let _api = new Api(baseUrl, apiOwner, apiName, true);
        this.entities = new Entities(appId, apiId, _api, access);
    }
    //vmApp: VmApp;
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entities.load();
            // 检查注册的entity viewModels
            /*
            let arr = [
                {regs: VmTuid.vmRegs, type: 'tuid'},
                {regs: VmSheet.vmRegs, type: 'sheet'},
                {regs: VmAction.vmRegs, type: 'action'},
                {regs: VmQuery.vmRegs, type: 'query'},
                {regs: VmBook.vmRegs, type: 'book'},
            ];
            for (let item of arr) {
                let {regs, type} = item;
                for (let i in regs) {
                    if (this.entities[type](i) === undefined) {
                        let vm = regs[i];
                        console.warn(type + ':' + '\'' + i + '\' is not usql entity, which register class ' + vm.name);
                    }
                }
            }*/
            for (let i in this.ui) {
                let g = this.ui[i];
                if (g === undefined)
                    continue;
                let { caption, collection } = g;
                if (collection === undefined)
                    continue;
                for (let j in collection) {
                    if (this.entities[i](j) === undefined) {
                        console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                    }
                }
            }
        });
    }
    getTuid(name) { return this.entities.tuid(name); }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    navSheet(sheetTypeId, sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let sheet = this.entities.sheetFromTypeId(sheetTypeId);
            if (sheet === undefined) {
                alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
                return;
            }
            let vmSheetMain = this.newVmSheet(sheet);
            yield vmSheetMain.showSheet(sheetId);
        });
    }
    vmLinkFromName(entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                let sheet = this.entities.sheet(entityName);
                if (sheet === undefined)
                    return;
                let vmSheetMain = this.newVmSheet(sheet);
                return new VmEntityLink(vmSheetMain);
            case 'action':
                let action = this.entities.action(entityName);
                if (action === undefined)
                    return;
                let vmActionMain = this.newVmAction(action);
                return new VmEntityLink(vmActionMain);
            case 'tuid':
                let tuid = this.entities.tuid(entityName);
                if (tuid === undefined)
                    return;
                let vmTuidMain = this.newVmTuid(tuid);
                return new VmEntityLink(vmTuidMain);
            case 'query':
                let query = this.entities.query(entityName);
                if (query === undefined)
                    return;
                let vmQueryMain = this.newVmQuery(query);
                return new VmEntityLink(vmQueryMain);
            case 'book':
                let book = this.entities.book(entityName);
                if (book === undefined)
                    return;
                let vmBookMain = this.newVmBook(book);
                return new VmEntityLink(vmBookMain);
        }
    }
    getUI(type, name) {
        if (this.ui === undefined)
            return;
        let t = this.ui[type];
        if (t === undefined)
            return;
        let { collection } = t;
        if (collection === undefined)
            return;
        return collection[name];
    }
    getUITypeCaption(type) {
        if (this.ui === undefined)
            return;
        let t = this.ui[type];
        if (t === undefined)
            return;
        let { caption } = t;
        return caption;
    }
    get tuidTypeCaption() { return this.getUITypeCaption('tuid') || '数据字典'; }
    get vmTuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmTuidLink(this.newVmTuid(v));
        });
    }
    newVmTuidLink(vmTuid) {
        return new VmEntityLink(vmTuid);
    }
    newVmTuid(tuid) {
        let ui = this.getUI('tuid', tuid.name);
        let vm = ui && ui.main;
        if (vm === undefined)
            vm = VmTuidMain;
        return new vm(this, tuid, ui);
    }
    newVmTuidView(tuid) {
        let ui = this.getUI('tuid', tuid.name);
        let vm = ui && ui.view;
        if (vm === undefined)
            vm = VmTuidView;
        return new vm(this, tuid, ui);
    }
    get sheetTypeCaption() { return this.getUITypeCaption('sheet') || '凭单'; }
    newVmSheetLink(vmSheet) {
        return new VmEntityLink(vmSheet);
    }
    newVmSheet(sheet) {
        let ui = this.getUI('sheet', sheet.name);
        let vm = ui && ui.main;
        if (vm === undefined)
            vm = VmSheetMain;
        return new vm(this, sheet, ui);
    }
    get vmSheetLinks() {
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmSheetLink(this.newVmSheet(v));
        });
    }
    get actionTypeCaption() { return this.getUITypeCaption('action') || '操作'; }
    newVmActionLink(vmAction) {
        return new VmEntityLink(vmAction);
    }
    newVmAction(action) {
        let ui = this.getUI('action', action.name);
        let vm = ui && ui.main;
        if (vm === undefined)
            vm = VmActionMain;
        return new vm(this, action, ui);
    }
    get vmActionLinks() {
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmActionLink(this.newVmAction(v));
        });
    }
    get queryTypeCaption() { return this.getUITypeCaption('query') || '查询'; }
    newVmQueryLink(vmQuery) {
        return new VmEntityLink(vmQuery);
    }
    newVmQuery(query) {
        let ui = this.getUI('query', query.name);
        let vm = ui && ui.main;
        if (vm === undefined)
            vm = VmQueryMain;
        return new vm(this, query, ui);
    }
    get vmQueryLinks() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmQueryLink(this.newVmQuery(v));
        });
    }
    get bookTypeCaption() { return this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见'; }
    newVmBookLink(vmBook) {
        return new VmEntityLink(vmBook);
    }
    newVmBook(book) {
        let ui = this.getUI('book', book.name);
        let vm = ui && ui.main;
        if (vm === undefined)
            vm = VmBookMain;
        return new vm(this, book, ui);
    }
    get vmBookLinks() {
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmBookLink(this.newVmBook(v));
        });
    }
    typeVmTuidControl(tuid) {
        let ui = this.getUI('tuid', tuid.name);
        let typeVmTuidControl = ui && ui.input;
        if (typeVmTuidControl === undefined)
            typeVmTuidControl = VmTuidControl;
        return typeVmTuidControl;
    }
    pickerConfig(tuid) {
        let ui = this.getUI('tuid', tuid.name);
        let pickerConfig = ui && ui.pickerConfig;
        let pc = {
            picker: VmTuidPicker,
            row: JSONContent,
        };
        return _.merge(pc, pickerConfig);
    }
    typeTuidContent(tuid) {
        let ui = this.getUI('tuid', tuid.name);
        let typeTuidContent = ui && ui.content;
        if (typeTuidContent === undefined)
            typeTuidContent = JSONContent;
        return typeTuidContent;
    }
    create(vmType, entity, ui) {
        return __awaiter(this, void 0, void 0, function* () {
            let vm = new vmType(this, entity, ui);
            //await vm.loadSchema();
            return vm;
        });
    }
}
const ApiView = ({ vm }) => {
    let { api, renderLink, linkClick, tuidTypeCaption, vmTuidLinks, sheetTypeCaption, vmSheetLinks, actionTypeCaption, vmActionLinks, queryTypeCaption, vmQueryLinks, bookTypeCaption, vmBookLinks } = vm;
    let linkItem = { render: renderLink, onClick: linkClick };
    let lists = [
        {
            header: tuidTypeCaption,
            items: vmTuidLinks,
        },
        {
            cn: 'my-2',
            header: sheetTypeCaption,
            items: vmSheetLinks
        },
        {
            cn: 'my-2',
            header: actionTypeCaption,
            items: vmActionLinks
        },
        {
            cn: 'my-2',
            header: queryTypeCaption,
            items: vmQueryLinks
        },
        {
            cn: 'mt-2 mb-4',
            header: bookTypeCaption,
            items: vmBookLinks
        }
    ];
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "px-3 py-1 small" }, api),
        lists.map(({ cn, header, items }, index) => React.createElement(List, { key: index, className: cn, header: React.createElement(Muted, null, header), items: items, item: linkItem })));
};
//# sourceMappingURL=vmApi.js.map