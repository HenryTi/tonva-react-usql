/// <reference types="react" />
import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';
export declare class VSheetAction extends VSheetView {
    showEntry(sheetData: SheetData): Promise<void>;
    actionClick: (action: any) => Promise<void>;
    deleteClick: () => Promise<void>;
    editClick: () => Promise<void>;
    protected page: () => JSX.Element;
}
