/// <reference types="react" />
import { PagedItems } from 'tonva-tools';
import { Query } from '../../entities';
import { VmEntity } from '../VM';
import { QueryUI, CrQuerySelect } from './crQuery';
export declare class VmQuerySelect extends VmEntity<Query, QueryUI, CrQuerySelect> {
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
