import * as React from 'react';
import { Coordinator, VmPage } from 'tonva-tools';
import { Entity, Field } from '../entities';
import { CrUsq } from './usq/crUsq';
import { VmForm, FieldCall } from './form';
import { CrQuerySelect } from './query';
import { FormUI } from './formUI';
export declare abstract class CoordinatorUsq extends Coordinator {
    constructor(crUsq: CrUsq);
    crUsq: CrUsq;
}
export interface EntityUI {
    form?: FormUI;
}
export declare abstract class CrEntity<T extends Entity, UI extends EntityUI> extends CoordinatorUsq {
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
export declare abstract class VmEntity<T extends Entity, UI extends EntityUI, C extends CrEntity<T, UI>> extends VmPage<C> {
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(coordinator: C);
    readonly label: string;
    private _form_$;
    protected createForm(onSubmit: (values: any) => Promise<void>, values?: any): VmForm;
}
