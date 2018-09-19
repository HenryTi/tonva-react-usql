/// <reference types="react" />
import { CEntity, EntityUI } from "../VM";
import { Book } from "../../entities";
import { VBookMain } from "./vBookMain";
export interface BookUI extends EntityUI {
    main: typeof VBookMain;
}
export declare class CBook extends CEntity<Book, BookUI> {
    readonly icon: JSX.Element;
    protected internalStart(): Promise<void>;
    protected readonly VmBookMain: typeof VBookMain;
}
