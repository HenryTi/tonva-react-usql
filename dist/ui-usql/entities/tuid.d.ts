import { Entity } from './entity';
import { Entities } from './entities';
export declare class Tuid extends Entity {
    private queue;
    private waitingIds;
    private cache;
    proxies: {
        [name: string]: Tuid;
    };
    private moveToHead(id);
    buidProxies(parts: string[]): void;
    setProxies(entities: Entities): void;
    getId(id: number): any;
    resetCache(id: number): void;
    useId(id: number, defer?: boolean): void;
    proxied(name: string, id: number): Promise<any>;
    private cacheValue(val);
    cacheIds(): Promise<void>;
    load(id: number): Promise<any>;
    save(id: number, props: any): Promise<any>;
    search(key: string, pageStart: string | number, pageSize: number): Promise<any>;
    slaveSave(slave: string, first: number, masterId: number, id: number, props: any): Promise<any>;
    slaves(slave: string, masterId: number, order: number, pageSize: any): Promise<any[]>;
    private ids(idArr);
}
