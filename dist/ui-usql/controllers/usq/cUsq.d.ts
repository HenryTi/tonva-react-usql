import * as React from 'react';
import { Controller } from 'tonva-tools';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq } from '../../entities';
import { CLink } from '../link';
import { CBook } from '../book';
import { CSheet, SheetUI } from '../sheet';
import { CAction } from '../action';
import { QueryUI, CQuery, CQuerySelect } from '../query';
import { CTuidMain, TuidUI, CTuidMainSelect, CTuidInfo } from '../tuid';
import { MapUI, CMap } from '../map';
import { CEntity, EntityUI } from '../VM';
import { VUsq } from './vUsq';
export declare type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book' | 'map';
export interface UsqUI {
    CTuidMain?: typeof CTuidMain;
    CQuery?: typeof CQuery;
    CQuerySelect?: typeof CQuerySelect;
    CMap?: typeof CMap;
    tuid?: {
        [name: string]: TuidUI;
    };
    sheet?: {
        [name: string]: SheetUI;
    };
    map?: {
        [name: string]: MapUI;
    };
    query?: {
        [name: string]: QueryUI;
    };
    res?: any;
}
export declare class CUsq extends Controller implements Usq {
    private access;
    private ui;
    private CTuidMain;
    private CQuery;
    private CQuerySelect;
    private CMap;
    constructor(usq: string, appId: number, usqId: number, access: string, ui: UsqUI);
    protected internalStart(): Promise<void>;
    usq: string;
    id: number;
    res: any;
    entities: Entities;
    loadSchema(): Promise<void>;
    getTuid(name: string): TuidMain;
    getQuerySearch(name: string): Promise<Query>;
    getTuidNullCaption(tuid: Tuid): string;
    protected isSysVisible: boolean;
    protected isVisible(entity: Entity): boolean;
    navSheet(sheetTypeId: number, sheetId: number): Promise<void>;
    cFromName(entityType: EntityType, entityName: string): CEntity<Entity, EntityUI>;
    linkFromName(entityType: EntityType, entityName: string): CLink;
    private getUI;
    link(cEntity: CEntity<Entity, EntityUI>): CLink;
    readonly tuidLinks: CLink[];
    cTuidMain(tuid: TuidMain): CTuidMain;
    cTuidSelect(tuid: TuidMain): CTuidMainSelect;
    cTuidInfo(tuid: Tuid): CTuidInfo;
    cSheet(sheet: Sheet): CSheet;
    readonly sheetLinks: CLink[];
    cAction(action: Action): CAction;
    readonly actionLinks: CLink[];
    cQuery(query: Query): CQuery;
    cQuerySelect(queryName: string): CQuerySelect;
    readonly queryLinks: CLink[];
    cBook(book: Book): CBook;
    readonly bookLinks: CLink[];
    cMap(map: Map): CMap;
    readonly mapLinks: CLink[];
    getTuidContent(tuid: Tuid): React.StatelessComponent<any>;
    showTuid(tuid: Tuid, id: number): Promise<void>;
    protected readonly VUsq: typeof VUsq;
    render(): JSX.Element;
}
