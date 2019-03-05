import { VEntity } from '../CVEntity';
import { Sheet } from '../../entities';
import { SheetUI, CSheet } from './cSheet';
export declare class VArchives extends VEntity<Sheet, SheetUI, CSheet> {
    list: any[];
    open(): Promise<void>;
    archiveClick: (brief: any) => Promise<void>;
    archiveRow: (row: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
