/// <reference types="react" />
import { Entity, Tuid, Action, Sheet, Query, Book, History } from "../entities";
import { EntitiesUI } from './entitiesUI';
import { EntityUI } from './entityUI';
import { ActionUI } from './actionUI';
import { QueryUI } from './queryUI';
import { SheetUI } from './sheetUI';
import { TuidUI } from './tuidUI';
import { BookUI } from './bookUI';
import { HistoryUI } from './historyUI';
export interface TuidInput {
    component?: TuidInputComponent;
    inputContent?: new (props: {
        value: any;
    }) => React.Component<{
        value: any;
    }>;
    search?: (pageStart: any, pageSize: number, params: any) => Promise<any[]>;
    candidateRow?: new (props: {
        item: any;
        index: number;
    }) => React.Component<any>;
    pickPage?: new (props: TuidPickPageProps) => React.Component<TuidPickPageProps>;
}
export interface TuidContentProps {
    id: number;
    ui: TuidUI;
}
export interface TuidInputProps extends TuidContentProps {
    onFormValues: () => any;
    onIdChanged: (id: any) => void;
}
export interface TuidPickPageProps extends TuidInputProps {
}
export declare type TuidInputComponent = new (props: TuidInputProps) => React.Component<TuidInputProps>;
export declare type FieldMapper = (field: any) => any;
export interface FieldMappers {
    [name: string]: FieldMapper;
}
export interface FieldFace {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: TuidInput;
    mapper?: FieldMapper;
}
export interface FieldFaces {
    [name: string]: FieldFace;
}
export declare type TuidUISlaveComponent = new (props: TuidUISlaveProps) => React.Component<TuidUISlaveProps>;
export interface EntitiesUIProps {
    ui: EntitiesUI;
    data?: any;
}
export declare type EntitiesUIComponent = new (props: EntitiesUIProps) => React.Component<EntitiesUIProps>;
export interface EntityUIProps<T extends Entity, TUI extends EntityUI<T>> {
    ui: TUI;
    data?: any;
}
export declare type UIComponent<T extends Entity, TUI extends EntityUI<T>> = new (props: EntityUIProps<T, TUI>) => React.Component<EntityUIProps<T, TUI>>;
export declare type ActionUIProps = EntityUIProps<Action, ActionUI>;
export declare type ActionUIComponent = new (props: ActionUIProps) => React.Component<ActionUIProps>;
export declare type QueryUIProps = EntityUIProps<Query, QueryUI>;
export declare type QueryUIComponent = new (props: QueryUIProps) => React.Component<QueryUIProps>;
export declare type BookUIProps = EntityUIProps<Book, BookUI>;
export declare type BookUIComponent = new (props: BookUIProps) => React.Component<BookUIProps>;
export declare type HistoryUIProps = EntityUIProps<History, HistoryUI>;
export declare type HistoryUIComponent = new (props: HistoryUIProps) => React.Component<HistoryUIProps>;
export declare type SheetUIProps = EntityUIProps<Sheet, SheetUI>;
export declare type SheetViewProps = EntityUIProps<Sheet, SheetUI> & {
    className: string;
    sheetState: any;
    flows: any;
};
export declare type SheetUIComponent = new (props: SheetUIProps) => React.Component<SheetUIProps>;
export declare type SheetViewComponent = new (props: SheetViewProps) => React.Component<SheetViewProps>;
export declare type TuidUIProps = EntityUIProps<Tuid, TuidUI>;
export declare type TuidUIComponent = new (props: TuidUIProps) => React.Component<TuidUIProps>;
export declare type TuidUISlaveProps = TuidUIProps & {
    slave: TuidUI;
    masterId?: number;
};
export interface EntityMapper<T extends Entity, TUI extends EntityUI<T>> {
    caption?: string;
    icon?: string;
    typeFieldMappers?: FieldMappers;
    fieldFaces?: FieldFaces;
    link?: UIComponent<T, TUI>;
    mainPage?: UIComponent<T, TUI>;
}
export interface TuidMapper extends EntityMapper<Tuid, TuidUI> {
    editPage?: TuidUIComponent;
    listPage?: TuidUIComponent;
    input?: TuidInput;
    slaveInput?: TuidUISlaveComponent;
}
export interface ActionMapper extends EntityMapper<Action, ActionUI> {
}
export interface DetailFace {
    label?: string;
    renderRow?: SheetUIComponent;
    fields: FieldFaces;
}
export interface SheetMapper extends EntityMapper<Sheet, SheetUI> {
    detailFaces?: {
        [detail: string]: DetailFace;
    };
    view?: SheetViewComponent;
    archivedList?: SheetUIComponent;
    archivedSheet?: SheetUIComponent;
    sheetAction?: SheetUIComponent;
    sheetNew?: SheetUIComponent;
    stateSheetList?: SheetUIComponent;
}
export interface QueryMapper extends EntityMapper<Query, QueryUI> {
}
export interface BookMapper extends EntityMapper<Book, BookUI> {
}
export interface HistoryMapper extends EntityMapper<History, HistoryUI> {
    listRow?: new (props: {
        item: any;
        index: number;
    }) => React.Component<any>;
}
export interface MapperContainer<E extends Entity, U extends EntityUI<E>, T extends EntityMapper<E, U>> {
    caption?: string;
    icon?: string;
    mapper?: T;
    mappers?: {
        [name: string]: T;
    };
    list?: string[];
}
export interface EntitiesMapper {
    mainPage?: EntitiesUIComponent;
    caption?: string;
    typeFieldMappers?: {
        [name: string]: FieldMapper;
    };
    tuid?: MapperContainer<Tuid, TuidUI, TuidMapper>;
    action?: MapperContainer<Action, ActionUI, ActionMapper>;
    sheet?: MapperContainer<Sheet, SheetUI, SheetMapper>;
    query?: MapperContainer<Query, QueryUI, QueryMapper>;
    book?: MapperContainer<Book, BookUI, BookMapper>;
    history?: MapperContainer<History, HistoryUI, HistoryMapper>;
}
