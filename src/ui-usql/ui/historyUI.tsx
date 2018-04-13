import {Entities, Entity, Tuid, Action, Sheet, Query, History} from '../entities';
import {EntitiesUI} from './entitiesUI';
import {EntityUI} from './entityUI';

export class HistoryUI extends EntityUI<History> {
    mapKeys():any[] {
        return this.mapFields(this.entity.schema.keys);
    }
    listRow?: new (props:{item:any; index:number}) => React.Component<any>;
}

