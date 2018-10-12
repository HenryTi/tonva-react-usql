import { IObservableArray } from 'mobx';
import { Entity } from './entity';
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
    statesCount: IObservableArray<StateCount>;
    curState: string;
    stateSheets: IObservableArray;
    setSchema(schema: any): void;
    build(obj: any): void;
    private createSheetState;
    onMessage(msg: any): Promise<void>;
    private changeStateCount;
    save(discription: string, data: any): Promise<number>;
    action(id: number, flow: number, state: string, action: string): Promise<any>;
    getStateSheets(state: string, pageStart: number, pageSize: number): Promise<void>;
    getStateSheetCount(): Promise<void>;
    private unpack;
    getSheet(id: number): Promise<any>;
    getArchive(id: number): Promise<any>;
    getArchives(pageStart: number, pageSize: number): Promise<any>;
}
