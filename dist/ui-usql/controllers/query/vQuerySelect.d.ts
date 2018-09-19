/// <reference types="react" />
import { PagedItems } from 'tonva-tools';
import { Query } from '../../entities';
import { VEntity } from '../VM';
import { QueryUI, CQuerySelect } from './cQuery';
export declare class VQuerySelect extends VEntity<Query, QueryUI, CQuerySelect> {
    private row;
    pagedItems: QueryPagedItems;
    ownerId: number;
    showEntry(param?: any): Promise<void>;
    onSearch: (key: string) => Promise<void>;
    renderRow: (item: any, index: number) => JSX.Element;
    private callOnSelected;
    clickRow: (item: any) => void;
    view: () => JSX.Element;
}
declare class QueryPagedItems extends PagedItems<any> {
    private query;
    constructor(query: Query);
    protected load(): Promise<any[]>;
    protected setPageStart(item: any): void;
}
export {};
