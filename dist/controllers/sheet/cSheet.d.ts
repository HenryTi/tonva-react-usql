import { IObservableArray } from "mobx";
import { TypeVPage, PageItems } from 'tonva-tools';
import { Sheet, StateCount } from "../../entities";
import { CEntity, EntityUI } from "../CVEntity";
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
    CSheet?: typeof CSheet;
    states?: {
        [name: string]: StateUI;
    };
    main?: TypeVPage<CSheet>;
    sheetNew?: TypeVPage<CSheet>;
    sheetSaved?: TypeVPage<CSheet>;
    sheetEdit?: TypeVPage<CSheet>;
    sheetAction?: TypeVPage<CSheet>;
    listRow?: (row: any) => JSX.Element;
    sheetTitle?: (sheetValues: any, x: any) => string;
}
export interface SheetData {
    brief: any;
    data: any;
    flows: any[];
}
export declare class CSheet extends CEntity<Sheet, SheetUI> {
    statesCount: IObservableArray<StateCount>;
    curState: string;
    pageStateItems: PageItems<any>;
    protected internalStart(): Promise<void>;
    protected onMessage(msg: any): Promise<void>;
    private onSheet;
    private sheetActPreState;
    private sheetActState;
    private changeStateCount;
    protected readonly VSheetMain: TypeVPage<CSheet>;
    protected readonly VSheetNew: TypeVPage<CSheet>;
    protected readonly VSheetSaved: TypeVPage<CSheet>;
    protected readonly VSheetEdit: TypeVPage<CSheet>;
    protected readonly VSheetSchema: TypeVPage<CSheet>;
    protected readonly VArchives: TypeVPage<CSheet>;
    protected readonly VArchived: TypeVPage<CSheet>;
    protected readonly VSheetList: TypeVPage<CSheet>;
    protected readonly VSheetAction: TypeVPage<CSheet>;
    protected readonly VSheetProcessing: TypeVPage<CSheet>;
    protected onEvent(type: string, value: any): Promise<void>;
    startSheet(sheetId: number): Promise<void>;
    showAction(sheetId: number): Promise<void>;
    showProcessing(sheetId: number): Promise<void>;
    editSheet(sheetData: SheetData): Promise<any>;
    showArchived(inBrief: any): Promise<void>;
    onSave: (values: any, valuesWithBox: any) => Promise<void>;
    showSaved(sheetData: any): Promise<void>;
    private getStateUI;
    getStateLabel(stateName: string): any;
    getActionLabel(stateName: string, actionName: string): any;
    private loadStateSheetCount;
    getSheetData(sheetId: number): Promise<SheetData>;
    getArchived(sheetId: number): Promise<SheetData>;
    saveSheet(values: any, valuesWithBox: any): Promise<any>;
    action(id: number, flow: number, state: string, actionName: string): Promise<any>;
}
