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
export declare abstract class VmEntity extends VmPage {
    protected entity: Entity;
    protected ui: EntityUI;
    label: string;
    vmApi: VmApi;
    constructor(vmApi: VmApi, entity: Entity, ui?: EntityUI);
    protected init(): void;
    protected getRes(): any;
    protected getLabel(): any;
    protected navVm: <T extends VmEntity>(vmType: new (vmApi: VmApi, entity: Entity, ui: EntityUI) => T, param?: any) => Promise<void>;
    protected createVmFieldsForm(): VmForm;
    protected newVmFieldsForm(): VmForm;
    protected readonly fieldsFormOptions: VmFormOptions;
    start(param?: any): Promise<void>;
    returns: any;
    readonly icon: JSX.Element;
    loadSchema(): Promise<void>;
    typeVmTuidControl(field: Field, tuid: Tuid): TypeVmTuidControl;
    typeTuidContent(field: Field, tuid: Tuid): TypeContent;
    pickerConfig(field: Field, tuid: Tuid): PickerConfig;
}
export declare function vmLinkIcon(cls: string, faName: string): JSX.Element;
