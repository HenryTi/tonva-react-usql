import * as React from 'react';
import * as _ from 'lodash';
import { Api } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { ViewModel, JSONContent, TypeContent } from './viewModel';
import { Entities, Tuid, Action, Sheet, Query, Book, Entity } from '../entities';
import { VmLink, VmEntityLink } from './link';
import { VmEntity } from './entity';
import { VmBookMain } from './book';
import { VmSheetMain } from './sheet';
import { VmActionMain } from './action';
import { VmQueryMain } from './query';
import { VmTuidMain } from './tuid';
import { VmApp } from './vmApp';
import { VmFieldsForm, TypeVmFieldsForm, 
    VmTuidControl, TypeVmTuidControl, VmTuidPicker, PickerConfig } from './vmFieldsForm';
import { Field } from './field';
//import { FormRowBuilder } from './vmForm/rowBuilder';
//import { VmTuidControl, TypeVmTuidControl, VmTuidPicker, PickerConfig } from './vmForm/tuid';


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

    async load() {
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
            for (let j in g) {
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

    private getUI(type:string, name:string):any {
        if (this.ui === undefined) return;
        let t = this.ui[type];
        if (t === undefined) return;
        return t[name];
    }

    protected get tuidTypeCaption() { return '数据字典' }
    protected get vmTuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmTuidLink(this.newVmTuid(v))
        });
    }
    newVmTuidLink(vmTuid:VmTuidMain) {
        return new VmEntityLink<VmTuidMain>(vmTuid);
        // 如果需要自己重载，继承类里面可以这么写：
        /*
        switch (tuid.name) {
            // 这里可以写自己特定的定义
            case 'xxx-xxx': return new VmXxx_XxxTuidLink(vmTuid);
            default: super.newVmTuidLink(vmTuid);
        }
        */
    }
    newVmTuid(tuid:Tuid):VmTuidMain {
        let ui = this.getUI('tuid', tuid.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmTuidMain;
        return new vm(this, tuid);
        // 如果需要自己重载，继承类里面可以这么写：
        /*        
        switch (tuid.name) {
            // 这里可以写自己特定的定义
            case 'xxx-xxx': return new VmXxx_XxxTuid(tuid);
            default: super.newVmTuid(tuid);
        }
        */
    }

    protected get sheetTypeCaption() { return '凭单' }
    newVmSheetLink(vmSheet:VmSheetMain) {
        return new VmEntityLink<VmSheetMain>(vmSheet);
    }
    newVmSheet(sheet:Sheet):VmSheetMain {
        let ui = this.getUI('sheet', sheet.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmSheetMain;
        return new vm(this, sheet);
    }
    protected get vmSheetLinks() { 
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmSheetLink(this.newVmSheet(v))
        });
    }

    get actionTypeCaption() { return '操作' }
    newVmActionLink(vmAction:VmActionMain) {
        return new VmEntityLink<VmActionMain>(vmAction);
    }
    newVmAction(action:Action):VmActionMain {
        let ui = this.getUI('action', action.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmActionMain;
        return new vm(this, action);
    }
    protected get vmActionLinks() { 
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmActionLink(this.newVmAction(v))
        });
    }

    get queryTypeCaption() { return '查询' }
    newVmQueryLink(vmQuery:VmQueryMain) {
        return new VmEntityLink<VmQueryMain>(vmQuery);
    }
    newVmQuery(query:Query):VmQueryMain {
        let ui = this.getUI('query', query.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmQueryMain;
        return new vm(this, query);
    }
    protected get vmQueryLinks() { 
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmQueryLink(this.newVmQuery(v))
        });
    }
    
    get bookTypeCaption() { return '帐 - 仅供调试程序使用，普通用户不可见' }
    newVmBookLink(vmBook:VmBookMain) {
        return new VmEntityLink<VmBookMain>(vmBook);
    }
    newVmBook(book:Book):VmBookMain {
        return new VmBookMain(this, book);
    }
    protected get vmBookLinks() { 
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmBookLink(this.newVmBook(v))
        });
    }

    renderLink(vmLink:VmLink, index:number):JSX.Element {
        return vmLink.renderView();
    }

    linkClick(vmLink:VmLink) {
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
/*
    newFormRowBuilder(): FormRowBuilder {
        return new VmApiFormRowBuilder(this);
    }

    get VmForm(): TypeVmForm {
        return VmForm;
    }
*/    
    renderView(): JSX.Element {
        let linkItem = { render: this.renderLink, onClick: this.linkClick };
        let lists = [
            {
                header: this.tuidTypeCaption,
                items: this.vmTuidLinks,
            },
            {
                cn: 'my-2',
                header: this.sheetTypeCaption,
                items: this.vmSheetLinks
            },
            {
                cn: 'my-2',
                header: this.actionTypeCaption,
                items: this.vmActionLinks
            },
            {
                cn: 'my-2',
                header: this.queryTypeCaption,
                items: this.vmQueryLinks
            },
            {
                cn: 'mt-2 mb-4',
                header: this.bookTypeCaption,
                items: this.vmBookLinks
            }
        ];
        return <>
            <div className="px-3 py-1 small">{this.api}</div>
            {lists.map(({cn, header, items},index) => <List
                key={index}
                className={cn}
                header={<Muted>{header}</Muted>}
                items={items}
                item={linkItem} />
            )}
        </>;
/*
            <List className='my-2'
                header={<Muted>{this.sheetTypeCaption}</Muted>}
                items={this.vmSheetLinks}
                item={linkItem} />

            <List className='my-2'
                header={<Muted>{this.actionTypeCaption}</Muted>}
                items={this.vmActionLinks}
                item={linkItem} />

            <List className='my-2'
                header={<Muted>{this.queryTypeCaption}</Muted>}
                items={this.vmQueryLinks}
                item={linkItem} />

            <List className='mt-2 mb-4'
                header={<Muted>{this.bookTypeCaption}</Muted>}
                items={this.vmBookLinks}
                item={linkItem} />
*/
    }
}

