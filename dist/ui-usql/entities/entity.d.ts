import { Entities, Field, ArrFields, FieldMap } from './entities';
import { Tuid } from './tuid';
export declare abstract class Entity {
    protected entities: Entities;
    protected schema: any;
    private jName;
    sys?: boolean;
    readonly name: string;
    readonly typeId: number;
    abstract readonly typeName: string;
    readonly sName: string;
    fields: Field[];
    arrFields: ArrFields[];
    returns: ArrFields[];
    constructor(entities: Entities, name: string, typeId: number);
    face: any;
    protected readonly tvApi: import("tonva-tools").UsqApi;
    getApiFrom(): Promise<import("tonva-tools").UsqApi>;
    private fieldMaps;
    fieldMap(arr?: string): FieldMap;
    loadSchema(): Promise<void>;
    setSchema(schema: any): void;
    schemaStringify(): string;
    tuidFromField(field: Field): Tuid;
    tuidFromName(fieldName: string, arrName?: string): Tuid;
    pack(data: any): string;
    private escape;
    private packRow;
    private packArr;
    unpackSheet(data: string): any;
    unpackReturns(data: string): any;
    private unpackRow;
    private to;
    private unpackArr;
}
