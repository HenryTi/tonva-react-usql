import * as React from 'react';
import { Entity, Field } from '../entities';
import { CrUsq } from './usq/crUsq';
import { VmForm, FieldCall } from './form';
import { CrQuerySelect } from './query';
export declare abstract class Coordinator {
    disposer: () => void;
    protected showVm(vm: new (coordinator: Coordinator) => Vm, param?: any): Promise<void>;
    event(type: string, value: any): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected msg(text: string): void;
    protected errorPage(header: string, err: any): void;
    start(param?: any): Promise<void>;
    private _resolve_$;
    call(param?: any): Promise<any>;
    return(value: any): void;
    protected abstract internalStart(param?: any): Promise<void>;
}
export declare abstract class CoordinatorUsq extends Coordinator {
    crUsq: CrUsq;
    constructor(crUsq: CrUsq);
}
export interface EntityUI {
    form?: any;
}
export declare abstract class CrEntity<T extends Entity, UI extends EntityUI> extends CoordinatorUsq {
    constructor(crUsq: CrUsq, entity: T, ui: UI, res: any);
    entity: T;
    ui: UI;
    res: any;
    abstract readonly icon: any;
    readonly label: string;
    start(param?: any): Promise<void>;
    createForm(onSubmit: (values: any) => Promise<void>, values?: any): VmForm;
    private buildFormOptions;
    private buildInputs;
    private buildFieldsInputs;
    protected buildCall(field: Field, arr: string): FieldCall;
    protected buildContent(field: Field, arr: string): React.StatelessComponent<any>;
    protected getRes(): any;
    crQuerySelect(queryName: string): CrQuerySelect;
}
export declare abstract class Vm {
    protected coordinator: Coordinator;
    constructor(coordinator: Coordinator);
    abstract showEntry(param?: any): Promise<void>;
    protected open(view: React.StatelessComponent, param?: any): void;
    protected close(level?: number): void;
    protected event(type: string, value?: any): Promise<void>;
    protected return(value: any): void;
}
export declare type VM = new (coordinator: Coordinator) => Vm;
export declare abstract class VmEntity<T extends Entity, UI extends EntityUI> extends Vm {
    protected coordinator: CrEntity<T, UI>;
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(coordinator: CrEntity<T, UI>);
    readonly label: string;
    private _form_$;
    protected createForm(onSubmit: (values: any) => Promise<void>, values?: any): VmForm;
}
