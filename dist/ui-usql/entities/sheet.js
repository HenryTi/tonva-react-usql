var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { observable } from 'mobx';
import { Entity } from './entity';
export class Sheet extends Entity {
    constructor() {
        super(...arguments);
        this.statesCount = observable.array([], { deep: false });
        this.stateSheets = observable.array([], { deep: false });
        this.states = [];
    }
    setStates(states) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s => s.name == state.name), state);
        }
    }
    setStateAccess(s, s1) {
        if (s === undefined)
            return;
        for (let action of s1.actions) {
            let acn = action.name;
            let ac = s.actions.find(a => a.name === acn);
            if (ac === undefined)
                continue;
            s.actions.push(action);
        }
    }
    onReceive(data) {
        let row = data.data;
        if (row === undefined)
            return;
        let { id, state, preState } = row;
        this.changeStateCount(state, 1);
        this.changeStateCount(preState, -1);
        if (this.curState === state) {
            this.stateSheets.push(row);
        }
        else if (this.curState === preState) {
            let index = this.stateSheets.findIndex(v => v.id === id);
            if (index >= 0)
                this.stateSheets.splice(index, 1);
        }
    }
    changeStateCount(state, delta) {
        let index = this.statesCount.findIndex(v => v.state === state);
        if (index < 0)
            return;
        let stateCount = this.statesCount[index];
        stateCount.count += delta;
        this.statesCount.splice(index, 1, stateCount);
    }
    save(discription, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entities.wsConnect();
            let text = this.entities.pack(this.schema, data);
            let ret = yield this.tvApi.sheetSave(this.name, { discription: discription, data: text });
            let { id, state } = ret;
            if (id > 0)
                this.changeStateCount(state, 1);
            return id;
        });
    }
    action(id, flow, state, action) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entities.wsConnect();
            return yield this.tvApi.sheetAction(this.name, { id: id, flow: flow, state: state, action: action });
        });
    }
    getStateSheets(state, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.curState = state;
            this.stateSheets.clear();
            let ret = yield this.tvApi.stateSheets(this.name, { state: state, pageStart: pageStart, pageSize: pageSize });
            this.stateSheets.spliceWithArray(0, 0, ret);
        });
    }
    getStateSheetCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.statesCount.clear();
            let ret = yield this.tvApi.stateSheetCount(this.name);
            this.statesCount.spliceWithArray(0, 0, this.schema.states.map(s => {
                let n = s.name, count = 0;
                let r = ret.find(v => v.state === n);
                if (r !== undefined)
                    count = r.count;
                return { state: n, count: count };
            }));
        });
    }
    unpack(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema === undefined)
                yield this.loadSchema();
            let ret = data[0];
            let brief = ret[0];
            let sheetData = this.entities.unpackSheet(this.schema, brief.data);
            let flows = data[1];
            return {
                brief: brief,
                data: sheetData,
                flows: flows,
            };
        });
    }
    getSheet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tvApi.getSheet(this.name, id);
            if (ret[0].length === 0)
                return yield this.getArchive(id);
            return yield this.unpack(ret);
        });
    }
    getArchive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tvApi.sheetArchive(this.name, id);
            return yield this.unpack(ret);
        });
    }
    getArchives(pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tvApi.sheetArchives(this.name, { pageStart: pageStart, pageSize: pageSize });
            return ret;
        });
    }
}
//# sourceMappingURL=sheet.js.map