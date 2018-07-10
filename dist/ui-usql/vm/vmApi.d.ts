import { ViewModel, TypeContent } from './viewModel';
import { Tuid, Action, Sheet, Query, Book, Entity } from '../entities';
import { VmLink, VmEntityLink } from './link';
import { VmBookMain } from './book';
import { VmSheetMain } from './sheet';
import { VmActionMain } from './action';
import { VmQueryMain } from './query';
import { VmTuidMain } from './tuid';
import { VmApp } from './vmApp';
import { TypeVmTuidControl, PickerConfig } from './vmForm';
import { VmEntity, EntityUI } from './vmEntity';
export declare type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book';
export declare class VmApi extends ViewModel {
    private url;
    private access;
    private ui;
    private entities;
    constructor(vmApp: VmApp, url: string, api: string, access: string, ui: any);
    api: string;
    vmApp: VmApp;
    loadSchema(): Promise<void>;
    getTuid(name: string): Tuid;
    protected isSysVisible: boolean;
    protected isVisible(entity: Entity): boolean;
    vmLinkFromName(entityType: EntityType, entityName: string): VmEntityLink;
    private getUI;
    private getUITypeCaption;
    readonly tuidTypeCaption: any;
    readonly vmTuidLinks: VmEntityLink[];
    newVmTuidLink(vmTuid: VmTuidMain): VmEntityLink;
    newVmTuid(tuid: Tuid): VmTuidMain;
    readonly sheetTypeCaption: any;
    protected newVmSheetLink(vmSheet: VmSheetMain): VmEntityLink;
    newVmSheet(sheet: Sheet): VmSheetMain;
    readonly vmSheetLinks: VmEntityLink[];
    readonly actionTypeCaption: any;
    newVmActionLink(vmAction: VmActionMain): VmEntityLink;
    newVmAction(action: Action): VmActionMain;
    readonly vmActionLinks: VmEntityLink[];
    readonly queryTypeCaption: any;
    newVmQueryLink(vmQuery: VmQueryMain): VmEntityLink;
    newVmQuery(query: Query): VmQueryMain;
    readonly vmQueryLinks: VmEntityLink[];
    readonly bookTypeCaption: any;
    newVmBookLink(vmBook: VmBookMain): VmEntityLink;
    newVmBook(book: Book): VmBookMain;
    readonly vmBookLinks: VmEntityLink[];
    renderLink: (vmLink: VmLink, index: number) => JSX.Element;
    linkClick: (vmLink: VmLink) => void;
    typeVmTuidControl(tuid: Tuid): TypeVmTuidControl;
    pickerConfig(tuid: Tuid): PickerConfig;
    typeTuidContent(tuid: Tuid): TypeContent;
    create<T extends VmEntity>(vmType: new (vmApi: VmApi, entity: Entity, ui: EntityUI) => T, entity: Entity, ui: EntityUI): Promise<T>;
    nav: <T extends VmEntity>(vmType: new (vmApi: VmApi, entity: Entity, ui: EntityUI) => T, entity: Entity, ui: EntityUI, param?: any) => Promise<void>;
    protected view: ({ vm }: {
        vm: VmApi;
    }) => JSX.Element;
}
