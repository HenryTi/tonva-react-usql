import { VEntity } from '../CVEntity';
import { Sheet } from '../../entities';
import { CSheet, SheetUI } from './cSheet';
export declare class VSheetList extends VEntity<Sheet, SheetUI, CSheet> {
    protected row: (values: any) => JSX.Element;
    stateName: string;
    stateLabel: string;
    open(item: any): Promise<void>;
    rowClick: (brief: any) => Promise<void>;
    private onScrollBottom;
    protected rowContent: (row: any) => JSX.Element;
    private renderRow;
    protected view: () => JSX.Element;
}
