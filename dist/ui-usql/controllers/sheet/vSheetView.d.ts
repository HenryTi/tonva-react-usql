/// <reference types="react" />
import { Sheet } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../VM';
import { CSheet, SheetUI } from './cSheet';
export declare abstract class VmSheetView extends VEntity<Sheet, SheetUI, CSheet> {
    vmForm: VForm;
    data: any;
    state: string;
    flows: any[];
    flowRow: (item: any, index: number) => JSX.Element;
    protected sheetView: () => JSX.Element;
}
