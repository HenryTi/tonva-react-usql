/// <reference types="react" />
import { TuidMain } from '../../entities';
import { VEntity } from '../VM';
import { TuidUI, CTuidMain } from './cTuid';
export declare abstract class VTuidListBase extends VEntity<TuidMain, TuidUI, CTuidMain> {
    protected controller: CTuidMain;
    protected entity: TuidMain;
    ppp: string;
    ownerId: number;
    param: any;
    showEntry(param?: any): Promise<void>;
    onSearch: (key: string) => Promise<void>;
    renderRow: (item: any, index: number) => JSX.Element;
    protected abstract onSelected(item: any): Promise<void>;
    private callOnSelected;
    clickRow: (item: any) => void;
    protected view: () => JSX.Element;
}
export declare class VTuidList extends VTuidListBase {
    protected onSelected(item: any): Promise<void>;
}
