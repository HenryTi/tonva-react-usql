import { TuidMain, TuidDiv } from '../../entities';
import { VEntity } from '../CVEntity';
import { TuidUI, CTuidMain, CTuidDiv } from './cTuid';
export declare abstract class VTuidMainListBase extends VEntity<TuidMain, TuidUI, CTuidMain> {
    protected rowContent: (row: any) => JSX.Element;
    protected ownerId: number;
    showEntry(param?: any): Promise<void>;
    onSearch: (key: string) => Promise<void>;
    renderRow: (item: any, index: number) => JSX.Element;
    protected abstract onSelected(item: any): Promise<void>;
    private callOnSelected;
    clickRow: (item: any) => void;
    private rowKey;
    protected view: () => JSX.Element;
}
export declare class VTuidMainList extends VTuidMainListBase {
    protected onSelected(item: any): Promise<void>;
}
export declare abstract class VTuidDivListBase extends VEntity<TuidDiv, TuidUI, CTuidDiv> {
    protected ownerId: number;
    showEntry(param?: any): Promise<void>;
    onSearch: (key: string) => Promise<void>;
    renderRow: (item: any, index: number) => JSX.Element;
    protected abstract onSelected(item: any): Promise<void>;
    private callOnSelected;
    clickRow: (item: any) => void;
    protected view: () => JSX.Element;
}
export declare class VTuidDivList extends VTuidDivListBase {
    protected onSelected(item: any): Promise<void>;
}
