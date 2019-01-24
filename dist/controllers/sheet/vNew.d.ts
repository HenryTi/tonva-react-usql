import { Sheet } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../CVEntity';
import { SheetUI, CSheet } from './cSheet';
export declare class VSheetNew extends VEntity<Sheet, SheetUI, CSheet> {
    vForm: VForm;
    showEntry(param?: any): Promise<void>;
    private onSubmit;
    protected view: () => JSX.Element;
}
