import { Entity } from './entity';
import { PageItems } from 'tonva-tools';
export interface SheetState {
    name: string;
    actions: SheetAction[];
}
export interface SheetAction {
    name: string;
}
export interface StateCount {
    state: string;
    count: number;
}
export declare class Sheet extends Entity {
    readonly typeName: string;
    states: SheetState[];
    setSchema(schema: any): void;
    build(obj: any): void;
    private createSheetState;
    save(discription: string, data: any): Promise<any>;
    action(id: number, flow: number, state: string, action: string): Promise<any>;
    private unpack;
    getSheet(id: number): Promise<any>;
    getArchive(id: number): Promise<any>;
    getArchives(pageStart: number, pageSize: number): Promise<any>;
    getStateSheets(state: string, pageStart: number, pageSize: number): Promise<any[]>;
    createPageStateItems<T>(): PageStateItems<T>;
    stateSheetCount(): Promise<StateCount[]>;
}
export declare class PageStateItems<T> extends PageItems<T> {
    private sheet;
    constructor(sheet: Sheet);
    protected load(param: any, pageStart: any, pageSize: number): Promise<any[]>;
    protected setPageStart(item: any): void;
}
