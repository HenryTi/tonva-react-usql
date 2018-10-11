import * as React from 'react';
import { Controller, VPage, View } from 'tonva-tools';
import { Entity, Field, TuidMain } from '../entities';
import { CUsq } from './usq/cUsq';
import { VForm, FieldInputs, FieldCall, FormOptions, FormMode } from './form';
import { CQuerySelect } from './query';
import { FormUI } from './formUI';

export abstract class ControllerUsq extends Controller{
    constructor(cUsq: CUsq) {
        super();
        this.cUsq = cUsq;
    }
    cUsq: CUsq;
}

export interface EntityUI {
    form?: FormUI;
    //label: string;
    //res?: any;
}

export abstract class CEntity<T extends Entity, UI extends EntityUI> extends ControllerUsq {
    constructor(cUsq: CUsq, entity: T, ui?: UI, res?: any) {
        super(cUsq);
        this.entity = entity;
        let entityUI = cUsq.getUI<T, UI>(entity);
        this.ui = ui || entityUI.ui;
        this.res = res || entityUI.res;
        this.label = (this.res && this.res.label) || entity.name;
    }
    entity: T;
    ui: UI;
    res: any;

    protected async beforeStart() {
        await super.beforeStart();
        await this.entity.loadSchema();
    }

    createForm(onSubmit:()=>Promise<void>, values?:any, mode?:FormMode) {
        let options = this.buildFormOptions(mode);
        let ret = new VForm(options, onSubmit);
        ret.setValues(values);
        return ret;
    }

    private buildFormOptions(mode?:FormMode):FormOptions {
        let {fields, arrFields} = this.entity;
        let none, submitCaption, arrNewCaption, arrEditCaption, arrTitleNewButton;
        if (this.res !== undefined) {
            none = this.res['none'];
            submitCaption = this.res['submit'];
            arrNewCaption = this.res['arrNew'];
            arrEditCaption = this.res['arrEdit'];
            arrTitleNewButton = this.res['arrTitleNewButton'];
        }
        if (none === undefined) {
            none = this.cUsq.res['none'] || 'none';
        }
        if (submitCaption === undefined)
            submitCaption = this.cUsq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.cUsq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.cUsq.res['arrEdit'] || 'Edit';
        if (arrTitleNewButton === undefined)
        arrTitleNewButton = this.cUsq.res['arrTitleNewButton'];
        if (mode === undefined) mode = FormMode.new;
        let ret:FormOptions = {
            fields: fields,
            arrs: arrFields,
            ui: this.ui && this.ui.form,
            res: this.res || {},
            inputs: this.buildInputs(),
            none: none,
            submitCaption: submitCaption,
            arrNewCaption: arrNewCaption,
            arrEditCaption: arrEditCaption,
            arrTitleNewButton: arrTitleNewButton,
            mode: mode,
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
            let {name, _tuid} = field;
            if (_tuid === undefined) continue;
            ret[name] = {
                select: this.buildSelect(field, arr),
                content: this.buildContent(field, arr),
                placeHolder: this.cUsq.getTuidPlaceHolder(_tuid),
            };
        }
    }

    protected buildSelect(field:Field, arr:string):FieldCall {
        return async (form:VForm, field:Field, values:any):Promise<any> => {
            let {_tuid, _ownerField} = field;
            let cTuidSelect = this.cUsq.cTuidSelect(_tuid);
            let ownerValue:any = undefined;
            if (_ownerField !== undefined) ownerValue = form.getValue(_ownerField.name);
            let ret = await cTuidSelect.call(ownerValue);
            if (ret === undefined) return undefined;
            let id = cTuidSelect.idFromItem(ret);
            _tuid.useId(id);
            return id;
        };
    }

    protected buildContent(field:Field, arr:string): React.StatelessComponent<any> {
        return;
    }

    protected getRes() {
        return this.res;
    }

    cQuerySelect(queryName:string):CQuerySelect {
        return this.cUsq.cQuerySelect(queryName);
    }
}

export abstract class VEntity<T extends Entity, UI extends EntityUI, C extends CEntity<T, UI>> extends VPage<C> {
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(controller: C) {
        super(controller);
        this.entity = controller.entity;
        this.ui = controller.ui;
        this.res = controller.res;
    }

    get label():string {return this.controller.label}

    //private _form_$: VForm;
    protected createForm(onSubmit:()=>Promise<void>, values?:any, mode?:FormMode): VForm {
        //if (this._form_$ !== undefined) return this._form_$;
        return this.controller.createForm(onSubmit, values, mode);
    }
}
