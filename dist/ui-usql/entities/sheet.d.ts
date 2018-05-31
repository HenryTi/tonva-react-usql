import { IObservableArray } from 'mobx';
import { Entity } from './entity';
export interface SheetState {
    name: string;
    actions: SheetAction[];
}
export interface SheetAction {
    name: string;
}
export declare class Sheet extends Entity {
    statesCount: IObservableArray;
    curState: string;
    stateSheets: IObservableArray;
    states: SheetState[];
    setStates(states: SheetState[]): void;
    private setStateAccess(s, s1);
    onReceive(data: any): Promise<void>;
    private changeStateCount(state, delta);
    save(discription: string, data: any): Promise<number>;
    action(id: number, flow: number, state: string, action: string): Promise<any>;
    getStateSheets(state: string, pageStart: number, pageSize: number): Promise<void>;
    getStateSheetCount(): Promise<void>;
    private unpack(data);
    getSheet(id: number): Promise<any>;
    getArchive(id: number): Promise<any>;
    getArchives(pageStart: number, pageSize: number): Promise<any>;
}
