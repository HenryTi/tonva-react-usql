import { Sheet } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../CVEntity';
import { CSheet, SheetUI, SheetData } from './cSheet';
export declare abstract class VSheetView extends VEntity<Sheet, SheetUI, CSheet> {
    protected vForm: VForm;
    protected sheetData: SheetData;
    flowRow: (item: any, index: number) => JSX.Element;
    protected sheetView: () => JSX.Element;
}
