import { Entity } from './entity';
export declare class Tuid extends Entity {
    private queue;
    private waitingIds;
    private cache;
    private moveToHead(id);
    getId(id: number): any;
    useId(id: number): void;
    cacheIds(): Promise<void>;
    load(id: number): Promise<any>;
    save(id: number, props: any): Promise<any>;
    search(key: string, pageStart: string | number, pageSize: number): Promise<any>;
    private ids(idArr);
}
