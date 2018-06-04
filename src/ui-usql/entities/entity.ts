import {UsqlApi} from './usqlApi';
import {Entities} from './entities';

export abstract class Entity {
    protected entities: Entities;
    protected api:UsqlApi;
    readonly name: string;
    readonly id: number;

    constructor(entities:Entities, api:UsqlApi, name:string, id:number) {
        this.entities = entities;
        this.api = api;
        this.name = name;
        this.id = id;
    }

    public schema: any;

    protected get tvApi() {return this.api;} //{return this.entities.tvApi;}

    public async loadSchema():Promise<void> {
        if (this.schema !== undefined) return;
        this.schema = await this.api.schema(this.name);
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
