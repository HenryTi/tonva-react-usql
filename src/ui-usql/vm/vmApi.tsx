import * as React from 'react';
import * as _ from 'lodash';
import { Api } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { ViewModel, JSONContent, TypeContent } from './viewModel';
import { Entities, Tuid, Action, Sheet, Query, Book, Entity } from '../entities';
import { VmLink, VmEntityLink } from './link';
import { VmBookMain } from './book';
import { VmSheetMain } from './sheet';
import { VmActionMain } from './action';
import { VmQueryMain } from './query';
import { VmTuidMain } from './tuid';
import { VmApp } from './vmApp';
import { VmTuidControl, TypeVmTuidControl, VmTuidPicker, PickerConfig } from './vmForm';
import { VmEntity, EntityUI } from './vmEntity';

export type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book';

export class VmApi extends ViewModel {
    private url:string;
    private access:string;
    private ui:any;
    private entities:Entities;

    constructor(vmApp:VmApp, url:string, api:string, access:string, ui:any) {
        super();
        this.vmApp = vmApp;
        this.url = url;
        this.api = api;
        this.ui = ui;
        this.access = access;

        let token = undefined;
        let apiOwner:string, apiName:string;
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
        let baseUrl = hash===undefined || hash===''? 
            'debug/':'tv/';
        let ws = undefined;     // 新版没有ws了，webSocket都是从单一的中央过来的
        let _api = new Api(baseUrl, url, ws, apiOwner, apiName, true);
        this.entities = new Entities(_api, access);
    }

    api:string;
    vmApp: VmApp;

