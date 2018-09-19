import * as React from 'react';
import { Controller } from 'tonva-tools';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq } from '../../entities';
import { CrLink } from '../link';
import { CrBook } from '../book';
import { CrSheet, SheetUI } from '../sheet';
import { CrAction } from '../action';
import { QueryUI, CrQuery, CrQuerySelect } from '../query';
import { CrTuidMain, TuidUI, CrTuidMainSelect, CrTuidInfo } from '../tuid';
import { MapUI, CrMap } from '../map';
import { CrEntity, EntityUI } from '../VM';
import { VmUsq } from './vmUsq';
export declare type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book' | 'map';
export interface UsqUI {
    CrTuidMain?: typeof CrTuidMain;
    CrQuery?: typeof CrQuery;
    CrQuerySelect?: typeof CrQuerySelect;
    CrMap?: typeof CrMap;
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
export declare class CrUsq extends Controller implements Usq {
    private access;
    private ui;
    private CrTuidMain;
    private CrQuery;
    private CrQuerySelect;
    private CrMap;
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
    crFromName(entityType: EntityType, entityName: string): CrEntity<Entity, EntityUI>;
    linkFromName(entityType: EntityType, entityName: string): CrLink;
    private getUI;
    link(crEntity: CrEntity<Entity, EntityUI>): CrLink;
    readonly tuidLinks: CrLink[];
    crTuidMain(tuid: TuidMain): CrTuidMain;
    crTuidSelect(tuid: TuidMain): CrTuidMainSelect;
    crTuidInfo(tuid: Tuid): CrTuidInfo;
    crSheet(sheet: Sheet): CrSheet;
    readonly sheetLinks: CrLink[];
    crAction(action: Action): CrAction;
    readonly actionLinks: CrLink[];
    crQuery(query: Query): CrQuery;
    crQuerySelect(queryName: string): CrQuerySelect;
    readonly queryLinks: CrLink[];
    crBook(book: Book): CrBook;
    readonly bookLinks: CrLink[];
    crMap(map: Map): CrMap;
    readonly mapLinks: CrLink[];
    getTuidContent(tuid: Tuid): React.StatelessComponent<any>;
    showTuid(tuid: Tuid, id: number): Promise<void>;
    protected readonly VmUsq: typeof VmUsq;
    render(): JSX.Element;
}
