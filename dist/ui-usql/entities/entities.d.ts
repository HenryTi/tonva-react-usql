import { Entity } from './entity';
import { Tuid } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { ApiBase } from 'tonva-tools';
export interface Field {
    name: string;
    type: string;
    tuid?: string;
    url?: string;
    _tuid: Tuid;
}
export interface Arr {
    name: string;
    fields: Field[];
}
export declare class Entities {
    private api;
    private tvApi;
    private tuids;
    private actions;
    private sheets;
    private queries;
    private books;
    private histories;
    private cacheTimer;
    constructor(api: ApiBase, access?: string);
    tuid(name: string): Tuid;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    history(name: string): History;
    tuidArr: Tuid[];
    actionArr: Action[];
    sheetArr: Sheet[];
    queryArr: Query[];
    bookArr: Book[];
    historyArr: History[];
    loadEntities(): Promise<void>;
    getTuid(name: string, tuidUrl: string): Tuid;
    loadSchemas(...entityArr: Entity[]): Promise<void>;
    cacheTuids(defer: number): void;
    private clearCacheTimer;
    private loadIds;
    private buildAccess;
    private fromType;
    private fromObj;
    private buildSheet;
    private createSheetState;
    schemaRefTuids(tuidSchemas: any[]): void;
    pack(schema: any, data: any): string;
    private escape;
    private packRow;
    private packArr;
    unpackSheet(schema: any, data: string): any;
    unpackReturns(schema: any, data: string): any;
    private unpackRow;
    private to;
    private unpackArr;
}
