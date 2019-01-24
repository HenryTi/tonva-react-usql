import { CEntity, EntityUI } from "../CVEntity";
import { Book } from "../../entities";
import { VBookMain } from "./vBookMain";
export interface BookUI extends EntityUI {
    CBook?: typeof CBook;
    main: typeof VBookMain;
}
export declare class CBook extends CEntity<Book, BookUI> {
    protected internalStart(): Promise<void>;
    protected readonly VBookMain: typeof VBookMain;
}
