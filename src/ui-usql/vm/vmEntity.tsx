import * as React from 'react';
import { observable } from 'mobx';
import { FA } from 'tonva-react-form';
import { nav } from 'tonva-tools';
import { Entity, Tuid } from '../entities';
import { ViewModel, TypeContent } from './viewModel';
import { VmApi } from './vmApi';
import { VmForm, TypeVmFieldsForm, VmFormOptions } from './vmForm';
import { Field } from './field';
import { VmTuidControl, TypeVmTuidControl, PickerConfig } from './vmForm';

export interface FieldUIO {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: any; //TuidInput;
    //mapper?: FieldMapper;
}
export interface FieldUIs {
    [name:string]: FieldUIO;
}

export interface EntityUI {
    label: string;
    res: any;
}

export abstract class VmEntity extends ViewModel {
    protected entity: Entity;
    protected ui: EntityUI;
    label: string;
    vmApi:VmApi;

    constructor(vmApi:VmApi, entity: Entity, ui?:EntityUI) {
        super();
        this.vmApi = vmApi;
        this.entity = entity;
        this.ui = ui;
        this.label = this.getLabel();
        this.init();
    }

    protected init() {}
    protected getRes() {
        return this.ui && this.ui.res;
    }
    protected getLabel() {
        let res = this.getRes();
        return (res && res.label) || this.entity.name;
    }

    protected nav = async <T extends VmEntity>(vmType: new (vmApi:VmApi, entity:Entity, ui:EntityUI) => T, param?:any) => {
        await this.vmApi.nav(vmType, this.entity, this.ui);
    }

    protected createVmFieldsForm() {
        let ret = this.newVmFieldsForm();
        ret.init(this.fieldsFormOptions);
        return ret;
    }

    protected newVmFieldsForm():VmForm {
        return new VmForm();
    }

    protected get fieldsFormOptions():VmFormOptions {
        let {schema} = this.entity;
        let {fields, arrs} = schema;
        return {
            fields: fields,
            arrs: arrs,
            vmApi: this.vmApi,
            ui: this.ui && this.ui.res,
        }
    }

    async start(param?:any):Promise<void> {
        await this.loadSchema();
        await this.beforeStart(param);
        await this.show();
    }

    async beforeStart(param?:any):Promise<void> {
    }

    async show() {
        nav.push(this.render());
    }

    values: any;
    returns: any;
    get icon() {return vmLinkIcon('text-info', 'circle-thin')}

    async loadSchema() {
        await this.entity.loadSchema();
        this.buildValuesFromSchema();
    }
    protected buildValuesFromSchema() {}

    protected buildObservableValues(fields: Field[]): object {
        let len = fields.length;
        let v: {[p:string]: any} = {};
        for (let i=0; i<len; i++) {
            v[fields[i].name] = null;
        }
        return observable(v);
    }

    protected resetValues() {
        for (let i in this.values) {
            this.values[i] = null;
        }
    }
/*
    protected fieldFaces: FieldUIs;
    protected mapFields(schemaFields: any[]): any[] {
        if (schemaFields === undefined) return;
        let nfc = this.fieldFaces;
        return schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined && nfc[sf.name]));
    }

    protected tfmMap(sf: any, ff: FieldUI) {
        let ret: any;
        let { type, tuid, url } = sf;
        //let tuidInput: TuidInput = {};
        //let tfm = this.typeFieldMappers;
        let face;
        if (ff === undefined) {
            let fm = undefined; //tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            face = ret.face;
            if (face === undefined) ret.face = face = {};
        }
        else {
            let fm = undefined; //ff.mapper || tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            let { label, notes, placeholder, input } = ff;
            if (label !== undefined) ret.label = label;
            face = ret.face;
            if (face !== undefined) {
                if (notes !== undefined) face.notes = notes;
                if (placeholder !== undefined) face.placeholder = placeholder;
                //if (input !== undefined) _.merge(tuidInput, input);
            }
        }
        if (tuid !== undefined) {
            return;
        }
        if (sf.null === false) {
            ret.field.required = true;
        }
        return ret;
    }
*/
    typeVmTuidControl(field:Field, tuid:Tuid): TypeVmTuidControl {
        return this.vmApi.typeVmTuidControl(tuid);
    }

    typeTuidContent(field:Field, tuid:Tuid): TypeContent {
        return this.vmApi.typeTuidContent(tuid);
    }

    pickerConfig(field:Field, tuid:Tuid): PickerConfig {
        return this.vmApi.pickerConfig(tuid);
    }
/*
    protected newFormRowBuilder(): FormRowBuilder {
        return new VmEntityFormRowBuilder(this.vmApi, this);
    }

    get VmForm(): TypeVmFieldsForm {
        return this.vmApi.VmForm;
    }

    async submit() {}

    onSubmitClick = async () => {
        await this.submit();
    }

    newSubmitButton():JSX.Element {
        return <SubmitButton onSubmitClick={this.onSubmitClick} />;
    }
*/

    /*
    newVmForm(fields:Field[], fieldUIs:any[], className:string):VmForm {
        return new this.VmForm(this.values, fields, this.newSubmitButton(), fieldUIs, className, this.newFormRowBuilder());
    }
    renderForm = (className) => {
        let fieldUIs:any[] = undefined;
        this.vmForm = this.newVmForm(
            this.entity.schema.fields, fieldUIs, className);
        return this.vmForm.renderView();
    }
    */
    renderForm = (className) => <div>old VMForm</div>;
}

export function vmLinkIcon(cls:string, faName:string) {
    return <FA className={cls} size="lg" name={faName} fixWidth={true} />;
}

const SubmitButton = ({onSubmitClick}) => <button className="btn btn-primary"
    type="button"
    onClick={onSubmitClick}>
        提交
</button>;
