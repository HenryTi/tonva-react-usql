import { VEntity } from '../CVEntity';
import { Sheet } from '../../entities';
import { CSheet, SheetUI } from './cSheet';
export declare class VSheetMain extends VEntity<Sheet, SheetUI, CSheet> {
    open(): Promise<void>;
    newClick: () => Promise<void>;
    schemaClick: () => Promise<void>;
    archivesClick: () => Promise<void>;
    sheetStateClick: (state: any) => Promise<void>;
    renderState: (item: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
