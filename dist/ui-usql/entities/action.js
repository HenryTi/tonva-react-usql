import { Entity } from './entity';
export class Action extends Entity {
    submit(data) {
        let text = this.entities.pack(this.schema, data);
        return this.tvApi.action(this.name, { data: text });
    }
}
//# sourceMappingURL=action.js.map