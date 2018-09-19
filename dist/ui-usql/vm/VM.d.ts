import * as React from 'react';
import { Controller, VPage } from 'tonva-tools';
import { Entity, Field } from '../entities';
import { CrUsq } from './usq/crUsq';
import { VmForm, FieldCall } from './form';
import { CrQuerySelect } from './query';
import { FormUI } from './formUI';
export declare abstract class ControllerUsq extends Controller {
    constructor(crUsq: CrUsq);
    crUsq: CrUsq;
}
export interface EntityUI {
    form?: FormUI;
}
export declare abstract class CrEntity<T extends Entity, UI extends EntityUI> extends ControllerUsq {
    constructor(crUsq: CrUsq, entity: T, ui: UI, res: any);
    entity: T;
    ui: UI;
    res: any;
    protected beforeStart(): Promise<void>;
    createForm(onSubmit: (values: any) => Promise<void>, values?: any): VmForm;
    private buildFormOptions;
    private buildInputs;
    private buildFieldsInputs;
    protected buildCall(field: Field, arr: string): FieldCall;
    protected buildContent(field: Field, arr: string): React.StatelessComponent<any>;
    protected getRes(): any;
    crQuerySelect(queryName: string): CrQuerySelect;
}
export declare abstract class VEntity<T extends Entity, UI extends EntityUI, C extends CrEntity<T, UI>> extends VPage<C> {
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(controller: C);
    readonly label: string;
    private _form_$;
    protected createForm(onSubmit: (values: any) => Promise<void>, values?: any): VmForm;
}
