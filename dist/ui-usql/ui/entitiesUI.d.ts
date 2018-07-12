import { Entities, Entity, Tuid, Action, Sheet, Query, Book, History } from '../entities';
import { EntitiesMapper, FieldMappers, TuidInput } from './mapper';
import { EntityUIO } from './entityUI';
import { ActionUIO } from './actionUI';
import { QueryUI } from './queryUI';
import { SheetUIO } from './sheetUI';
import { TuidUIO } from './tuidUI';
import { BookUI } from './bookUI';
import { HistoryUI } from './historyUI';
export declare const entitiesUICollection: {
    [api: string]: EntitiesUI;
};
export declare class EntitiesUI {
    private defaultMapper;
    private mapper?;
    constructor(url: string, /*ws:string, */ api: string, access: string, defaultMapper: EntitiesMapper, mapper?: EntitiesMapper);
    api: string;
    loadEntities(): Promise<void>;
    entities: Entities;
    mainPage: JSX.Element;
    caption: string;
    typeFieldMappers?: FieldMappers;
    action: EntitySet<Action, ActionUIO>;
    query: EntitySet<Query, QueryUI>;
    sheet: EntitySet<Sheet, SheetUIO>;
    tuid: EntitySet<Tuid, TuidUIO>;
    book: EntitySet<Book, BookUI>;
    history: EntitySet<History, HistoryUI>;
    buildUI(): void;
    getTuidInput(name: string, tuidUrl: string): TuidInput;
}
export interface EntitySet<E extends Entity, U extends EntityUIO<E>> {
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
