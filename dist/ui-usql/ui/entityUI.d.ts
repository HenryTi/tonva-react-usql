import { UIComponent, FieldMappers, FieldFaces, FieldFace } from './mapper';
import { EntitiesUI, EntitySet } from './entitiesUI';
import { Entity } from '../entities';
export declare abstract class EntityUIO<E extends Entity> {
    private wsHandlers;
    entitiesUI: EntitiesUI;
    entitySet: EntitySet<E, EntityUIO<E>>;
    entity: E;
    caption: string;
    icon?: string;
    typeFieldMappers?: FieldMappers;
    fieldFaces?: FieldFaces;
    mapMain(): any[];
    onWsReceive(cmd: string, onWsReceive: (data: any) => Promise<void>): void;
    onWsReceiveAny(onWsReceive: (data: any) => Promise<void>): void;
    endWsReceive(): void;
    protected tfmMap(sf: any, ff: FieldFace): any;
    protected mapFields(schemaFields: any[]): any[];
    link?: UIComponent<E, EntityUIO<E>>;
    mainPage?: UIComponent<E, EntityUIO<E>>;
    showMain(): Promise<void>;
    data: any;
    ret: any;
    submit(): Promise<void>;
}
