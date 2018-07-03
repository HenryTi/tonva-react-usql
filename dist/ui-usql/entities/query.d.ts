import { IObservableArray } from 'mobx';
import { Entity } from './entity';
export declare type QueryPageApi = (name: string, pageStart: any, pageSize: number, params: any) => Promise<string>;
export declare class Query extends Entity {
    private pageStart;
    private pageSize;
    private params;
    private more;
    private startField;
    protected queryApiName: string;
    list: IObservableArray;
    private unpackReturns;
    resetPage(size: number, params: any): void;
    readonly hasMore: boolean;
    loadPage(): Promise<void>;
    page(params: any, pageStart: any, pageSize: number): Promise<any[]>;
    query(params: any): Promise<any>;
}
