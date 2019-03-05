import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';
export interface State {
    flows: any;
    data: any;
}
export declare class VArchived extends VSheetView {
    open(sheetData: SheetData): Promise<void>;
    protected view: () => JSX.Element;
}
