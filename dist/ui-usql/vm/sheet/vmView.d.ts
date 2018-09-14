/// <reference types="react" />
import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { SheetUI } from './crSheet';
export declare abstract class VmSheetView extends VmEntity<Sheet, SheetUI> {
    vmForm: VmForm;
    data: any;
    state: string;
    flows: any[];
    flowRow: (item: any, index: number) => JSX.Element;
    protected sheetView: () => JSX.Element;
}
