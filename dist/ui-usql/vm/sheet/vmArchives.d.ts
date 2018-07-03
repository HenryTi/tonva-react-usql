import { VmSheet } from './vmSheet';
export declare class VmArchives extends VmSheet {
    list: any[];
    load(): Promise<void>;
    archivedSheet: any;
    archiveData: any;
    brief: any;
    archiveClick: (brief: any) => Promise<void>;
    archiveRow: (row: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmArchives;
    }) => JSX.Element;
}
