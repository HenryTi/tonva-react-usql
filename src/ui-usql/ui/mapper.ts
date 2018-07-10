import {Entities, Entity, Tuid, Slave, Action, Sheet, Query, Book, History} from "../entities";
import {EntitiesUI} from './entitiesUI';
import {EntityUIO} from './entityUI';
import {ActionUIO} from './actionUI';
import {QueryUI} from './queryUI';
import {SheetUIO} from './sheetUI';
import {TuidUIO, SlaveUI} from './tuidUI';
import {BookUI} from './bookUI';
import {HistoryUI} from './historyUI';

export interface TuidInput {
    component?: TuidInputComponent;
    inputContent?: new (props:{value:any}) => React.Component<{value:any}>;
    search?: (pageStart:any, pageSize:number, params:any) => Promise<any[]>;
    candidateRow?: new (props:{item:any; index:number}) => React.Component<any>;
    pickPage?: new (props:TuidPickPageProps) => React.Component<TuidPickPageProps>;
}
export interface TuidContentProps {
    id: number;
    ui: TuidUIO;
}
export interface TuidInputProps extends TuidContentProps {
    //id: number;
    //tuid: string;
    //input: TuidInput;
    //readOnly: boolean;
    //entitiesUI: EntitiesUI;
    onFormValues: ()=>any;
    onIdChanged: (id:any) => void;
}
export interface TuidPickPageProps extends TuidInputProps { 
    //id: number;
    //tuidUI: TuidUI;
    //input: TuidInput;
    //params: any;
    onPicked: (value:any) => void;
}
export type TuidInputComponent = new (props:TuidInputProps) => React.Component<TuidInputProps>;

export type FieldMapper = (field:any) => any;
export interface FieldMappers {
    [name:string]: FieldMapper;
}
export interface FieldFace {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: TuidInput;
    mapper?: FieldMapper;
}
export interface FieldFaces {
    [name:string]: FieldFace;
}

export type TuidUISlaveComponent = new (props:TuidUISlaveProps) => React.Component<TuidUISlaveProps>;
export type TuidUIBindSlaveComponent = new (props:TuidUIBindSlaveProps) => React.Component<TuidUIBindSlaveProps>;

export interface EntitiesUIProps {
    ui: EntitiesUI;
    data?: any;
}
export type EntitiesUIComponent = new (props: EntitiesUIProps) => React.Component<EntitiesUIProps>;

export interface EntityUIProps<T extends Entity, TUI extends EntityUIO<T>> {
    ui: TUI;
    data?: any;
}
export type UIComponent<T extends Entity, TUI extends EntityUIO<T>> = new (props:EntityUIProps<T, TUI>) => React.Component<EntityUIProps<T, TUI>>;
export type ActionUIProps = EntityUIProps<Action, ActionUIO>;
export type ActionUIComponent = new (props:ActionUIProps) => React.Component<ActionUIProps>;
export type QueryUIProps = EntityUIProps<Query, QueryUI>;
export type QueryUIComponent = new (props:QueryUIProps) => React.Component<QueryUIProps>;
export type BookUIProps = EntityUIProps<Book, BookUI>;
export type BookUIComponent = new (props:BookUIProps) => React.Component<BookUIProps>;
export type HistoryUIProps = EntityUIProps<History, HistoryUI>;
export type HistoryUIComponent = new (props:HistoryUIProps) => React.Component<HistoryUIProps>;
export type SheetUIProps = EntityUIProps<Sheet, SheetUIO>;
export type SheetViewProps = EntityUIProps<Sheet, SheetUIO> & {
    className:string;
    sheetState: any;
    flows: any
};
export type SheetUIComponent = new (props:SheetUIProps) => React.Component<SheetUIProps>;
export type SheetViewComponent = new (props:SheetViewProps) => React.Component<SheetViewProps>;
export type TuidUIProps = EntityUIProps<Tuid, TuidUIO>;
export type TuidUIComponent = new (props:TuidUIProps) => React.Component<TuidUIProps>;
export type TuidUIBindSlaveProps = TuidUIProps & {bindSlave:TuidUIO; masterId?:number};
export type TuidUISlaveProps = TuidUIProps & {slave:SlaveUI, masterId?:number};

export interface EntityMapper<T extends Entity, TUI extends EntityUIO<T>> {
    caption?: string;
    icon?: string;
    typeFieldMappers?: FieldMappers;
    fieldFaces?: FieldFaces;
    link?: UIComponent<T, TUI>;
    mainPage?: UIComponent<T, TUI>;
}
export type TuidListPage = TuidUIComponent | {row?: TuidUIComponent};
export interface TuidMapper extends EntityMapper<Tuid, TuidUIO> {
    editPage?: TuidUIComponent;
    listPage?: TuidListPage;
    input?: TuidInput;
    slaveInput?: TuidUISlaveComponent;
    bindSlaveInput?: TuidUIBindSlaveComponent;
}

export interface ActionMapper extends EntityMapper<Action, ActionUIO> {
}

export interface DetailFace {
    label?: string;
    renderRow?: SheetUIComponent;
    fields: FieldFaces;
}
export interface SheetMapper extends EntityMapper<Sheet, SheetUIO> {
    detailFaces?: {[detail:string]: DetailFace;}
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
    listRow?: new (props:{item:any; index:number}) => React.Component<any>;
}

export interface MapperContainer<E extends Entity, U extends EntityUIO<E>, T extends EntityMapper<E, U>> {
    caption?: string;
    icon?: string;
    mapper?: T;
    mappers?: {[name:string]: T};
    list?: string[];    // 清单，如果undefined，则全部，按字母顺序排名
}
export interface EntitiesMapper {
    mainPage?: EntitiesUIComponent;
    caption?: string;

    typeFieldMappers?: {[name:string]: FieldMapper};

    tuid?: MapperContainer<Tuid, TuidUIO, TuidMapper>;
    action?: MapperContainer<Action, ActionUIO, ActionMapper>;
    sheet?: MapperContainer<Sheet, SheetUIO, SheetMapper>;
    query?: MapperContainer<Query, QueryUI, QueryMapper>;
    book?: MapperContainer<Book, BookUI, BookMapper>;
    history?: MapperContainer<History, HistoryUI, HistoryMapper>;
}
