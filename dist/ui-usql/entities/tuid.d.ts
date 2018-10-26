/// <reference types="react" />
import { Entity } from './entity';
import { Entities } from './entities';
export declare class BoxId {
    id: number;
    obj?: any;
    content: (templet?: (values?: any, x?: any) => JSX.Element, x?: any) => JSX.Element;
    valueFromFieldName: (fieldName: string) => BoxId | any;
}
export declare abstract class Tuid extends Entity {
    private idBoxer;
    readonly typeName: string;
    private queue;
    private waitingIds;
    private cache;
    idName: string;
    owner: TuidMain;
    unique: string[];
    constructor(entities: Entities, name: string, typeId: number);
    abstract readonly Main: any;
    private buildIdBoxer;
    boxId(id: number): BoxId;
    getIdFromObj(item: any): number;
    setSchema(schema: any): void;
    private moveToHead;
    valueFromId(id: number): any;
    valueFromFieldName(fieldName: string, obj: any): BoxId | any;
    resetCache(id: number): void;
    useId(id: number, defer?: boolean): void;
    proxied(name: string, id: number): Promise<any>;
    cacheValue(val: any): boolean;
    protected afterCacheId(tuidValue: any): void;
    cacheIds(): Promise<void>;
    load(id: number): Promise<any>;
    private cacheTuidFieldValues;
    private cacheFieldsInValue;
    save(id: number, props: any): Promise<any>;
    search(key: string, pageStart: string | number, pageSize: number): Promise<any>;
    searchArr(owner: number, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    loadArr(arr: string, owner: number, id: number): Promise<any>;
    saveArr(arr: string, owner: number, id: number, props: any): Promise<any>;
    posArr(arr: string, owner: number, id: number, order: number): Promise<any>;
    showInfo(id: number): Promise<void>;
}
export declare class TuidMain extends Tuid {
    readonly Main: this;
    divs: {
        [name: string]: TuidDiv;
    };
    proxies: {
        [name: string]: TuidMain;
    };
    setSchema(schema: any): void;
    cacheIds(): Promise<void>;
    protected afterCacheId(tuidValue: any): void;
}
export declare class TuidDiv extends Tuid {
    readonly Main: TuidMain;
}