    async loadSchema() {
        await this.entities.loadEntities();
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
            if (g === undefined) continue;
            let {caption, collection} = g;
            if (collection === undefined) continue;
            for (let j in collection) {
                if (this.entities[i](j) === undefined) {
                    console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                }
            }
        }
    }

    getTuid(name:string) {return this.entities.tuid(name)}

    protected isSysVisible = false;
    protected isVisible(entity: Entity):boolean {
        return entity.sys !== true || this.isSysVisible;
    }

    vmLinkFromName(entityType:EntityType, entityName:string) {
        switch (entityType) {
        case 'sheet':
            let sheet = this.entities.sheet(entityName);
            if (sheet === undefined) return;
            let vmSheetMain = this.newVmSheet(sheet);
            return new VmEntityLink(vmSheetMain);
        case 'action':
            let action = this.entities.action(entityName);
            if (action === undefined) return;
            let vmActionMain = this.newVmAction(action);
            return new VmEntityLink(vmActionMain);
        case 'tuid':
            let tuid = this.entities.tuid(entityName);
            if (tuid === undefined) return;
            let vmTuidMain = this.newVmTuid(tuid);
            return new VmEntityLink(vmTuidMain);
        case 'query':
            let query = this.entities.query(entityName);
            if (query === undefined) return;
            let vmQueryMain = this.newVmQuery(query);
            return new VmEntityLink(vmQueryMain);
        case 'book':
            let book = this.entities.book(entityName);
            if (book === undefined) return;
            let vmBookMain = this.newVmBook(book);
            return new VmEntityLink(vmBookMain);
        }
    }

    private getUI(type:string, name:string):any {
        if (this.ui === undefined) return;
        let t = this.ui[type];
        if (t === undefined) return;
        let {collection} = t;
        if (collection === undefined) return;
        return collection[name];
    }

    private getUITypeCaption(type:EntityType):any {
        if (this.ui === undefined) return;
        let t = this.ui[type];
        if (t === undefined) return;
        let {caption} = t;
        return caption;
    }

    get tuidTypeCaption() { return this.getUITypeCaption('tuid') || '数据字典';  }
    get vmTuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmTuidLink(this.newVmTuid(v))
        });
    }
    newVmTuidLink(vmTuid:VmTuidMain) {
        return new VmEntityLink(vmTuid);
    }
    newVmTuid(tuid:Tuid):VmTuidMain {
        let ui = this.getUI('tuid', tuid.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmTuidMain;
        return new vm(this, tuid, ui);
    }

    get sheetTypeCaption() { return this.getUITypeCaption('sheet') || '凭单'; }
    protected newVmSheetLink(vmSheet:VmSheetMain) {
        return new VmEntityLink(vmSheet);
    }
    newVmSheet(sheet:Sheet):VmSheetMain {
        let ui = this.getUI('sheet', sheet.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmSheetMain;
        return new vm(this, sheet, ui);
    }
    get vmSheetLinks() { 
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmSheetLink(this.newVmSheet(v))
        });
    }

    get actionTypeCaption() { return this.getUITypeCaption('action') || '操作';  }
    newVmActionLink(vmAction:VmActionMain) {
        return new VmEntityLink(vmAction);
    }
    newVmAction(action:Action):VmActionMain {
        let ui = this.getUI('action', action.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmActionMain;
        return new vm(this, action, ui);
    }
    get vmActionLinks() { 
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmActionLink(this.newVmAction(v))
        });
    }

    get queryTypeCaption() { return this.getUITypeCaption('query') || '查询' }
    newVmQueryLink(vmQuery:VmQueryMain) {
        return new VmEntityLink(vmQuery);
    }
    newVmQuery(query:Query):VmQueryMain {
        let ui = this.getUI('query', query.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmQueryMain;
        return new vm(this, query, ui);
    }
    get vmQueryLinks() { 
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmQueryLink(this.newVmQuery(v))
        });
    }
    
    get bookTypeCaption() { return this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见' }
    newVmBookLink(vmBook:VmBookMain) {
        return new VmEntityLink(vmBook);
    }
    newVmBook(book:Book):VmBookMain {
        let ui = this.getUI('book', book.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmBookMain;
        return new vm(this, book, ui);
    }
    get vmBookLinks() { 
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmBookLink(this.newVmBook(v))
        });
    }

    renderLink = (vmLink:VmLink, index:number):JSX.Element => {
        return vmLink.render();
    }

    linkClick = (vmLink:VmLink) => {
        vmLink.onClick();
    }

    typeVmTuidControl(tuid:Tuid): TypeVmTuidControl {
        let ui = this.getUI('tuid', tuid.name);
        let typeVmTuidControl = ui && ui.input;
        if (typeVmTuidControl === undefined) typeVmTuidControl = VmTuidControl;
        return typeVmTuidControl;
    }

    pickerConfig(tuid:Tuid): PickerConfig {
        let ui = this.getUI('tuid', tuid.name);
        let pickerConfig:PickerConfig = ui && ui.pickerConfig;
        let pc:PickerConfig = {
            picker: VmTuidPicker,
            row: JSONContent,
        };
        return _.merge(pc, pickerConfig);
    }

    typeTuidContent(tuid:Tuid): TypeContent {
        let ui = this.getUI('tuid', tuid.name);
        let typeTuidContent = ui && ui.content;
        if (typeTuidContent === undefined) typeTuidContent = JSONContent;
        return typeTuidContent;
    }

    async create<T extends VmEntity>(vmType: new (vmApi:VmApi, entity:Entity, ui:EntityUI) => T,
        entity:Entity, ui:EntityUI): Promise<T> {
        let vm = new vmType(this, entity, ui);
        //await vm.loadSchema();
        return vm;
    }

    nav = async <T extends VmEntity> (vmType: new (vmApi:VmApi, entity:Entity, ui:EntityUI) => T, 
    entity:Entity, ui:EntityUI, param?:any) => {
        let vm = await this.create<T>(vmType, entity, ui);
        vm.start(param);
    }

    protected view = ApiView;
}

const ApiView = ({vm}:{vm:VmApi}) => {
    let {api, renderLink, linkClick, 
        tuidTypeCaption, vmTuidLinks,
        sheetTypeCaption, vmSheetLinks,
        actionTypeCaption, vmActionLinks,
        queryTypeCaption, vmQueryLinks,
        bookTypeCaption, vmBookLinks
    } = vm;
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
    return <>
        <div className="px-3 py-1 small">{api}</div>
        {lists.map(({cn, header, items},index) => <List
            key={index}
            className={cn}
            header={<Muted>{header}</Muted>}
            items={items}
            item={linkItem} />
        )}
    </>;
}
