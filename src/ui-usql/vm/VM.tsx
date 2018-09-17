import * as React from 'react';
import { nav, Page } from 'tonva-tools';
import { Entity, Field, TuidMain } from '../entities';
import { CrUsq } from './usq/crUsq';
import { VmForm, FieldInputs, FieldCall, FormOptions } from './form';
import { CrQuerySelect } from './query';
import { FormUI } from './formUI';

export abstract class Coordinator {
    icon: string|JSX.Element;
    label:string;

    private receiveHandlerId:number;
    private disposer = () => {
        // message listener的清理
        nav.unregisterReceiveHandler(this.receiveHandlerId);
    }

    protected async showVm(vm: new (coordinator: Coordinator)=>VmPage, param?:any):Promise<void> {
        await (new vm(this)).showEntry(param);
    }

    protected renderVm(vm: new (coordinator: Coordinator)=>VmView, param?:any) {
        return (new vm(this)).render(param);
    }

    async event(type:string, value:any) {
        await this.onEvent(type, value);
    }

    protected async onEvent(type:string, value:any) {
    }

    protected msg(text:string) {
        alert(text);
    }
    protected errorPage(header:string, err:any) {
        this.openPage(<Page header="App error!">
            <pre>
                {typeof err === 'string'? err : err.message}
            </pre>
        </Page>);
    }

    protected onMessage(message:any):Promise<void> {
        return;
    }

    private onMessageReceive = async (message:any):Promise<void> => {
        await this.onMessage(message);
    }
    protected async beforeStart() {
        this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
    }
    protected abstract internalStart(param?:any):Promise<void>;
    async start(param?:any):Promise<void> {
        await this.beforeStart();
        await this.internalStart(param);
    }

    private _resolve_$:(value:any) => void;
    async call(param?:any):Promise<any> {
        return new Promise<any> (async (resolve, reject) => {
            this._resolve_$ = resolve;
            await this.start(param);
        });
    }

    return(value:any) {
        if (this._resolve_$ === undefined) {
            alert('the Coordinator call already returned, or not called');
            return;
        }
        this._resolve_$(value);
        this._resolve_$ = undefined;
    }

    openPage(page:JSX.Element) {
        nav.push(page, this.disposer);
        this.disposer = undefined;
    }

    replacePage(page:JSX.Element) {
        nav.replace(page, this.disposer);
        this.disposer = undefined;
    }

    backPage() {
        nav.back();
    }

    closePage(level?:number) {
        nav.pop(level);
    }

    regConfirmClose(confirmClose: ()=>Promise<boolean>) {
        nav.regConfirmClose(confirmClose);
    }
}

export abstract class CoordinatorUsq extends Coordinator{
    constructor(crUsq: CrUsq) {
        super();
        this.crUsq = crUsq;
    }
    crUsq: CrUsq;
}

export interface EntityUI {
    form?: FormUI;
    //label: string;
    //res?: any;
}

export abstract class CrEntity<T extends Entity, UI extends EntityUI> extends CoordinatorUsq {
    constructor(crUsq: CrUsq, entity: T, ui: UI, res: any) {
        super(crUsq);
        this.entity = entity;
        this.ui = ui;
        this.res = res;
        this.label = (res && res.label) || entity.name;
    }
    entity: T;
    ui: UI;
    res: any;

    protected async beforeStart() {
        await super.beforeStart();
        await this.entity.loadSchema();
    }

    createForm(onSubmit:(values:any)=>Promise<void>, values?:any) {
        let ret = new VmForm(this.buildFormOptions(), onSubmit);
        ret.setValues(values);
        return ret;
    }

    private buildFormOptions():FormOptions {
        let {fields, arrFields} = this.entity;
        let submitCaption, arrNewCaption, arrEditCaption;
        if (this.res !== undefined) {
            submitCaption = this.res['submit'];
            arrNewCaption = this.res['arrNew'];
            arrEditCaption = this.res['arrEdit'];
        }
        if (submitCaption === undefined)
            submitCaption = this.crUsq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.crUsq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.crUsq.res['arrEdit'] || 'Edit';
        let ret:FormOptions = {
            fields: fields,
            arrs: arrFields,
            ui: this.ui && this.ui.form,
            res: this.res || {},
            inputs: this.buildInputs(),
            submitCaption: submitCaption,
            arrNewCaption: arrNewCaption,
            arrEditCaption: arrEditCaption,
        }
        return ret;
    }

