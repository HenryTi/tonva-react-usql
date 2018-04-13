import { EntityUI } from './entityUI';
export class HistoryUI extends EntityUI {
    mapKeys() {
        return this.mapFields(this.entity.schema.keys);
    }
}
//# sourceMappingURL=historyUI.js.map