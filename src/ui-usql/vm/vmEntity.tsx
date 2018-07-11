import * as React from 'react';
import { observable } from 'mobx';
import { FA } from 'tonva-react-form';
import { } from 'tonva-tools';
import { Entity, Tuid } from '../entities';
import { TypeContent } from './viewModel';
import { VmApi } from './vmApi';
import { VmForm, VmFormOptions, TypeVmTuidControl, PickerConfig } from './vmForm';
import { Field } from './field';
import { VmPage } from './vmPage';

export interface EntityUI {
    label: string;
    res: any;
}

export abstract class VmEntity extends VmPage {
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

    protected navVm = async <T extends VmEntity>(vmType: new (vmApi:VmApi, entity:Entity, ui:EntityUI) => T, param?:any) => {
        await this.vmApi.navVm(vmType, this.entity, this.ui, param);
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
        await super.start(param);
    }

    returns: any;
    get icon() {return vmLinkIcon('text-info', 'circle-thin')}

    async loadSchema() {
        await this.entity.loadSchema();
    }

    typeVmTuidControl(field:Field, tuid:Tuid): TypeVmTuidControl {
        return this.vmApi.typeVmTuidControl(tuid);
    }

    typeTuidContent(field:Field, tuid:Tuid): TypeContent {
        return this.vmApi.typeTuidContent(tuid);
    }

    pickerConfig(field:Field, tuid:Tuid): PickerConfig {
        return this.vmApi.pickerConfig(tuid);
    }
    //renderForm = (className) => <div>old VMForm</div>;
}

export function vmLinkIcon(cls:string, faName:string) {
    return <FA className={cls} size="lg" name={faName} fixWidth={true} />;
}
