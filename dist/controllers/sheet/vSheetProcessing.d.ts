import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';
export declare class VSheetProcessing extends VSheetView {
    open(sheetData: SheetData): Promise<void>;
    protected page: () => JSX.Element;
}
