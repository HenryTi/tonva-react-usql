import { Entities, Field, ArrFields } from './entities';
import { TuidMain, Tuid } from './tuid';

const tab = '\t';
const ln = '\n';

export abstract class Entity {
    protected entities: Entities;
    private schema: any;
    sys?: boolean;
    readonly name: string;
    readonly typeId: number;
    abstract get typeName(): string;
    /*private newMain: ()=>void;
    private newArr:{[name:string]: ()=>void};
    private newRet:{[name:string]: ()=>void};
    */
    fields: Field[];
    arrFields: ArrFields[];
    returns: ArrFields[];

    constructor(entities:Entities, name:string, typeId:number) {
        this.entities = entities;
        this.name = name;
        this.typeId = typeId;
        this.sys = this.name.indexOf('$') >= 0;
    }

    public face: any;           // 对应字段的label, placeHolder等等的中文，或者语言的翻译

    protected get tvApi() {return this.entities.tvApi;}

    public async loadSchema():Promise<void> {
        if (this.schema !== undefined) return;
        let schema = await this.entities.tvApi.schema(this.name);
        this.setSchema(schema);
    }

    public setSchema(schema:any) {
        if (schema === undefined) return;
        if (this.schema !== undefined) return;
        this.schema = schema;
        let {fields, arrs, returns} = schema;
        this.entities.buildFieldTuid(this.fields = fields);
        this.entities.buildArrFieldsTuid(this.arrFields = arrs);
        this.entities.buildArrFieldsTuid(this.returns = returns);
        //this.newMain = this.buildCreater(fields);
        //this.newArr = this.buildArrCreater(arrs);
        //this.newRet = this.buildArrCreater(returns);
    }
    private buildCreater(fields:Field[]):()=>void {
        let creater = function():void {};
        let prototype = creater.prototype;
        for (let f of fields) {
            let {name, _tuid} = f;
            if (_tuid === undefined) continue;
            let nTuid = '_$' + _tuid.name;
            if (prototype.hasOwnProperty(nTuid) === false) {
                Object.defineProperty(prototype, nTuid, {
                    value: _tuid,
                    writable: false,
                    enumerable: false,
                });
            }
            prototype.toJSON = function() {
                let ret = {} as any;
                for (let i in this) {
                    if (i.startsWith('_$') === true) continue;
                    ret[i] = this[i];
                }
                return ret;
            };
            (function(fn:string, nt:string) {
                let $fn = '$' + fn;
                Object.defineProperty(prototype, $fn, {
                    enumerable: true,
                    get: function() {
                        let ret = this[fn];
                        console.log('prop '+fn+' get ');
                        return (this[nt] as Tuid).valueFromId(ret);
                    },
                    set: function(v) {
                        this[fn]=v;
                    }
                });
            })(name, nTuid);
        }
        return creater;
    }
    private buildArrCreater(arrFields:ArrFields[]):{[name:string]: ()=>void} {
        if (arrFields === undefined) return;
        let ret:{[name:string]: ()=>void} = {};
        for (let e of arrFields) {
            let {name, fields} = e;
            ret[name] = this.buildCreater(fields);
        }
        return ret;
    }

    private removeRecursive(parent:any[], obj:any):any {
        if (typeof obj !== 'object') return obj;
        let ret = {} as any;
        parent.push(obj);
        for (let i in obj) {
            ret[i] = this.removeRecursive(parent, obj[i]);
        }
        parent.pop();
        return ret;
    }
    schemaStringify():string {
        let obj = this.removeRecursive([], this.schema);
        return JSON.stringify(obj, undefined, 4);
    }

    getTuid(field:Field):Tuid {
        let {_tuid, tuid} = field;
        if (tuid === undefined) return;
        if (_tuid !== undefined) return _tuid;
        return field._tuid = this.entities.getTuid(tuid, undefined);
    }

