import {observable, IObservableArray} from 'mobx';
import {Entity} from './entity';

export interface SheetState {
    name: string;
    actions: SheetAction[];
}

export interface SheetAction {
    name: string;
}

export class Sheet extends Entity {
    statesCount:IObservableArray = observable.array<{state:string;count:number}>([], {deep:false});
    curState:string;
    stateSheets:IObservableArray = observable.array<{id:number}>([], {deep:false});

    states: SheetState[] = [];

    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }
    private setStateAccess(s:SheetState, s1:SheetState) {
        if (s === undefined) return;
        for (let action of s1.actions) {
            let acn = action.name;
            let ac = s.actions.find(a=>a.name === acn);
            if (ac === undefined) continue;
            s.actions.push(action);
        }
    }
    async onReceive(data):Promise<void> {
        let row = data.data;
        if (row === undefined) return;
        let {id, state, preState} = row;
        this.changeStateCount(state, 1);
        this.changeStateCount(preState, -1);
        if (this.curState === state) {
            this.stateSheets.push(row);
        }
        else if (this.curState === preState) {
            let index = this.stateSheets.findIndex(v => v.id === id);
            if (index>=0) this.stateSheets.splice(index, 1);
        }
    }
    private changeStateCount(state:string, delta:number) {
        let index = this.statesCount.findIndex(v => v.state === state);
        if (index < 0) return;
        let stateCount = this.statesCount[index];
        stateCount.count += delta;
        this.statesCount.splice(index, 1, stateCount);
    }
    async save(discription:string, data:any):Promise<number> {
        //await this.entities.wsConnect();
        let text = this.entities.pack(this.schema, data);
        let ret = await this.tvApi.sheetSave(this.name, {discription: discription, data:text});
        let {id, state} = ret;
        if (id > 0) this.changeStateCount(state, 1);
        return id;
    }
    async action(id:number, flow:number, state:string, action:string) {
        //await this.entities.wsConnect();
        return await this.tvApi.sheetAction(this.name, {id:id, flow:flow, state:state, action:action});
    }
    async getStateSheets(state:string, pageStart:number, pageSize:number):Promise<void> {
        this.curState = state;
        this.stateSheets.clear();
        let ret = await this.tvApi.stateSheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
        this.stateSheets.spliceWithArray(0, 0, ret);
    }
    async getStateSheetCount():Promise<void> {
        this.statesCount.clear();
        let ret:{state:string, count:number}[] = await this.tvApi.stateSheetCount(this.name);
        this.statesCount.spliceWithArray(0, 0, this.schema.states.map(s => {
            let n = s.name, count = 0;
            let r = ret.find(v => v.state === n);
            if (r !== undefined) count = r.count;
            return {state: n, count: count} 
        }));
    }
    private async unpack(data:any):Promise<any> {
        if (this.schema === undefined) await this.loadSchema();
        let ret = data[0];
        let brief = ret[0];
        let sheetData = this.entities.unpackSheet(this.schema, brief.data);
        let flows = data[1];
        return {
            brief: brief,
            data: sheetData,
            flows: flows,
        }
    }
    async getSheet(id:number):Promise<any> {
        let ret = await this.tvApi.getSheet(this.name, id);
        if (ret[0].length === 0) return await this.getArchive(id);
        return await this.unpack(ret);
    }
    async getArchive(id:number):Promise<any> {
        let ret = await this.tvApi.sheetArchive(this.name, id)
        return await this.unpack(ret);
    }

    async getArchives(pageStart:number, pageSize:number) {
        let ret = await this.tvApi.sheetArchives(this.name, {pageStart:pageStart, pageSize:pageSize});
        return ret;
    }
}
