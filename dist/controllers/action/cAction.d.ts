import { CEntity, EntityUI } from "../CVEntity";
import { Action } from "../../entities";
import { VActionMain } from "./vActionMain";
export interface ActionUI extends EntityUI {
    CAction?: typeof CAction;
}
export declare class CAction extends CEntity<Action, ActionUI> {
    protected internalStart(): Promise<void>;
    protected readonly VActionMain: typeof VActionMain;
    submit(values: any): Promise<any>;
}
