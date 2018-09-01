import { TuidMain, Tuid } from '../../entities';
import { PagedItems } from 'tonva-tools';
import { VmEntity } from '../VM';
import { TuidUI } from './crTuid';
export declare abstract class VmTuidListBase extends VmEntity<TuidMain, TuidUI> {
    protected entity: TuidMain;
    ppp: string;
    pagedItems: TuidPagedItems;
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
declare class TuidPagedItems extends PagedItems<any> {
    private tuid;
    constructor(tuid: Tuid);
    protected load(): Promise<any[]>;
    protected setPageStart(item: any): void;
}
export declare class VmTuidList extends VmTuidListBase {
    protected onSelected(item: any): Promise<void>;
}
export {};
