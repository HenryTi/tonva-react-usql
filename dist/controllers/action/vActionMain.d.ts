import { VForm } from '../form';
import { VEntity } from '../CVEntity';
import { CAction, ActionUI } from './cAction';
import { Action } from '../../entities';
export declare class VActionMain extends VEntity<Action, ActionUI, CAction> {
    protected vForm: VForm;
    protected returns: any;
    showEntry(param?: any): Promise<void>;
    private onSubmit;
    protected mainPage: () => JSX.Element;
    protected resultPage: () => JSX.Element;
}
