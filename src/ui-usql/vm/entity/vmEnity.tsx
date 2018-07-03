import * as React from 'react';
import { observable } from 'mobx';
import { FA } from 'tonva-react-form';
import { nav } from 'tonva-tools';
import { Entity, Tuid } from '../../entities';
import { ViewModel, TypeContent } from '../viewModel';
import { VmApi } from '../vmApi';
import { VmFieldsForm, TypeVmFieldsForm } from '../vmFieldsForm';
import { Field } from '../field';
//import { FormRowBuilder } from '../vmForm/rowBuilder';
import { VmTuidControl, TypeVmTuidControl, PickerConfig } from '../vmFieldsForm/tuid';

export interface FieldUI {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: any; //TuidInput;
    //mapper?: FieldMapper;
}
export interface FieldUIs {
    [name:string]: FieldUI;
}

export abstract class VmEntity extends ViewModel {
    protected entity: Entity;
    protected vmApi:VmApi;
    protected ui: any;

    constructor(vmApi:VmApi, entity: Entity, ui?:any) {
        super();
        this.vmApi = vmApi;
        this.entity = entity;
        this.ui = ui;
        this.init();
    }

    protected init() {}

    nav = async <T extends VmEntity> (vmType: new (vmApi:VmApi, entity:Entity) => T) => {
        let vm = new vmType(this.vmApi, this.entity);
        await vm.load();
        nav.push(vm.renderView());
    }

    values: any;
    returns: any;
    protected vmFieldsForm: VmFieldsForm;
    get icon() {return vmLinkIcon('text-info', 'circle-thin')}
    get caption() { return this.entity.name; }

    async load() {
        await this.entity.loadSchema();
        this.initValues();
    }
    protected initValues() {}

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
