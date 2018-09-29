/// <reference types="react" />
import { TuidMain, Tuid } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { UsqApi } from 'tonva-tools';
import { Map } from './map';
export interface Usq {
    getTuidContent(tuid: Tuid): React.StatelessComponent<any>;
    showTuid(tuid: Tuid, id: number): Promise<void>;
}
export interface Field {
    name: string;
    type: 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'char' | 'text' | 'datetime' | 'date' | 'time';
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
export declare class Entities {
    private tuids;
    private actions;
    private sheets;
    private queries;
    private books;
    private maps;
    private histories;
    private cacheTimer;
    usq: Usq;
    usqApi: UsqApi;
    appId: number;
    usqId: number;
    constructor(usq: Usq, usqApi: UsqApi, appId: number);
    tuid(name: string): TuidMain;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    map(name: string): Map;
    history(name: string): History;
    sheetFromTypeId(typeId: number): Sheet;
    tuidArr: TuidMain[];
    actionArr: Action[];
    sheetArr: Sheet[];
    queryArr: Query[];
    bookArr: Book[];
    mapArr: Map[];
    historyArr: History[];
    load(): Promise<void>;
    getTuid(name: string, arr?: string, tuidUrl?: string): Tuid;
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
    newSheet(name: string, id: number): Sheet;
    private fromType;
    private fromObj;
    private buildSheet;
    buildFieldTuid(fields: Field[], mainFields?: Field[]): void;
    buildArrFieldsTuid(arrFields: ArrFields[], mainFields: Field[]): void;
}
