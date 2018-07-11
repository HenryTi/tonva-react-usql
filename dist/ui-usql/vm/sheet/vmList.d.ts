import { VmSheet } from './vmSheet';
export declare class VmSheetList extends VmSheet {
    stateName: string;
    stateLabel: string;
    protected beforeStart(item: any): Promise<void>;
    rowClick: (brief: any) => Promise<void>;
    renderRow: (row: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmSheetList;
    }) => JSX.Element;
}
