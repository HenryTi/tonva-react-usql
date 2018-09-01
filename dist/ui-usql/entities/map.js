import { Entity } from './entity';
export class Map extends Entity {
    constructor() {
        super(...arguments);
        this.actions = {};
        this.queries = {};
    }
    get typeName() { return 'map'; }
    setSchema(schema) {
        super.setSchema(schema);
        let { actions, queries, keys } = schema;
        this.entities.buildFieldTuid(this.keys = keys);
        //let t = this.schemaStringify();
        for (let i in actions) {
            let schema = actions[i];
            let { name } = schema;
            let action = this.entities.newAction(name, undefined);
            action.setSchema(schema);
            this.actions[i] = action;
        }
        for (let i in queries) {
            let schema = queries[i];
            let { name } = schema;
            let query = this.entities.newQuery(name, undefined);
            query.setSchema(schema);
            this.queries[i] = query;
        }
        //t = this.schemaStringify();
    }
}
//# sourceMappingURL=map.js.map