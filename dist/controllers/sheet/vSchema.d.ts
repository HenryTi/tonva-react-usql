import { VEntity } from '../CVEntity';
import { Sheet } from '../../entities';
import { SheetUI, CSheet } from './cSheet';
export declare class VSheetSchema extends VEntity<Sheet, SheetUI, CSheet> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
