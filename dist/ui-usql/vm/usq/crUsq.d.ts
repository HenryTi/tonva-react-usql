import * as React from 'react';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq } from '../../entities';
import { VmEntityLink } from '../link';
import { CrBook } from '../book';
import { CrSheet, SheetUI } from '../sheet';
import { CrAction } from '../action';
import { QueryUI, CrQuery, CrQuerySelect } from '../query';
import { CrTuidMain, TuidUI, CrTuidMainSelect, CrTuidInfo } from '../tuid';
import { MapUI, CrMap } from '../map';
import { CrEntity, EntityUI, Coordinator } from '../VM';
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
export declare class CrUsq extends Coordinator implements Usq {
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
    vmLinkFromName(entityType: EntityType, entityName: string): VmEntityLink;
    private getUI;
    vmLink(crEntity: CrEntity<Entity, EntityUI>): VmEntityLink;
    readonly vmTuidLinks: VmEntityLink[];
    crTuidMain(tuid: TuidMain): CrTuidMain;
    crTuidSelect(tuid: TuidMain): CrTuidMainSelect;
    crTuidInfo(tuid: Tuid): CrTuidInfo;
    crSheet(sheet: Sheet): CrSheet;
    readonly vmSheetLinks: VmEntityLink[];
    crAction(action: Action): CrAction;
    readonly vmActionLinks: VmEntityLink[];
    crQuery(query: Query): CrQuery;
    crQuerySelect(queryName: string): CrQuerySelect;
    readonly vmQueryLinks: VmEntityLink[];
    crBook(book: Book): CrBook;
    readonly vmBookLinks: VmEntityLink[];
    crMap(map: Map): CrMap;
    readonly vmMapLinks: VmEntityLink[];
    getTuidContent(tuid: Tuid): React.StatelessComponent<any>;
    showTuid(tuid: Tuid, id: number): Promise<void>;
    protected readonly VmUsq: typeof VmUsq;
    render(): JSX.Element;
}
