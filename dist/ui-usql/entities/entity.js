var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Entity {
    constructor(entities, api, name, id) {
        this.entities = entities;
        this.api = api;
        this.name = name;
        this.id = id;
        this.sys = this.name.indexOf('$') >= 0;
    }
    get tvApi() { return this.api; } //{return this.entities.tvApi;}
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema !== undefined)
                return;
            this.setSchema(yield this.api.schema(this.name));
        });
    }
    setSchema(schema) {
        if (schema === undefined)
            return;
        if (this.schema !== undefined)
            return;
        this.schema = schema;
        this.entities.schemaRefTuids(schema.tuids);
    }
    getFieldTuid(fieldName, arrName) {
        if (this.schema === undefined)
            return;
        let { fields, arrs } = this.schema;
        let entities = this.entities;
        function getTuid(fn, fieldArr) {
            if (fieldArr === undefined)
                return;
            let f = fieldArr.find(v => v.name === fn);
            if (f === undefined)
                return;
            return entities.getTuid(f.tuid, undefined);
        }
        if (arrName === undefined)
            return getTuid(fieldName.toLowerCase(), fields);
        if (arrs === undefined)
            return;
        let an = arrName.toLowerCase();
        let arr = arrs.find(v => v.name === an);
        if (arr === undefined)
            return;
        return getTuid(fieldName.toLowerCase(), arr.fields);
    }
}
//# sourceMappingURL=entity.js.map