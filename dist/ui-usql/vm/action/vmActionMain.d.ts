/// <reference types="react" />
import { VmEntity } from '../VM';
import { CrAction, ActionUI } from './crAction';
import { Action } from '../../entities';
export declare class VmActionMain extends VmEntity<Action, ActionUI> {
    protected coordinator: CrAction;
    private vmForm;
    private returns;
    private onSubmit;
    showEntry(param?: any): Promise<void>;
    protected mainPage: () => JSX.Element;
    protected resultPage: () => JSX.Element;
}
