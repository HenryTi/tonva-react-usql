var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from 'mobx';
import { Entity } from './entity';
export class Query extends Entity {
    constructor() {
        super(...arguments);
        this.queryApiName = 'page';
    }
    get typeName() { return 'query'; }
    setSchema(schema) {
        super.setSchema(schema);
        let { returns } = schema;
        this.returns = returns;
        this.isPaged = returns.find(v => v.name === '$page') !== undefined;
    }
    resetPage(size, params) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        this.list = undefined;
    }
    get hasMore() { return this.more; }
    async loadPage() {
        if (this.pageSize === undefined) {
            throw 'call resetPage(size:number, params:any) first';
        }
        let pageStart;
        if (this.pageStart !== undefined) {
            switch (this.startField.type) {
                default:
                    pageStart = this.pageStart;
                    break;
                case 'date':
                case 'time':
                case 'datetime':
                    pageStart = this.pageStart.getTime();
                    break;
            }
        }
        await this.loadSchema();
        let res = await this.tvApi.queryPage(this.queryApiName, this.name, pageStart, this.pageSize + 1, this.params);
        let data = await this.unpackReturns(res);
        this.list = observable.array([], { deep: false });
        let page = data['$page'];
        if (page !== undefined) {
            if (page.length > this.pageSize) {
                this.more = true;
                page.pop();
                let ret = this.returns.find(r => r.name === '$page');
                this.startField = ret.fields[0];
                this.pageStart = page[page.length - 1][this.startField.name];
            }
            else {
                this.more = false;
            }
            this.list.push(...page);
        }
        //this.loaded = true;
    }
    async page(params, pageStart, pageSize) {
        await this.loadSchema();
        let res = await this.tvApi.queryPage(this.queryApiName, this.name, pageStart, pageSize + 1, params);
        let data = await this.unpackReturns(res);
        return data.$page; // as any[];
    }
    async query(params) {
        await this.loadSchema();
        let res = await this.tvApi.query(this.name, params);
        let data = await this.unpackReturns(res);
        return data;
    }
}
__decorate([
    observable
], Query.prototype, "list", void 0);
//# sourceMappingURL=query.js.map