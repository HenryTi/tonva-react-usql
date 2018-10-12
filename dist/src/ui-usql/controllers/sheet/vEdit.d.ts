/// <reference types="react" />
import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';
export declare class VSheetEdit extends VSheetView {
    protected sheetData: SheetData;
    showEntry(param: SheetData): Promise<void>;
    onSubmit: () => Promise<void>;
    protected view: () => JSX.Element;
}
