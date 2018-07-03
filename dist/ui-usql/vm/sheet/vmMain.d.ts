import { VmSheet } from './vmSheet';
import { VmEdit } from './vmEdit';
import { VmSchema } from './vmSchema';
import { VmArchives } from './vmArchives';
export declare class VmSheetMain extends VmSheet {
    protected vmEdit: typeof VmEdit;
    protected vmSchema: typeof VmSchema;
    protected vmArchives: typeof VmArchives;
    protected vmSheetState: typeof VmEdit;
    newClick: () => Promise<void>;
    schemaClick: () => Promise<void>;
    archivesClick: () => Promise<void>;
    sheetStateClick: () => Promise<void>;
    renderState: (item: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmSheetMain;
    }) => JSX.Element;
}
