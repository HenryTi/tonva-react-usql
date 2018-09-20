/// <reference types="react" />
import { IObservableArray } from "mobx";
import { Sheet, StateCount } from "../../entities";
import { CEntity, EntityUI } from "../VM";
import { VSheetMain } from "./vMain";
import { VSheetNew } from "./vNew";
import { VSheetEdit } from "./vEdit";
import { VSheetAction } from "./vSheetAction";
import { VSheetSchema } from "./vSchema";
import { VArchives } from "./vArchives";
import { VSheetList } from "./vList";
import { VArchived } from "./vArchived";
export interface SheetActionUI {
    label: string;
}
export interface StateUI {
    label: string;
    actions: {
        [name: string]: SheetActionUI;
    };
}
export interface SheetUI extends EntityUI {
    states?: {
        [name: string]: StateUI;
    };
    main?: typeof VSheetMain;
    new?: typeof VSheetNew;
    edit?: typeof VSheetEdit;
    action?: typeof VSheetAction;
}
export declare class CSheet extends CEntity<Sheet, SheetUI> {
    readonly icon: JSX.Element;
    protected internalStart(): Promise<void>;
    protected readonly VSheetMain: typeof VSheetMain;
    protected onMessage(msg: any): Promise<void>;
    protected readonly VSheetNew: typeof VSheetNew;
    protected readonly VSheetEdit: typeof VSheetEdit;
    protected readonly VSheetSchema: typeof VSheetSchema;
    protected readonly VArchives: typeof VArchives;
    protected readonly VArchived: typeof VArchived;
    protected readonly VSheetList: typeof VSheetList;
    protected readonly VSheetAction: typeof VSheetAction;
    protected onEvent(type: string, value: any): Promise<void>;
    startSheet(sheetId: number): Promise<void>;
    private getStateUI;
    getStateLabel(stateName: string): any;
    getActionLabel(stateName: string, actionName: string): any;
    getStateSheetCount(): Promise<void>;
    getSheetData(sheetId: number): Promise<any>;
    getArchived(sheetId: number): Promise<{
        brief: any;
        data: any;
        flows: any[];
    }>;
    saveSheet(values: any): Promise<number>;
    action(id: number, flow: number, state: string, actionName: string): Promise<any>;
    readonly statesCount: IObservableArray<StateCount>;
}
