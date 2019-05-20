import { TuidMain, Tuid } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { UqApi } from 'tonva-tools';
import { Map } from './map';
import { Pending } from './pending';
import { CUq } from '../controllers';
export declare type FieldType = 'id' | 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'char' | 'text' | 'datetime' | 'date' | 'time';
export declare function fieldDefaultValue(type: FieldType): 0 | "" | "2000-1-1" | "0:00";
export interface Field {
    name: string;
    type: FieldType;
    tuid?: string;
    arr?: string;
    url?: string;
    null?: boolean;
    size?: number;
    owner?: string;
    _ownerField: Field;
    _tuid: Tuid;
}
export interface ArrFields {
    name: string;
    fields: Field[];
    id?: string;
    order?: string;
}
export interface FieldMap {
    [name: string]: Field;
}
export declare class Entities {
    private tuids;
    private actions;
    private sheets;
    private queries;
    private books;
    private maps;
    private histories;
    private pendings;
    private cacheTimer;
    cUq: CUq;
    uqApi: UqApi;
    appId: number;
    uqId: number;
    constructor(cUq: CUq, uqApi: UqApi, appId: number);
    tuid(name: string): TuidMain;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    map(name: string): Map;
    history(name: string): History;
    pending(name: string): Pending;
    sheetFromTypeId(typeId: number): Sheet;
    tuidArr: TuidMain[];
    actionArr: Action[];
    sheetArr: Sheet[];
    queryArr: Query[];
    bookArr: Book[];
    mapArr: Map[];
    historyArr: History[];
    pendingArr: Pending[];
    init(): Promise<void>;
    loadAccess(): Promise<void>;
    loadEntities(): Promise<void>;
    private buildEntities;
    getTuid(name: string, div?: string, tuidUrl?: string): Tuid;
    cacheTuids(defer: number): void;
    private clearCacheTimer;
    private loadIds;
    private buildTuids;
    private buildAccess;
    newAction(name: string, id: number): Action;
    newTuid(name: string, id: number): TuidMain;
    newQuery(name: string, id: number): Query;
    newBook(name: string, id: number): Book;
    newMap(name: string, id: number): Map;
    newHistory(name: string, id: number): History;
    newPending(name: string, id: number): Pending;
    newSheet(name: string, id: number): Sheet;
    private fromType;
    private fromObj;
    private buildSheet;
    buildFieldTuid(fields: Field[], mainFields?: Field[]): void;
    buildArrFieldsTuid(arrFields: ArrFields[], mainFields: Field[]): void;
}
