var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from 'lodash';
import { CEntity } from "../VM";
import { VMapMain } from "./vMain";
import { entitiesRes } from '../../res';
import { observable } from "mobx";
import { PureJSONContent } from '../viewModel';
export class MapItem {
    constructor(parent, tuid, box, keyIndex) {
        this.children = [];
        this.parent = parent;
        this.tuid = tuid;
        this.box = box;
        this.keyIndex = keyIndex;
        this.isLeaf = false;
    }
}
__decorate([
    observable
], MapItem.prototype, "children", void 0);
export class CMap extends CEntity {
    constructor() {
        super(...arguments);
        this.addClick = (item) => __awaiter(this, void 0, void 0, function* () {
            let { keyIndex, children } = item;
            let keysLen = this.keyFields.length;
            let keysLast = keysLen - 1;
            let idx = keyIndex + 1;
            if (idx >= keysLen)
                return;
            let keyField = this.keyFields[idx];
            let kn = keyField.name;
            let tuid = keyField._tuid;
            let searchParam = {};
            let data = {};
            for (let p = item; p !== undefined; p = p.parent) {
                let { keyIndex: ki, box } = p;
                let kn = this.keyFields[ki].name;
                searchParam[kn] = data['_' + kn] = box.id;
            }
            let id = yield this.searchOnKey(keyField, searchParam);
            if (id === undefined || id <= 0)
                return;
            let arr1 = {};
            if (keyIndex + 1 === keysLast) {
                arr1['_' + kn] = id;
            }
            else {
                data['_' + kn] = id;
                for (let i = idx + 1; i < keysLast; i++)
                    data['_' + this.keyFields[i].name] = 0;
                arr1['_' + this.keyFields[keysLast].name] = 0;
            }
            data.arr1 = [arr1];
            yield this.entity.actions.add.submit(data);
            if (children.find(v => v.box.id === id) === undefined) {
                tuid.useId(id);
                children.push(this.createItem(item, tuid, tuid.createID(id), idx, undefined));
            }
        });
        this.removeClick = (item) => __awaiter(this, void 0, void 0, function* () {
            let keyField = this.keyFields[item.keyIndex];
            let tuid = keyField._tuid;
            let crTuidMain = this.crUsq.crTuidMain(tuid.Main);
            let label = crTuidMain.getLable(tuid);
            let confirmDelete;
            if (this.res !== undefined) {
                let cd = this.res.confirmDelete;
                if (cd !== undefined)
                    confirmDelete = cd;
            }
            if (confirmDelete === undefined)
                confirmDelete = _.template('do you really want to remove ${label}?');
            if (confirm(confirmDelete({ label: label })) === false)
                return;
            let map = this.entity;
            let data = {};
            let arr1 = data['arr1'] = [];
            let v0 = {};
            arr1.push(v0);
            for (let p = item; p !== undefined; p = p.parent) {
                let ki = p.keyIndex;
                v0['_' + this.keyFields[ki].name] = p.box.id;
            }
            let len = this.keyFields.length;
            for (let i = item.keyIndex + 1; i < len; i++) {
                let k = this.keyFields[i];
                v0['_' + k.name] = -1;
            }
            yield map.actions.del.submit(data);
            let children = item.parent.children;
            let index = children.findIndex(v => v === item);
            if (index >= 0)
                children.splice(index, 1);
        });
        /*
        async submit(values:any) {
            return this.entity.submit(values);
        }*/
    }
    get icon() { return entitiesRes['map'].icon; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            let { keys } = this.entity;
            let q = this.entity.queries.all;
            let res = yield q.query({});
            //let data = await this.entity.unpackReturns(res);
            let ret = res.ret;
            let keysLen = keys.length;
            this.keyUIs = _.clone(this.ui.keys || []);
            this.keyFields = [];
            let retFields = q.returns[0].fields;
            for (let i = 0; i < keysLen; i++) {
                this.keyFields.push(retFields[i]);
                if (i >= this.keyUIs.length) {
                    this.keyUIs.push({
                        content: PureJSONContent,
                    });
                }
            }
            this.items = [];
            let item = undefined;
            for (let r of ret) {
                let team = r.$team;
                let newItem = this.addItem(item, r);
                if (newItem !== undefined) {
                    this.items.push(newItem);
                    item = newItem;
                }
            }
            yield this.showVPage(this.VmMapMain);
        });
    }
    createItem(parent, tuid, box, keyIndex, values) {
        let item = new MapItem(parent, tuid, box, keyIndex);
        if (keyIndex === this.keyFields.length - 1) {
            item.isLeaf = true;
            item.values = values;
        }
        return item;
    }
    addItem(item, row) {
        let ret = undefined;
        let keysLen = this.keyFields.length;
        let p = item;
        for (let i = 0; i < keysLen; i++) {
            let key = this.keyFields[i];
            let { name } = key;
            let tuid = key._tuid;
            let val = row[name];
            if (val === undefined)
                break;
            let { id } = val;
            if (i === 0) {
                if (id === 0)
                    continue;
                if (p === undefined || p.box.id !== id) {
                    ret = p = this.createItem(undefined, tuid, val, i, row);
                }
                continue;
            }
            let { children, box } = p;
            let len = children.length;
            if (len > 0) {
                let n = children[len - 1];
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
    searchOnKey(keyField, param) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _tuid } = keyField;
            let crTuidSelect = this.crUsq.crTuidSelect(_tuid);
            let ret = yield crTuidSelect.call(param);
            return _tuid.getIdFromObj(ret);
        });
    }
    get VmMapMain() { return VMapMain; }
}
//# sourceMappingURL=cMap.js.map