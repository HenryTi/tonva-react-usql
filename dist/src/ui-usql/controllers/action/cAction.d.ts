/// <reference types="react" />
import { CEntity, EntityUI } from "../VM";
import { Action } from "../../entities";
import { VActionMain } from "./vActionMain";
export interface ActionUI extends EntityUI {
    CAction?: typeof CAction;
}
export declare class CAction extends CEntity<Action, ActionUI> {
    readonly icon: JSX.Element;
    protected internalStart(): Promise<void>;
    protected readonly VActionMain: typeof VActionMain;
    submit(values: any): Promise<any>;
}
