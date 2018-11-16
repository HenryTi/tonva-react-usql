import { Entity } from './entity';
import { Action } from './action';
import { Query } from './query';
import { Field } from './entities';
interface MapActions {
    add: Action;
    del: Action;
}
interface MapQueries {
    all: Query;
    page: Query;
    query: Query;
}
export declare class Map extends Entity {
    readonly typeName: string;
    keys: Field[];
    actions: MapActions;
    queries: MapQueries;
    setSchema(schema: any): void;
    add(param: any): Promise<any>;
    del(param: any): Promise<any>;
    all(): Promise<any>;
    page(param: any, pageStart: any, pageSize: number): Promise<any[]>;
    query(param: any): Promise<any>;
}
export {};
