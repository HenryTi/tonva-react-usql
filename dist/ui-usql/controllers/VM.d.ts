import * as React from 'react';
import { Controller, VPage } from 'tonva-tools';
import { Entity, Field } from '../entities';
import { CUsq } from './usq/cUsq';
import { VForm, FieldCall, FormMode } from './form';
import { CQuerySelect } from './query';
import { FormUI } from './formUI';
export declare abstract class ControllerUsq extends Controller {
    constructor(cUsq: CUsq, res: any);
    cUsq: CUsq;
}
export interface EntityUI {
    form?: FormUI;
}
export declare abstract class CEntity<T extends Entity, UI extends EntityUI> extends ControllerUsq {
    constructor(cUsq: CUsq, entity: T, ui: UI, res: any);
    readonly entity: T;
    readonly ui: UI;
    protected beforeStart(): Promise<void>;
    createForm(onSubmit: () => Promise<void>, values?: any, mode?: FormMode): VForm;
    private buildFormOptions;
    private buildInputs;
    private buildFieldsInputs;
    protected buildSelect(field: Field, arr: string): FieldCall;
    protected buildContent(field: Field, arr: string): React.StatelessComponent<any>;
    cQuerySelect(queryName: string): CQuerySelect;
}
export declare abstract class VEntity<T extends Entity, UI extends EntityUI, C extends CEntity<T, UI>> extends VPage<C> {
    protected readonly entity: T;
    protected readonly ui: UI;
    constructor(controller: C);
    readonly label: string;
    protected createForm(onSubmit: () => Promise<void>, values?: any, mode?: FormMode): VForm;
}
