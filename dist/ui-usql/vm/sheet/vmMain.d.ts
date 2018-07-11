import { VmSheet } from './vmSheet';
import { VmSheetNew } from './vmNew';
import { VmSheetEdit } from './vmEdit';
import { VmSheetList } from './vmList';
import { VmSheetSchema } from './vmSchema';
import { VmArchives } from './vmArchives';
export declare class VmSheetMain extends VmSheet {
    protected vmNew: typeof VmSheetNew;
    protected vmEdit: typeof VmSheetEdit;
    protected vmSchema: typeof VmSheetSchema;
    protected vmArchives: typeof VmArchives;
    protected vmSheetList: typeof VmSheetList;
    protected beforeStart(): Promise<void>;
    protected onReceive(msg: any): Promise<void>;
    newClick: () => Promise<void>;
    schemaClick: () => Promise<void>;
    archivesClick: () => Promise<void>;
    sheetStateClick: (state: any) => Promise<void>;
    renderState: (item: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmSheetMain;
    }) => JSX.Element;
}
