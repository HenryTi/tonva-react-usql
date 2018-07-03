import { Entity, Tuid } from '../../entities';
import { ViewModel, TypeContent } from '../viewModel';
import { VmApi } from '../vmApi';
import { VmFieldsForm } from '../vmFieldsForm';
import { Field } from '../field';
import { TypeVmTuidControl, PickerConfig } from '../vmFieldsForm/tuid';
export interface FieldUI {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: any;
}
export interface FieldUIs {
    [name: string]: FieldUI;
}
export declare abstract class VmEntity extends ViewModel {
    protected entity: Entity;
    protected vmApi: VmApi;
    protected ui: any;
    constructor(vmApi: VmApi, entity: Entity, ui?: any);
    protected init(): void;
    nav: <T extends VmEntity>(vmType: new (vmApi: VmApi, entity: Entity) => T) => Promise<void>;
    values: any;
    returns: any;
    protected vmFieldsForm: VmFieldsForm;
    readonly icon: JSX.Element;
    readonly caption: string;
    load(): Promise<void>;
    protected initValues(): void;
    protected buildObservableValues(fields: Field[]): object;
    protected resetValues(): void;
    typeVmTuidControl(field: Field, tuid: Tuid): TypeVmTuidControl;
    typeTuidContent(field: Field, tuid: Tuid): TypeContent;
    pickerConfig(field: Field, tuid: Tuid): PickerConfig;
    renderForm: (className: any) => JSX.Element;
}
export declare function vmLinkIcon(cls: string, faName: string): JSX.Element;
