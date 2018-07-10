import { Sheet } from '../../entities';
import { VmEntity, EntityUI } from '../vmEntity';
import { VmApi } from '../vmApi';
import { VmSheetMain } from './vmMain';
import { VmSheetNew } from './vmNew';
import { VmSheetEdit } from './vmEdit';
export interface ActionUI {
    label: string;
}
export interface StateUI {
    label: string;
    actions: {
        [name: string]: ActionUI;
    };
}
export interface SheetUI extends EntityUI {
    states: {
        [name: string]: StateUI;
    };
    main: typeof VmSheetMain;
    new: typeof VmSheetNew;
    edit: typeof VmSheetEdit;
}
export declare abstract class VmSheet extends VmEntity {
    protected ui: SheetUI;
    constructor(vmApi: VmApi, sheet: Sheet, ui?: SheetUI);
    entity: Sheet;
    readonly icon: JSX.Element;
    private getStateUI;
    getStateLabel(stateName: string): any;
    getActionLabel(stateName: string, actionName: string): any;
}
