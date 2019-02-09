import * as React from 'react';
import { VPage } from 'tonva-tools';
import { Entity, Field } from '../entities';
import { CUq } from './uq/cUq';
import { VForm, FieldCall, FormMode } from './form';
import { CQuerySelect } from './query';
import { FormUI, FieldTuidUI } from './formUI';
import { ControllerUq } from './ControllerUq';
export interface EntityUI {
    form?: FormUI;
}
export declare abstract class CEntity<T extends Entity, UI extends EntityUI> extends ControllerUq {
    constructor(cUq: CUq, entity: T, ui: UI, res: any);
    readonly entity: T;
    readonly ui: UI;
    protected beforeStart(): Promise<boolean>;
    createForm(onSubmit: () => Promise<void>, values?: any, mode?: FormMode): VForm;
    private buildFormOptions;
    private buildInputs;
    private buildFieldsInputs;
    protected buildSelect(field: Field, arr: string, fieldUI: FieldTuidUI): FieldCall;
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
