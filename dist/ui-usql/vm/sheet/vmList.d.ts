import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';
export declare class VmSheetList extends VmEntity<Sheet, SheetUI> {
    protected coordinator: CrSheet;
    stateName: string;
    stateLabel: string;
    showEntry(item: any): Promise<void>;
    rowClick: (brief: any) => Promise<void>;
    renderRow: (row: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
