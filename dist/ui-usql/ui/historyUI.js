import { EntityUIO } from './entityUI';
export class HistoryUI extends EntityUIO {
    mapKeys() {
        return this.mapFields(this.entity.schema.keys);
    }
}
//# sourceMappingURL=historyUI.js.map