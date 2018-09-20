/// <reference types="react" />
import { VEntity } from '../VM';
import { CAction, ActionUI } from './cAction';
import { Action } from '../../entities';
export declare class VActionMain extends VEntity<Action, ActionUI, CAction> {
    private vForm;
    private returns;
    private onSubmit;
    showEntry(param?: any): Promise<void>;
    protected mainPage: () => JSX.Element;
    protected resultPage: () => JSX.Element;
}
