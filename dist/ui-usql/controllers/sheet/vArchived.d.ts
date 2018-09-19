/// <reference types="react" />
import { VmSheetView } from './vSheetView';
import { CSheet } from './cSheet';
export interface State {
    flows: any;
    data: any;
}
export declare class VArchived extends VmSheetView {
    protected controller: CSheet;
    brief: any;
    showEntry(inBrief: any): Promise<void>;
    protected view: () => JSX.Element;
}
