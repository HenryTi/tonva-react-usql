import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { SheetUI } from './crSheet';
export declare class VmSheetSchema extends VmEntity<Sheet, SheetUI> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
