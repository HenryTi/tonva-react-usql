import { Pending } from '../../entities';
import { VEntity } from '../CVEntity';
import { CPending, PendingUI } from './cPending';
export declare class VPendingMain extends VEntity<Pending, PendingUI, CPending> {
    open(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
