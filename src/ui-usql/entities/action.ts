import {Entity} from './entity';

export class Action extends Entity {
    async submit(data:object) {
        await this.loadSchema();
        let text = this.entities.pack(this.schema, data);
        return await this.tvApi.action(this.name, {data:text});
    }
}

