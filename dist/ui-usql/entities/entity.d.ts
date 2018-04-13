import { UsqlApi } from './usqlApi';
import { Entities } from './entities';
export declare abstract class Entity {
    protected entities: Entities;
    protected api: UsqlApi;
    readonly name: string;
    readonly id: number;
    constructor(entities: Entities, api: UsqlApi, name: string, id: number);
    schema: any;
    protected readonly tvApi: UsqlApi;
    loadSchema(): Promise<void>;
}
