/// <reference types="react" />
import { VSheetView } from './vSheetView';
import { CSheet } from './cSheet';
export interface State {
    flows: any;
    data: any;
}
export declare class VArchived extends VSheetView {
    protected controller: CSheet;
    brief: any;
    showEntry(inBrief: any): Promise<void>;
    protected view: () => JSX.Element;
}
