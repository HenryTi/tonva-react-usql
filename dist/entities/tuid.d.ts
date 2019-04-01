import * as React from 'react';
import { Entity } from './entity';
import { Entities } from './entities';
import { CUq, CTuidMain, CTuidEdit, CTuidInfo, CTuidSelect } from '../controllers';
export declare class BoxId {
    id: number;
    obj?: any;
    content: (templet?: (values?: any, x?: any) => JSX.Element, x?: any) => JSX.Element;
    valueFromFieldName: (fieldName: string) => BoxId | any;
    _$com?: any;
    _$tuid?: Tuid;
    getObj: () => any;
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
        uq: string;
    };
    constructor(entities: Entities, name: string, typeId: number);
    abstract readonly Main: Tuid;
    private buildIdBoxer;
    boxId(id: number): BoxId;
    getTuidContent(): React.FunctionComponent<any>;
    getIdFromObj(item: any): number;
    setSchema(schema: any): void;
    buildFieldsTuid(): void;
    private moveToHead;
    valueFromId(id: number | BoxId): any;
    getCacheValue(id: number): any;
    valueFromFieldName(fieldName: string, obj: any): BoxId | any;
    resetCache(id: number): void;
    useId(id: number, defer?: boolean): void;
    proxied(name: string, id: number): Promise<any>;
    cacheValue(val: any): boolean;
    protected afterCacheId(tuidValue: any): void;
    from(): TuidMain;
    private unpackTuidIds;
    cacheIds(): Promise<void>;
    protected cacheDivIds(): Promise<void>;
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
    readonly uqApi: import("tonva-tools").UqApi;
    divs: {
        [name: string]: TuidDiv;
    };
    setSchema(schema: any): void;
    protected getDiv(divName: string): TuidDiv;
    protected cacheDivIds(): Promise<void>;
    cUqFrom(): CUq;
    getApiFrom(): import("tonva-tools").UqApi;
    from(): TuidMain;
    cFrom(): CTuidMain;
    cEditFrom(): CTuidEdit;
    cInfoFrom(): CTuidInfo;
    cSelectFrom(): CTuidSelect;
}
export declare class TuidDiv extends Tuid {
    readonly Main: TuidMain;
    getApiFrom(): import("tonva-tools").UqApi;
}
