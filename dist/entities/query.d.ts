import { IObservableArray } from 'mobx';
import { ArrFields } from './entities';
import { Entity } from './entity';
export declare type QueryPageApi = (name: string, pageStart: any, pageSize: number, params: any) => Promise<string>;
export declare class Query extends Entity {
    readonly typeName: string;
    private pageStart;
    private pageSize;
    private params;
    private more;
    private startField;
    list: IObservableArray;
    returns: ArrFields[];
    isPaged: boolean;
    setSchema(schema: any): void;
    resetPage(size: number, params: any): void;
    readonly hasMore: boolean;
    loadPage(): Promise<void>;
    page(params: any, pageStart: any, pageSize: number): Promise<any[]>;
    query(params: any): Promise<any>;
    table(params: any): Promise<any[]>;
    obj(params: any): Promise<any>;
    scalar(params: any): Promise<any>;
}
