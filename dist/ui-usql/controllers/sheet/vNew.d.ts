/// <reference types="react" />
import { Sheet } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../VM';
import { SheetUI, CSheet } from './cSheet';
export declare class VSheetNew extends VEntity<Sheet, SheetUI, CSheet> {
    vForm: VForm;
    showEntry(param?: any): Promise<void>;
    onSubmit: (values: any) => Promise<void>;
    protected view: () => JSX.Element;
}
