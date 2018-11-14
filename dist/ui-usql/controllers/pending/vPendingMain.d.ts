import { Pending } from '../../entities';
import { VEntity } from '../VM';
import { CPending, PendingUI } from './cPending';
export declare class VPendingMain extends VEntity<Pending, PendingUI, CPending> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
