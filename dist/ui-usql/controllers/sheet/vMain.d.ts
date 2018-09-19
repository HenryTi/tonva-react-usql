/// <reference types="react" />
import { VEntity } from '../VM';
import { Sheet } from '../../entities';
import { CSheet, SheetUI } from './cSheet';
export declare class VmSheetMain extends VEntity<Sheet, SheetUI, CSheet> {
    showEntry(): Promise<void>;
    newClick: () => any;
    schemaClick: () => any;
    archivesClick: () => any;
    sheetStateClick: (state: any) => any;
    renderState: (item: any, index: number) => JSX.Element;
    protected view: any;
}
