import { History } from '../../entities';
import { VEntity } from '../VM';
import { CHistory, HistoryUI } from './cHistory';
export declare class VHistoryMain extends VEntity<History, HistoryUI, CHistory> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}