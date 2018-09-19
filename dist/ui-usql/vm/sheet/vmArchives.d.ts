/// <reference types="react" />
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { SheetUI, CrSheet } from './crSheet';
export declare class VmArchives extends VmEntity<Sheet, SheetUI, CrSheet> {
    list: any[];
    showEntry(): Promise<void>;
    archiveClick: (brief: any) => Promise<void>;
    archiveRow: (row: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
