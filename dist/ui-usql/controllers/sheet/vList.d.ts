/// <reference types="react" />
import { VEntity } from '../VM';
import { Sheet } from '../../entities';
import { CSheet, SheetUI } from './cSheet';
export declare class VSheetList extends VEntity<Sheet, SheetUI, CSheet> {
    stateName: string;
    stateLabel: string;
    showEntry(item: any): Promise<void>;
    rowClick: (brief: any) => Promise<void>;
    renderRow: (row: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
