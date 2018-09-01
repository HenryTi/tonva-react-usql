import * as React from 'react';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq } from '../../entities';
import { VmEntityLink } from '../link';
import { CrBook } from '../book';
import { CrSheet } from '../sheet';
import { CrAction } from '../action';
import { QueryUI, CrQuery, CrQuerySelect } from '../query';
import { CrTuidMain, TuidUI, CrTuidMainSelect } from '../tuid';
import { MapUI, CrMap } from '../map';
import { CrApp } from '../crApp';
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
    map?: {
        [name: string]: MapUI;
    };
    query?: {
        [name: string]: QueryUI;
    };
    res: any;
}
export declare class CrUsq implements Usq {
    vmApp: CrApp;
    private access;
    private ui;
    private CrTuidMain;
    private CrQuery;
    private CrQuerySelect;
    private CrMap;
    constructor(vmApp: CrApp, apiId: number, api: string, access: string, ui: UsqUI);
    api: string;
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
    protected readonly VmUsq: typeof VmUsq;
    render(): JSX.Element;
}
