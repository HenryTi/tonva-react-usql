import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {TuidUIComponent, TuidInputComponent, TuidInput} from './mapper';
import {EntitiesUI} from './entitiesUI';
import {EntityUI} from './entityUI';

export class TuidUI extends EntityUI<Tuid> {
    editPage?: TuidUIComponent;
    searchPage?: TuidUIComponent;
    input?: TuidInput;
}