    getTuidFromName(fieldName:string, arrName?:string):Tuid {
        if (this.schema === undefined) return;
        let {fields, arrs} = this.schema;
        let entities = this.entities;
        function getTuid(fn:string, fieldArr:Field[]) {
            if (fieldArr === undefined) return;
            let f = fieldArr.find(v => v.name === fn);
            if (f === undefined) return;
            return entities.getTuid(f.tuid, undefined);
        }
        let fn = fieldName.toLowerCase();
        if (arrName === undefined) return getTuid(fn, fields);
        if (arrs === undefined) return;
        let an = arrName.toLowerCase();
        let arr = (arrs as ArrFields[]).find(v => v.name === an);
        if (arr === undefined) return;
        return getTuid(fn, arr.fields);
    }
    pack(data:any):string {
        let ret:string[] = [];
        //if (schema === undefined || data === undefined) return;
        let fields = this.fields;
        if (fields !== undefined) this.packRow(ret, fields, data);
        let arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                this.packArr(ret, arr.fields, data[arr.name]);
            }
        }
        return ret.join('');
    }
    
    private escape(d:any):any {
        switch (typeof d) {
            default: return d;
            case 'string':
                let len = d.length;
                let r = '', p = 0;
                for (let i=0;i<len;i++) {
                    let c = d.charCodeAt(i);
                    switch(c) {
                        case 9: r += d.substring(p, i) + '\\t'; p = i+1; break;
                        case 10: r += d.substring(p, i) + '\\n'; p = i+1; break;
                    }
                }
                return r + d.substring(p);
            case 'undefined': return '';
        }
    }
    
    private packRow(result:string[], fields:Field[], data:any) {
        let ret = '';
        let len = fields.length;
        ret += this.escape(data[fields[0].name]);
        for (let i=1;i<len;i++) {
            let f = fields[i];
            ret += tab + this.escape(data[f.name]);
        }
        result.push(ret + ln);
    }
    
    private packArr(result:string[], fields:Field[], data:any[]) {
        if (data !== undefined) {
            for (let row of data) {
                this.packRow(result, fields, row);
            }
        }
        result.push(ln);
    }
    
    unpackSheet(data:string):any {
        let ret = {} as any; //new this.newMain();
        //if (schema === undefined || data === undefined) return;
        let fields = this.fields;
        let p = 0;
        if (fields !== undefined) p = this.unpackRow(ret, fields, data, p);
        let arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    
    unpackReturns(data:string):any {
        let ret = {} as any;
        //if (schema === undefined || data === undefined) return;
        //let fields = schema.fields;
        let p = 0;
        //if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
        let arrs = this.returns; //schema['returns'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                //let creater = this.newRet[arr.name];
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    
    private unpackRow(ret:any, fields:Field[], data:string, p:number):number {
        let ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        for (;p<len;p++) {
            ch0 = ch;
            ch = data.charCodeAt(p);
            if (ch === 9) {
                let f = fields[i];
                if (ch0 !== 8) {
                    let v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    let s = null;
                }
                c = p+1;
                ++i;
                if (i>=fLen) break;
            }
            else if (ch === 10) {
                let f = fields[i];
                if (ch0 !== 8) {
                    let v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    let s = null;
                }
                ++p;
                ++i;
                break;
            }
        }
        return p;
    }

    private to(ret:any, v:string, f:Field):any {
        switch (f.type) {
            default: return v;
            case 'datetime':
            case 'date':
            case 'time':
                let date = new Date(Number(v));
                return date;
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'dec': return Number(v);
            case 'bigint':
                let id = Number(v);
                let {_tuid} = f;
                if (_tuid === undefined) return id;
                _tuid.useId(id, true);
                //let val = _tuid.valueFromId(id);
                //return val.obj || val;
                return _tuid.createID(id);
                /*
                if (tuidKey !== undefined) {
                    let tuid = f._tuid;
                    if (tuid === undefined) {
                        // 在JSON.stringify中间不会出现
                        Object.defineProperty(f, '_tuid', {value:'_tuid', writable: true});
                        f._tuid = tuid = this.getTuid(tuidKey, tuidUrl);
                    }
                    tuid.useId(Number(v), true);
                }*/
                //return Number(v);
        }
    }

    private unpackArr(ret:any, arr:ArrFields, data:string, p:number):number {
        let vals:any[] = [], len = data.length;
        let {name, fields} = arr;
        while (p<len) {
            let ch = data.charCodeAt(p);
            if (ch === 10) {
                ++p;
                break;
            }
            let val = {} as any; //new creater();
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    }
}
