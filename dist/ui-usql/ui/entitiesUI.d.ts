/// <reference types="react" />
import { Entities, Entity, Tuid, Action, Sheet, Query, Book, History } from '../entities';
import { EntitiesMapper, FieldMappers, TuidInput } from './mapper';
import { EntityUI } from './entityUI';
import { ActionUI } from './actionUI';
import { QueryUI } from './queryUI';
import { SheetUI } from './sheetUI';
import { TuidUI } from './tuidUI';
import { BookUI } from './bookUI';
import { HistoryUI } from './historyUI';
export declare const entitiesUICollection: {
    [api: string]: EntitiesUI;
};
export declare class EntitiesUI {
    private defaultMapper;
    private mapper?;
    constructor(url: string, ws: string, api: string, access: string, defaultMapper: EntitiesMapper, mapper?: EntitiesMapper);
    api: string;
    loadEntities(): Promise<void>;
    close(): void;
    entities: Entities;
    mainPage: JSX.Element;
    caption: string;
    typeFieldMappers?: FieldMappers;
    action: EntitySet<Action, ActionUI>;
    query: EntitySet<Query, QueryUI>;
    sheet: EntitySet<Sheet, SheetUI>;
    tuid: EntitySet<Tuid, TuidUI>;
    book: EntitySet<Book, BookUI>;
    history: EntitySet<History, HistoryUI>;
    buildUI(): void;
    getTuidInput(name: string, tuidUrl: string): TuidInput;
}
export interface EntitySet<E extends Entity, U extends EntityUI<E>> {
    caption: string;
    icon: string;
    coll: {
        [name: string]: U;
    };
    idColl: {
        [id: number]: U;
    };
    list: U[];
}
