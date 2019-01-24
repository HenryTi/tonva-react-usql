import { CEntity, EntityUI } from "../CVEntity";
import { History } from "../../entities";
import { VHistoryMain } from "./vHistoryMain";
export interface HistoryUI extends EntityUI {
    CHistory?: typeof CHistory;
    main: typeof VHistoryMain;
}
export declare class CHistory extends CEntity<History, HistoryUI> {
    protected internalStart(): Promise<void>;
    protected readonly VHistoryMain: typeof VHistoryMain;
}
