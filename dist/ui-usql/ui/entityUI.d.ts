import { UIComponent, FieldMappers, FieldFaces, FieldFace } from './mapper';
import { EntitiesUI, EntitySet } from './entitiesUI';
import { Entity } from '../entities';
export declare abstract class EntityUI<E extends Entity> {
    private wsHandlers;
    entitiesUI: EntitiesUI;
    entitySet: EntitySet<E, EntityUI<E>>;
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
    link?: UIComponent<E, EntityUI<E>>;
    mainPage?: UIComponent<E, EntityUI<E>>;
}
