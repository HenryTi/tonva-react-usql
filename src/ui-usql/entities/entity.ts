import {UsqlApi} from './usqlApi';
import {Entities} from './entities';

export abstract class Entity {
    protected entities: Entities;
    protected api:UsqlApi;
    sys?: boolean;
    readonly name: string;
    readonly id: number;

    constructor(entities:Entities, api:UsqlApi, name:string, id:number) {
        this.entities = entities;
        this.api = api;
        this.name = name;
        this.id = id;
        this.sys = this.name.indexOf('$') >= 0;
    }

    public schema: any;
    public face: any;           // 对应字段的label, placeHolder等等的中文，或者语言的翻译

    protected get tvApi() {return this.api;} //{return this.entities.tvApi;}

    public async loadSchema():Promise<void> {
        if (this.schema !== undefined) return;
        this.setSchema(await this.api.schema(this.name));
    }

    public setSchema(schema:any) {
        if (schema === undefined) return;
        if (this.schema !== undefined) return;
        this.schema = schema;
        this.entities.schemaRefTuids(schema.tuids);
    }
    /*
    protected lowerCaseSchema() {}
    protected lowerCaseFields(fields:any) {
        for (let f of fields) {
            f._name = (f.name as string).toLowerCase();
        }
    }
    protected lowerCaseReturns(returns:any) {
        if (returns === undefined) return;
        for (let ret of returns) this.lowerCaseFields(ret.fields);
    }*/
}
