import { CrEntity, EntityUI } from "../VM";
import { Book } from "../../entities";
import { VmBookMain } from "./vmBookMain";
export interface BookUI extends EntityUI {
    main: typeof VmBookMain;
}
export declare class CrBook extends CrEntity<Book, BookUI> {
    readonly icon: JSX.Element;
    protected internalStart(): Promise<void>;
    protected readonly VmBookMain: typeof VmBookMain;
}
