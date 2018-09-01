import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';
export declare class VmSheetMain extends VmEntity<Sheet, SheetUI> {
    protected coordinator: CrSheet;
    showEntry(): Promise<void>;
    newClick: () => Promise<void>;
    schemaClick: () => Promise<void>;
    archivesClick: () => Promise<void>;
    sheetStateClick: (state: any) => Promise<void>;
    renderState: (item: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
