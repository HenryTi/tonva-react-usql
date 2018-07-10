import { VmSheet } from './vmSheet';
import { VmView } from './vmView';
export declare class VmSheetAction extends VmSheet {
    brief: any;
    sheetData: any;
    flows: any[];
    vmView: VmView;
    start(inBrief: any): Promise<void>;
    actionClick: (action: any) => Promise<void>;
    protected view: ({ vm }: {
        vm: VmSheetAction;
    }) => JSX.Element;
}
