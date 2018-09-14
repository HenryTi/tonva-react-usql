import * as React from 'react';
import { Entity } from './entity';
import { Entities } from './entities';
export declare class IdBox {
    id: number;
    obj?: any;
    content: (templet?: React.StatelessComponent<any>) => JSX.Element;
}
export declare abstract class Tuid extends Entity {
    private idCreater;
    readonly typeName: string;
    private queue;
    private waitingIds;
    private cache;
    idName: string;
    owner: TuidMain;
    unique: string[];
    constructor(entities: Entities, name: string, typeId: number);
    abstract readonly Main: any;
    private buildIdCreater;
    createID(id: number): IdBox;
    getIdFromObj(item: any): number;
    setSchema(schema: any): void;
    private moveToHead;
    valueFromId(id: number): any;
    resetCache(id: number): void;
    useId(id: number, defer?: boolean): void;
    proxied(name: string, id: number): Promise<any>;
    cacheValue(val: any): boolean;
    protected afterCacheId(tuidValue: any): void;
    cacheIds(): Promise<void>;
    load(id: number): Promise<any>;
    private cacheTuidValues;
    private cacheFieldsInValue;
    save(id: number, props: any): Promise<any>;
    search(key: string, pageStart: string | number, pageSize: number): Promise<any>;
    searchArr(owner: number, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    loadArr(arr: string, owner: number, id: number): Promise<any>;
    saveArr(arr: string, owner: number, id: number, props: any): Promise<any>;
    posArr(arr: string, owner: number, id: number, order: number): Promise<any>;
    bindSlaveSave(slave: string, first: number, masterId: number, id: number, props: any): Promise<any>;
    bindSlaves(slave: string, masterId: number, order: number, pageSize: any): Promise<any[]>;
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
