import * as React from 'react';
import { Coordinator, VmPage, VmView } from 'tonva-tools';
import { Entity, Field, TuidMain } from '../entities';
import { CrUsq } from './usq/crUsq';
import { VmForm, FieldInputs, FieldCall, FormOptions } from './form';
import { CrQuerySelect } from './query';
import { FormUI } from './formUI';

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

export abstract class VmEntity<T extends Entity, UI extends EntityUI, C extends CrEntity<T, UI>> extends VmPage<C> {
    //protected coordinator: CrEntity<T, UI>;
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(coordinator: C) {
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
