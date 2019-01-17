import * as React from 'react';
import { Entity } from './entity';
import { Entities } from './entities';
import { CUsq, CTuidMain, CTuidEdit, CTuidInfo, CTuidSelect } from '../controllers';
export declare class BoxId {
    id: number;
    obj?: any;
    content: (templet?: (values?: any, x?: any) => JSX.Element, x?: any) => JSX.Element;
    valueFromFieldName: (fieldName: string) => BoxId | any;
}
export declare abstract class Tuid extends Entity {
    private BoxId;
    readonly typeName: string;
    private queue;
    private waitingIds;
    private cache;
    idName: string;
    owner: TuidMain;
    unique: string[];
    schemaFrom: {
        owner: string;
        usq: string;
    };
    constructor(entities: Entities, name: string, typeId: number);
    abstract readonly Main: any;
    private buildIdBoxer;
    boxId(id: number): BoxId;
    getTuidContent(): React.FunctionComponent<any>;
    getIdFromObj(item: any): number;
    setSchema(schema: any): void;
    private moveToHead;
    valueFromId(id: number | BoxId): any;
    valueFromFieldName(fieldName: string, obj: any): BoxId | any;
    resetCache(id: number): void;
    useId(id: number, defer?: boolean): void;
    proxied(name: string, id: number): Promise<any>;
    cacheValue(val: any): boolean;
    protected afterCacheId(tuidValue: any): void;
    cacheIds(): Promise<void>;
    load(id: number): Promise<any>;
    protected getDiv(divName: string): TuidDiv;
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
    protected getDiv(divName: string): TuidDiv;
    cacheIds(): Promise<void>;
    cUsqFrom(): Promise<CUsq>;
    protected getApiFrom(): Promise<import("tonva-tools").UsqApi>;
    from(): Promise<TuidMain>;
    cFrom(): Promise<CTuidMain>;
    cEditFrom(): Promise<CTuidEdit>;
    cInfoFrom(): Promise<CTuidInfo>;
    cSelectFrom(): Promise<CTuidSelect>;
    protected afterCacheId(tuidValue: any): void;
}
export declare class TuidDiv extends Tuid {
    readonly Main: TuidMain;
}
