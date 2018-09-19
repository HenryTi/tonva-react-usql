/// <reference types="react" />
import { TuidMain } from '../../entities';
import { VEntity } from '../VM';
import { TuidUI, CrTuidMain } from './crTuid';
export declare abstract class VmTuidListBase extends VEntity<TuidMain, TuidUI, CrTuidMain> {
    protected controller: CrTuidMain;
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
export declare class VmTuidList extends VmTuidListBase {
    protected onSelected(item: any): Promise<void>;
}
