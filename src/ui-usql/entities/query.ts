import {observable, IObservableArray} from 'mobx';
import {Field} from './entities';
import {Entity} from './entity';

export type QueryPageApi = (name:string, pageStart:any, pageSize:number, params:any) => Promise<string>;
export class Query extends Entity {
    private pageStart: any;
    private pageSize:number;
    private params:any;
    private more: boolean;
    private startField: Field;
    protected queryApiName = 'page';
    @observable loaded: boolean;
    list:IObservableArray = observable.array([], {deep: false});

    resetPage(size:number, params:any) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        this.loaded = false;
        this.list.clear();
    }
    get hasMore() {return this.more;}
    async loadPage():Promise<void> {
        if (this.pageSize === undefined) {
            throw 'call resetPage(size:number, params:any) first';
        }
        let pageStart:any;
        if (this.pageStart !== undefined) {
            switch (this.startField.type) {
                default: pageStart = this.pageStart; break;
                case 'date':
                case 'time':
                case 'datetime': pageStart = (this.pageStart as Date).getTime(); break;
            }
        }
        let res = await this.tvApi.queryPage(this.queryApiName, this.name, pageStart, this.pageSize+1, this.params);
        let data = this.entities.unpackReturns(this.schema, res);
        let page = data['$page'] as any[];
        if (page !== undefined) {
            if (page.length > this.pageSize) {
                this.more = true;
                page.pop();
                let ret = (this.schema.returns as any[]).find(r => r.name === '$page');
                this.startField = ret.fields[0];
                this.pageStart = page[page.length-1][this.startField.name];
            }
            else {
                this.more = false;
            }
            this.list.push(...page);
        }
        this.loaded = true;
    }
}
