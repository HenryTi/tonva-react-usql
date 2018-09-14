/// <reference types="react" />
import { VmSheetView } from './vmView';
import { CrSheet } from './crSheet';
export declare class VmSheetAction extends VmSheetView {
    protected coordinator: CrSheet;
    brief: any;
    showEntry(sheetId: number): Promise<void>;
    actionClick: (action: any) => Promise<void>;
    deleteClick: () => Promise<void>;
    editClick: () => Promise<void>;
    protected page: () => JSX.Element;
}
