/// <reference types="react" />
import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { VEntity } from '../VM';
import { CrSheet, SheetUI } from './crSheet';
export declare abstract class VmSheetView extends VEntity<Sheet, SheetUI, CrSheet> {
    vmForm: VmForm;
    data: any;
    state: string;
    flows: any[];
    flowRow: (item: any, index: number) => JSX.Element;
    protected sheetView: () => JSX.Element;
}
