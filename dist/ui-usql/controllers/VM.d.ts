import * as React from 'react';
import { Controller, VPage } from 'tonva-tools';
import { Entity, Field } from '../entities';
import { CUsq } from './usq/cUsq';
import { VForm, FieldCall } from './form';
import { CQuerySelect } from './query';
import { FormUI } from './formUI';
export declare abstract class ControllerUsq extends Controller {
    constructor(cUsq: CUsq);
    cUsq: CUsq;
}
export interface EntityUI {
    form?: FormUI;
}
export declare abstract class CEntity<T extends Entity, UI extends EntityUI> extends ControllerUsq {
    constructor(cUsq: CUsq, entity: T, ui?: UI, res?: any);
    entity: T;
    ui: UI;
    res: any;
    protected beforeStart(): Promise<void>;
    createForm(onSubmit: (values: any) => Promise<void>, values?: any, readonly?: boolean): VForm;
    private buildFormOptions;
    private buildInputs;
    private buildFieldsInputs;
    protected buildSelect(field: Field, arr: string): FieldCall;
    protected buildContent(field: Field, arr: string): React.StatelessComponent<any>;
    protected getRes(): any;
    cQuerySelect(queryName: string): CQuerySelect;
}
export declare abstract class VEntity<T extends Entity, UI extends EntityUI, C extends CEntity<T, UI>> extends VPage<C> {
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(controller: C);
    readonly label: string;
    private _form_$;
    protected createForm(onSubmit: (values: any) => Promise<void>, values?: any): VForm;
}
