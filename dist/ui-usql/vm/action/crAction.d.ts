import { CrEntity, EntityUI } from "../VM";
import { Action } from "../../entities";
import { VmActionMain } from "./vmActionMain";
export interface ActionUI extends EntityUI {
}
export declare class CrAction extends CrEntity<Action, ActionUI> {
    readonly icon: JSX.Element;
    protected internalStart(): Promise<void>;
    protected readonly VmActionMain: typeof VmActionMain;
    submit(values: any): Promise<any>;
}
