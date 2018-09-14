import * as React from 'react';
import { Entity, Field } from '../entities';
import { CrUsq } from './usq/crUsq';
import { VmForm, FieldCall } from './form';
import { CrQuerySelect } from './query';
import { FormUI } from './formUI';
export declare abstract class Coordinator {
    private receiveHandlerId;
    private disposer;
    protected showVm(vm: new (coordinator: Coordinator) => VmPage, param?: any): Promise<void>;
    protected renderVm(vm: new (coordinator: Coordinator) => VmView, param?: any): JSX.Element;
    event(type: string, value: any): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected msg(text: string): void;
    protected errorPage(header: string, err: any): void;
    protected onMessage(message: any): Promise<void>;
    private onMessageReceive;
    protected beforeStart(): Promise<void>;
    protected abstract internalStart(param?: any): Promise<void>;
    start(param?: any): Promise<void>;
    private _resolve_$;
    call(param?: any): Promise<any>;
    return(value: any): void;
    openPage(page: JSX.Element): void;
    replacePage(page: JSX.Element): void;
    backPage(): void;
    closePage(level?: number): void;
    regConfirmClose(confirmClose: () => Promise<boolean>): void;
}
export declare abstract class CoordinatorUsq extends Coordinator {
    crUsq: CrUsq;
    constructor(crUsq: CrUsq);
}
export interface EntityUI {
    form?: FormUI;
}
export declare abstract class CrEntity<T extends Entity, UI extends EntityUI> extends CoordinatorUsq {
    constructor(crUsq: CrUsq, entity: T, ui: UI, res: any);
    entity: T;
    ui: UI;
    res: any;
    abstract readonly icon: any;
    readonly label: string;
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
export declare abstract class VmView {
    protected coordinator: Coordinator;
    constructor(coordinator: Coordinator);
    abstract render(param?: any): JSX.Element;
    protected event(type: string, value?: any): Promise<void>;
    protected return(value: any): void;
    protected openPage(view: React.StatelessComponent<any>, param?: any): void;
    protected replacePage(view: React.StatelessComponent<any>, param?: any): void;
    protected openPageElement(page: JSX.Element): void;
    protected replacePageElement(page: JSX.Element): void;
    protected backPage(): void;
    protected closePage(level?: number): void;
    protected regConfirmClose(confirmClose: () => Promise<boolean>): void;
}
export declare abstract class VmPage extends VmView {
    constructor(coordinator: Coordinator);
    abstract showEntry(param?: any): Promise<void>;
    render(param?: any): JSX.Element;
}
export declare type VM = new (coordinator: Coordinator) => VmPage;
export declare abstract class VmEntity<T extends Entity, UI extends EntityUI> extends VmPage {
    protected coordinator: CrEntity<T, UI>;
    protected entity: T;
    protected ui: UI;
    protected res: any;
    constructor(coordinator: CrEntity<T, UI>);
    readonly label: string;
    private _form_$;
    protected createForm(onSubmit: (values: any) => Promise<void>, values?: any): VmForm;
}
