import { VmSheet } from './vmSheet';
export declare class VmArchives extends VmSheet {
    list: any[];
    protected beforeStart(): Promise<void>;
    archiveClick: (brief: any) => Promise<void>;
    archiveRow: (row: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmArchives;
    }) => JSX.Element;
}
