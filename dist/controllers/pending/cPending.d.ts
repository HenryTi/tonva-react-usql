import { CEntity, EntityUI } from "../CVEntity";
import { Pending } from "../../entities";
import { VPendingMain } from "./vPendingMain";
export interface PendingUI extends EntityUI {
    CPending?: typeof CPending;
    main: typeof VPendingMain;
}
export declare class CPending extends CEntity<Pending, PendingUI> {
    protected internalStart(): Promise<void>;
    protected readonly VPendingMain: typeof VPendingMain;
}
