import { Entity } from './entity';
import { PageItems } from 'tonva-tools';
export class Sheet extends Entity {
    get typeName() { return 'sheet'; }
    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/
    setSchema(schema) {
        super.setSchema(schema);
        this.states = schema.states;
    }
    build(obj) {
        this.states = [];
        for (let op of obj.ops) {
            this.states.push({ name: op, actions: undefined });
        }
        /*
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: this.states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    }
    createSheetState(name, obj) {
        let ret = { name: name, actions: [] };
        let actions = ret.actions;
        for (let p in obj) {
            let action = { name: p };
            actions.push(action);
        }
        return ret;
    }
    /*
    private setStateAccess(s:SheetState, s1:SheetState) {
        if (s === undefined) return;
        for (let action of s1.actions) {
            let acn = action.name;
            let ac = s.actions.find(a=>a.name === acn);
            if (ac === undefined) continue;
            s.actions.push(action);
        }
    }*/
    async save(discription, data) {
        let { appId } = this.entities;
        let text = this.pack(data);
        let ret = await this.tvApi.sheetSave(this.name, { app: appId, discription: discription, data: text });
        return ret;
        /*
        let {id, state} = ret;
        if (id > 0) this.changeStateCount(state, 1);
        return ret;
        */
    }
    async action(id, flow, state, action) {
        return await this.tvApi.sheetAction(this.name, { id: id, flow: flow, state: state, action: action });
    }
    async unpack(data) {
        //if (this.schema === undefined) await this.loadSchema();
        let ret = data[0];
        let brief = ret[0];
        let sheetData = this.unpackSheet(brief.data);
        let flows = data[1];
        return {
            brief: brief,
            data: sheetData,
            flows: flows,
        };
    }
    async getSheet(id) {
        let ret = await this.tvApi.getSheet(this.name, id);
        if (ret[0].length === 0)
            return await this.getArchive(id);
        return await this.unpack(ret);
    }
    async getArchive(id) {
        let ret = await this.tvApi.sheetArchive(this.name, id);
        return await this.unpack(ret);
    }
    async getArchives(pageStart, pageSize) {
        let ret = await this.tvApi.sheetArchives(this.name, { pageStart: pageStart, pageSize: pageSize });
        return ret;
    }
    async getStateSheets(state, pageStart, pageSize) {
        let ret = await this.tvApi.stateSheets(this.name, { state: state, pageStart: pageStart, pageSize: pageSize });
        return ret;
    }
    createPageStateItems() { return new PageStateItems(this); }
    async stateSheetCount() {
        let ret = await this.tvApi.stateSheetCount(this.name);
        return this.states.map(s => {
            let n = s.name, count = 0;
            let r = ret.find(v => v.state === n);
            if (r !== undefined)
                count = r.count;
            return { state: n, count: count };
        });
    }
}
export class PageStateItems extends PageItems {
    constructor(sheet) {
        super(true);
        this.sheet = sheet;
        this.pageSize = 10;
    }
    async load(param, pageStart, pageSize) {
        let ret = await this.sheet.getStateSheets(param, pageStart, pageSize);
        return ret;
    }
    setPageStart(item) {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
//# sourceMappingURL=sheet.js.map