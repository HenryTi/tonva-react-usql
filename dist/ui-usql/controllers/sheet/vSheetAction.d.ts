/// <reference types="react" />
import { VSheetView } from './vSheetView';
export declare class VSheetAction extends VSheetView {
    brief: any;
    showEntry(sheetId: number): Promise<void>;
    actionClick: (action: any) => Promise<void>;
    deleteClick: () => Promise<void>;
    editClick: () => Promise<void>;
    protected page: () => JSX.Element;
}
