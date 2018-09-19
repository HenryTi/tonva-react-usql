/// <reference types="react" />
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { SheetUI, CrSheet } from './crSheet';
export declare class VmSheetSchema extends VmEntity<Sheet, SheetUI, CrSheet> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
