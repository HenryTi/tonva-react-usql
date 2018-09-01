import { VmView } from './vmView';
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';
export declare class VmSheetAction extends VmEntity<Sheet, SheetUI> {
    protected coordinator: CrSheet;
    brief: any;
    sheetData: any;
    flows: any[];
    vmView: VmView;
    showEntry(sheetId: number): Promise<void>;
    actionClick: (action: any) => Promise<void>;
    deleteClick: () => Promise<void>;
    editClick: () => Promise<void>;
    protected view: () => JSX.Element;
}
