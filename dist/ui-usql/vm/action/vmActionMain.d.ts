/// <reference types="react" />
import { VEntity } from '../VM';
import { CrAction, ActionUI } from './crAction';
import { Action } from '../../entities';
export declare class VmActionMain extends VEntity<Action, ActionUI, CrAction> {
    private vmForm;
    private returns;
    private onSubmit;
    showEntry(param?: any): Promise<void>;
    protected mainPage: () => JSX.Element;
    protected resultPage: () => JSX.Element;
}