/*
export class VmApiFormRowBuilder extends FormRowBuilder {
    protected vmApi: VmApi;
    constructor(vmApi: VmApi) {
        super();
        this.vmApi = vmApi;
    }
*/
/*
    buildRow(vmForm:VmForm, field: Field, ui?: any): VmFormRow {
        let ret: VmFormRow;
        switch (field.type) {
            case 'bigint':
                ret = this.buildTuidInput(vmForm, field, ui);
                if (ret !== undefined) return ret;
                break;
        }
        return super.buildRow(vmForm, field, ui);
    }
*/
/*
    protected typeVmTuidControl(field:Field, tuid:Tuid): TypeVmTuidControl {
        return this.vmApi.typeVmTuidControl(tuid);
    }

    protected typeTuidContent(field:Field, tuid:Tuid): TypeContent {
        return this.vmApi.typeTuidContent(tuid);
    }

    protected pickerConfig(field:Field, tuid:Tuid): PickerConfig {
        return this.vmApi.pickerConfig(tuid);
    }
*/
/*
    protected buildTuidControl(vmForm: VmForm, field: Field, ui: any): VmFormRow {
        let tuidName = field.tuid;
        if (tuidName === undefined) return;
        let tuid = this.vmApi.getTuid(tuidName);
        return new VmFormRowTuidControl(this.vmApi, vmForm, field, ui, tuid, 
            this.typeVmTuidInput(field, tuid),
            this.typeTuidContent(field, tuid),
            this.pickerConfig(field, tuid));
    }
*/
//}

/*
export class VmEntityFormRowBuilder extends VmApiFormRowBuilder {
    protected vmEntity: VmEntity;
    constructor(vmApi: VmApi, vmEntity: VmEntity) {
        super(vmApi);
        this.vmEntity = vmEntity;
    }

    protected typeVmTuidInput(field:Field, tuid:Tuid): TypeVmTuidInput {
        return this.vmEntity.typeVmTuidControl(field, tuid);
    }

    protected typeTuidContent(field:Field, tuid:Tuid): TypeContent {
        return this.vmEntity.typeTuidContent(field, tuid);
    }

    protected pickerConfig(field:Field, tuid:Tuid): PickerConfig {
        return this.vmEntity.pickerConfig(field, tuid);
    }
}
*/