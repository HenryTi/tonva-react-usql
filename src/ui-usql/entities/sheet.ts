import {observable, IObservableArray} from 'mobx';
import {Entity} from './entity';

export interface SheetState {
    name: string;
    actions: SheetAction[];
}

export interface SheetAction {
    name: string;
}

export interface StateCount {
    state: string;
    count: number;
}

export class Sheet extends Entity {
    get typeName(): string { return 'sheet';}
    states: SheetState[];

    statesCount:IObservableArray<StateCount> = observable.array<StateCount>([], {deep:true});
    curState:string;
    stateSheets:IObservableArray = observable.array<{id:number}>([], {deep:true});

    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/
    setSchema(schema:any) {
        super.setSchema(schema);
        this.states = schema.states;
    }
    build(obj:any) {
        this.states = [];
        for (let op of obj.ops) {
            this.states.push({name: op, actions:undefined});
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
    private createSheetState(name:string, obj:object):SheetState {
        let ret:SheetState = {name:name, actions:[]};
        let actions = ret.actions;
        for (let p in obj) {
            let action:SheetAction = {name: p};
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
    async onMessage(msg):Promise<void> {
        let {$type, id, state, preState} = msg;
        if ($type !== 'sheetAct') return;
        this.changeStateCount(state, 1);
        this.changeStateCount(preState, -1);
        if (this.curState === state) {
            if (this.stateSheets.findIndex(v => v.id === id) < 0) {
                this.stateSheets.push(msg);
            }
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
        //this.statesCount.splice(index, 1, stateCount);
    }
    async save(discription:string, data:any):Promise<number> {
        let {appId} = this.entities;
        let text = this.pack(data);

        let ret = await this.tvApi.sheetSave(this.name, {app: appId, discription: discription, data:text});
        let {id, state} = ret;
        if (id > 0) this.changeStateCount(state, 1);
        return id;
    }
    async action(id:number, flow:number, state:string, action:string) {
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
        this.statesCount.spliceWithArray(0, 0, this.states.map(s => {
            let n = s.name, count = 0;
            let r = ret.find(v => v.state === n);
            if (r !== undefined) count = r.count;
            return {state: n, count: count} 
        }));
    }
    private async unpack(data:any):Promise<any> {
        //if (this.schema === undefined) await this.loadSchema();
        let ret = data[0];
        let brief = ret[0];
        let sheetData = this.unpackSheet(brief.data);
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
