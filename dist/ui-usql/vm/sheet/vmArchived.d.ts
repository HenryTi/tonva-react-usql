import { VmView } from './vmView';
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';
export interface State {
    flows: any;
    data: any;
}
export declare class VmArchived extends VmEntity<Sheet, SheetUI> {
    protected coordinator: CrSheet;
    brief: any;
    vmView: VmView;
    showEntry(inBrief: any): Promise<void>;
    protected view: () => JSX.Element;
}
