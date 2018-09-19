/// <reference types="react" />
import { VmSheetView } from './vSheetView';
export declare class VSheetAction extends VmSheetView {
    brief: any;
    showEntry(sheetId: number): Promise<void>;
    actionClick: (action: any) => Promise<void>;
    deleteClick: () => Promise<void>;
    editClick: () => Promise<void>;
    protected page: () => JSX.Element;
}
