import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { CrSheet, SheetUI } from './crSheet';
export declare class VmView extends VmEntity<Sheet, SheetUI> {
    vmForm: VmForm;
    data: any;
    state: string;
    flows: any[];
    constructor(crSheet: CrSheet, data: any, state: string, flows: any[]);
    showEntry(param?: any): Promise<void>;
    render(): JSX.Element;
    flowRow: (item: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
