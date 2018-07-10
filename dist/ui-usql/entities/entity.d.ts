import { UsqlApi } from './usqlApi';
import { Entities } from './entities';
import { Tuid } from './tuid';
export declare abstract class Entity {
    protected entities: Entities;
    protected api: UsqlApi;
    sys?: boolean;
    readonly name: string;
    readonly id: number;
    constructor(entities: Entities, api: UsqlApi, name: string, id: number);
    schema: any;
    face: any;
    protected readonly tvApi: UsqlApi;
    loadSchema(): Promise<void>;
    setSchema(schema: any): void;
    getFieldTuid(fieldName: string, arrName?: string): Tuid;
}
