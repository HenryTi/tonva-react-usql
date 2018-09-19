/// <reference types="react" />
import { VEntity } from '../VM';
import { Sheet } from '../../entities';
import { SheetUI, CrSheet } from './crSheet';
export declare class VmSheetSchema extends VEntity<Sheet, SheetUI, CrSheet> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
