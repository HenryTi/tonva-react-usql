import { Sheet } from "../../entities";
import { CrEntity, EntityUI } from "../VM";
import { VmSheetMain } from "./vmMain";
import { VmSheetNew } from "./vmNew";
import { VmSheetEdit } from "./vmEdit";
import { VmSheetAction } from "./vmSheetAction";
import { VmSheetSchema } from "./vmSchema";
import { VmArchives } from "./vmArchives";
import { VmSheetList } from "./vmList";
import { VmArchived } from "./vmArchived";
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
    states: {
        [name: string]: StateUI;
    };
    main: typeof VmSheetMain;
    new: typeof VmSheetNew;
    edit: typeof VmSheetEdit;
    action: typeof VmSheetAction;
}
export declare class CrSheet extends CrEntity<Sheet, SheetUI> {
    readonly icon: JSX.Element;
    protected internalStart(): Promise<void>;
    protected readonly VmSheetMain: typeof VmSheetMain;
    protected onReceive(msg: any): Promise<void>;
    protected readonly VmSheetNew: typeof VmSheetNew;
    protected readonly VmSheetEdit: typeof VmSheetEdit;
    protected readonly VmSheetSchema: typeof VmSheetSchema;
    protected readonly VmArchives: typeof VmArchives;
    protected readonly VmArchived: typeof VmArchived;
    protected readonly VmSheetList: typeof VmSheetList;
    protected readonly VmSheetAction: typeof VmSheetAction;
    protected onEvent(type: string, value: any): Promise<void>;
    showSheet(sheetId: number): Promise<void>;
    private getStateUI;
    getStateLabel(stateName: string): any;
    getActionLabel(stateName: string, actionName: string): any;
}
