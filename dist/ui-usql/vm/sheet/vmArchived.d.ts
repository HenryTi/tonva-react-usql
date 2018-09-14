/// <reference types="react" />
import { VmSheetView } from './vmView';
import { CrSheet } from './crSheet';
export interface State {
    flows: any;
    data: any;
}
export declare class VmArchived extends VmSheetView {
    protected coordinator: CrSheet;
    brief: any;
    showEntry(inBrief: any): Promise<void>;
    protected view: () => JSX.Element;
}
