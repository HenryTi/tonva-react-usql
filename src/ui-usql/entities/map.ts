import { Entity } from './entity';
import { Action } from './action';
import { Query } from './query';
import { Field } from './entities';

interface MapActions {
    add: Action;
    del: Action;
}
interface MapQueries {
    all: Query;
    page: Query;
    query: Query;
}

export class Map extends Entity {
    get typeName(): string { return 'map';}
    keys: Field[];
    actions: MapActions = {} as any;
    queries: MapQueries = {} as any;

    setSchema(schema:any) {
        super.setSchema(schema);
        let {actions, queries, keys} = schema;
        this.entities.buildFieldTuid(this.keys = keys);
        //let t = this.schemaStringify();
        for (let i in actions) {
            let schema = actions[i];
            let {name} = schema;
            let action = this.entities.newAction(name, undefined);
            action.setSchema(schema);
            this.actions[i] = action;
        }
        for (let i in queries) {
            let schema = queries[i];
            let {name} = schema;
            let query = this.entities.newQuery(name, undefined);
            query.setSchema(schema);
            this.queries[i] = query;
        }
    }
}
