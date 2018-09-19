/// <reference types="react" />
import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { SheetUI, CrSheet } from './crSheet';
export declare class VmSheetNew extends VmEntity<Sheet, SheetUI, CrSheet> {
    vmForm: VmForm;
    showEntry(param?: any): Promise<void>;
    onSubmit: (values: any) => Promise<void>;
    protected view: () => JSX.Element;
}