    private buildInputs():FieldInputs {
        let {fields, arrFields} = this.entity;
        let ret:FieldInputs = {};
        this.buildFieldsInputs(ret, fields, undefined);
        if (arrFields !== undefined) {
            for (let arr of arrFields) {
                let {name, fields} = arr;
                this.buildFieldsInputs(ret, fields, name);
            }
        }
        return ret;
    }

    private buildFieldsInputs(ret:FieldInputs, fields:Field[], arr:string) {
        if (arr !== undefined) {
            let arrFieldInputs = ret[arr];
            if (arrFieldInputs === undefined) {
                ret[arr] = arrFieldInputs = {};
                ret = arrFieldInputs;
            }
        }
        for (let field of fields) {
            let {name, tuid, _tuid} = field;
            if (tuid === undefined) continue;
            //let fn = arr === undefined? name : arr+'.'+name;
            ret[name] = {
                call: this.buildCall(field, arr),
                content: this.buildContent(field, arr),
                nullCaption: this.crUsq.getTuidNullCaption(_tuid),
            };
        }
    }

    protected buildCall(field:Field, arr:string):FieldCall {
        let {_tuid} = field;
        return async (form:VmForm, field:string, values:any):Promise<any> => {
            let crTuidSelect = this.crUsq.crTuidSelect(_tuid as TuidMain);
            let ret = await crTuidSelect.call();
            let id = ret.id;
            _tuid.useId(id);
            return id;
        };
    }

    protected buildContent(field:Field, arr:string): React.StatelessComponent<any> {
        //return this.crUsq.getTuidContent(field._tuid);
        //return JSONContent;
        return;
    }

    protected getRes() {
        return this.res;
    }

    crQuerySelect(queryName:string):CrQuerySelect {
        return this.crUsq.crQuerySelect(queryName);
    }
}

export abstract class VmView {
    protected coordinator: Coordinator;

    constructor(coordinator: Coordinator) {
        this.coordinator = coordinator;
    }

    abstract render(param?:any): JSX.Element;

    protected async event(type:string, value?:any) {
        /*
        if (this._resolve_$_ !== undefined) {
            await this._resolve_$_({type:type, value:value});
            return;
        }*/
        await this.coordinator.event(type, value);
    }

    protected return(value:any) {
        this.coordinator.return(value);
    }

    protected openPage(view: React.StatelessComponent<any>, param?:any) {
        this.coordinator.openPage(React.createElement(view, param));
    }

    protected replacePage(view: React.StatelessComponent<any>, param?:any) {
        this.coordinator.replacePage(React.createElement(view, param));
    }

    protected openPageElement(page: JSX.Element) {
        this.coordinator.openPage(page);
    }

    protected replacePageElement(page: JSX.Element) {
        this.coordinator.replacePage(page);
    }

    protected backPage() {
        this.coordinator.backPage();
    }

    protected closePage(level?:number) {
        this.coordinator.closePage(level);
    }

    protected regConfirmClose(confirmClose: ()=>Promise<boolean>) {
        this.coordinator.regConfirmClose(confirmClose);
    }
}

export abstract class VmPage extends VmView {
    constructor(coordinator: Coordinator) {
        super(coordinator);
    }

    abstract showEntry(param?:any):Promise<void>;

    render(param?:any):JSX.Element {return null;}
}

export type VM = new (coordinator: Coordinator)=>VmPage;

export abstract class VmEntity<T extends Entity, UI extends EntityUI> extends VmPage {
    protected coordinator: CrEntity<T, UI>;
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(coordinator: CrEntity<T, UI>) {
        super(coordinator);
        this.entity = coordinator.entity;
        this.ui = coordinator.ui;
        this.res = coordinator.res;
    }

    get label():string {return this.coordinator.label}

    private _form_$: VmForm;
    protected createForm(onSubmit:(values:any)=>Promise<void>, values?:any): VmForm {
        if (this._form_$ !== undefined) return this._form_$;
        return this.coordinator.createForm(onSubmit, values);
    }
}
