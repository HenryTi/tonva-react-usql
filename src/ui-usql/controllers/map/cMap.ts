import React from 'react';
import _ from 'lodash';
import { CEntity, EntityUI } from "../VM";
import { Map, Tuid, IdBox, Field, TuidMain } from "../../entities";
import { VMapMain } from "./vMain";
import { entitiesRes } from '../../res';
import { observable } from "mobx";
import { PureJSONContent } from '../viewModel';

export interface MapKey {
    content: React.StatelessComponent,
    none?: ()=>string;
}

export interface MapUI extends EntityUI {
    CMap?: typeof CMap;
    keys?: MapKey[],
}

export class MapItem {
    parent: MapItem;
    tuid: Tuid;
    box: IdBox;
    isLeaf: boolean;
    keyIndex:number;
    @observable children: MapItem[] = [];
    values: any;
    constructor(parent:MapItem, tuid:Tuid, box:IdBox, keyIndex:number) {
        this.parent = parent;
        this.tuid = tuid;
        this.box = box;
        this.keyIndex = keyIndex;
        this.isLeaf = false;
    }
}

export class CMap extends CEntity<Map, MapUI> {
    items:MapItem[];
    keyFields: Field[];
    keyUIs: MapKey[];

    get icon() {return entitiesRes['map'].icon}

    protected async internalStart() {
        let {keys} = this.entity;
        let q = this.entity.queries.all;
        let res = await q.query({});
        //let data = await this.entity.unpackReturns(res);
        let ret = res.ret;
        let keysLen = keys.length;
        this.keyUIs = _.clone(this.ui.keys || []);
        this.keyFields = [];
        let retFields = q.returns[0].fields;
        for (let i=0; i<keysLen; i++) {
            this.keyFields.push(retFields[i]);
            if (i >= this.keyUIs.length) {
                this.keyUIs.push({
                    content: PureJSONContent,
                });
            }
        }
        this.items = [];
        let item:MapItem = undefined;
        for (let r of ret) {
            let team = r.$team;
            let newItem = this.addItem(item, r);
            if (newItem !== undefined) {
                this.items.push(newItem);
                item = newItem;
            }
        }

        await this.showVPage(this.VMapMain);
    }

    private createItem(parent:MapItem, tuid:Tuid, box:IdBox, keyIndex:number, values?:any) {
        let item = new MapItem(parent, tuid, box, keyIndex);
        if (keyIndex === this.keyFields.length - 1) {
            item.isLeaf = true;
            item.values = values;
        }
        return item;
    }

    addItem(item:MapItem, row:any):MapItem {
        let ret:MapItem = undefined;
        let keysLen = this.keyFields.length;
        let p = item;
        for (let i=0;i<keysLen;i++) {
            let key = this.keyFields[i];
            let {name} = key;
            let tuid = key._tuid;
            let val:IdBox = row[name];
            if (val === undefined) break;
            let {id} = val;
            if (i === 0) {
                if (id === 0) continue;
                if (p === undefined || p.box.id !== id) {
                    ret = p = this.createItem(undefined, tuid, val, i, row);
                }
                continue;
            }
            let {children, box} = p;
            let len = children.length;
            if (len > 0) {
                let n = children[len-1];
                if (n.box.id === id) {
                    p = n;
                    continue;
                }
            }
            if (id > 0) {
                children.push(p = this.createItem(p, tuid, val, i, row));
            }
        }
        return ret;
    }

    async searchOnKey(keyField:Field, param):Promise<number> {
        let {_tuid} = keyField;
        let cTuidSelect = this.cUsq.cTuidSelect(_tuid as TuidMain);
        let ret = await cTuidSelect.call(param);
        return _tuid.getIdFromObj(ret);
    }

    addClick = async(item:MapItem) => {
        let {keyIndex, children} = item;
        let keysLen = this.keyFields.length;
        let keysLast = keysLen-1;
        let idx = keyIndex + 1;
        if (idx >= keysLen) return;
        let keyField = this.keyFields[idx];
        let kn = keyField.name;
        let tuid = keyField._tuid;
        let searchParam = {} as any;
        let data = {} as any;
        for (let p=item;p!==undefined;p=p.parent) {
            let {keyIndex:ki, box} = p;
            let kn = this.keyFields[ki].name;
            searchParam[kn] = data['_' + kn] = box.id;
        }

        let id = await this.searchOnKey(keyField, searchParam);
        if (id === undefined || id <= 0) return;
        let arr1 = {} as any;
        if (keyIndex+1===keysLast) {
            arr1['_' + kn] = id;
        }
        else {
            data['_' + kn] = id;
            for (let i=idx+1;i<keysLast;i++)
                data['_' + this.keyFields[i].name] = 0;
            arr1['_' + this.keyFields[keysLast].name] = 0;
        }
        data.arr1 = [arr1];
        await this.entity.actions.add.submit(data);
        if (children.find(v => v.box.id === id) === undefined) {
            tuid.useId(id);
            children.push(this.createItem(item, tuid, tuid.createID(id), idx, undefined));
        }
    }

    removeClick = async(item:MapItem) => {
        let keyField = this.keyFields[item.keyIndex];
        let tuid = keyField._tuid;
        let cTuidMain = this.cUsq.cTuidMain(tuid.Main);
        let label = cTuidMain.getLable(tuid);
        let confirmDelete:_.TemplateExecutor;
        if (this.res !== undefined) {
            let cd = this.res.confirmDelete;
            if (cd !== undefined) confirmDelete = cd;
        }
        if (confirmDelete === undefined) confirmDelete = _.template('do you really want to remove ${label}?');        
        if (confirm(confirmDelete({label:label})) === false) return;
        let map:Map = this.entity;
        let data = {} as any;
        let arr1 = data['arr1'] = [];
        let v0 = {} as any;
        arr1.push(v0);
        for (let p=item; p!==undefined;p=p.parent) {
            let ki=p.keyIndex;
            v0['_'+this.keyFields[ki].name] = p.box.id;
        }
        let len = this.keyFields.length;
        for (let i=item.keyIndex+1; i<len; i++) {
            let k = this.keyFields[i];
            v0['_'+k.name] = -1;
        }
        await map.actions.del.submit(data);
        let children = item.parent.children;
        let index = children.findIndex(v => v === item);
        if (index >= 0) children.splice(index, 1);
    }

    protected get VMapMain():typeof VMapMain {return VMapMain}
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }*/
}
