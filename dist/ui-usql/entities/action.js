import { Entity } from './entity';
export class Action extends Entity {
    get typeName() { return 'action'; }
    async submit(data) {
        await this.loadSchema();
        let text = this.pack(data);
        return await this.tvApi.action(this.name, { data: text });
    }
}
//# sourceMappingURL=action.js.map