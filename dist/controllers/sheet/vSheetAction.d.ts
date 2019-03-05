import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';
export declare class VSheetAction extends VSheetView {
    open(sheetData: SheetData): Promise<void>;
    actionClick: (action: any) => Promise<void>;
    deleteClick: () => Promise<void>;
    editClick: () => Promise<void>;
    protected page: () => JSX.Element;
    private acted;
}
