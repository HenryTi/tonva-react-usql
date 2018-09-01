import React from 'react';
import _ from 'lodash';
import { CrEntity, EntityUI } from "../VM";
import { Map, Tuid, IdBox, Field, TuidMain } from "../../entities";
import { VmMapMain } from "./vmMain";
import { entitiesRes } from '../../res';
import { observable } from "mobx";
import { PureJSONContent } from '../viewModel';

export interface MapKey {
    content: React.StatelessComponent,
    none?: ()=>string;
}

export interface MapUI extends EntityUI {
    CrMap?: typeof CrMap;
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

export class CrMap extends CrEntity<Map, MapUI> {
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

        await this.showVm(this.VmMapMain);
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
        let crTuidSelect = this.crUsq.crTuidSelect(_tuid as TuidMain);
        let ret = await crTuidSelect.call(param);
        return _tuid.getIdFromObj(ret);
    }

    addClick = async(item:MapItem) => {
        let {keyIndex, children} = item;
        let keysLen = this.keyFields.length;
        let keysLast = keysLen-1;
        let idx = keyIndex + 1;
        if (idx >= keysLen) return;
        let keyField = this.keyFields[idx];
        let tuid = keyField._tuid;
        let data = {} as any;
        for (let p=item;p!==undefined;p=p.parent) {
            let {keyIndex:ki, box} = p;
            data[this.keyFields[ki].name] = box.id;
        }
        //let searchId = await this.getSearchId(key);
        //let id = await searchId(data);
        //let id = await searchId(data);
        let id = await this.searchOnKey(keyField, data);
        if (id > 0) {
            let arr1 = {} as any;
            if (keyIndex+1===keysLast) {
                arr1[keyField.name] = id;
            }
            else {
                data[keyField.name] = id;
                for (let i=idx+1;i<keysLast;i++)
                    data[this.keyFields[i].name] = 0;
                arr1[this.keyFields[keysLast].name] = 0;
            }
            data.arr1 = [arr1];
            await this.entity.actions.add.submit(data);
            if (children.find(v => v.box.id === id) === undefined) {
                tuid.useId(id);
                children.push(this.createItem(item, tuid, tuid.createID(id), idx, undefined));
            }
        }
    }

    removeClick = async(item:MapItem) => {
        let keyField = this.keyFields[item.keyIndex];
        let tuid = keyField._tuid;
        let crTuidMain = this.crUsq.crTuidMain(tuid.Main);
        let label = crTuidMain.getLable(tuid);
        if (confirm(this.res.confirmDelete({label:label})) === false) return;
        alert(`程序还没有实现删除${label}`);
    }

    protected get VmMapMain():typeof VmMapMain {return VmMapMain}
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }*/
}
