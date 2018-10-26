import { observable } from "mobx";
import { CEntity } from "../VM";
import { VSheetMain } from "./vMain";
import { VSheetNew } from "./vNew";
import { VSheetEdit } from "./vEdit";
import { VSheetAction } from "./vSheetAction";
import { VSheetSchema } from "./vSchema";
import { VArchives } from "./vArchives";
import { VSheetList } from "./vList";
import { VArchived } from "./vArchived";
import { VSheetSaved } from "./vSaved";
export class CSheet extends CEntity {
    constructor() {
        super(...arguments);
        this.statesCount = observable.array([], { deep: true });
        this.onSave = async (values, valuesWithBox) => {
            //let values = this.vForm.getValues();
            //let ret = await this.controller.saveSheet(values, this.vForm.values);
            let ret = await this.saveSheet(values, valuesWithBox);
            this.ceasePage();
            //this.openPage(this.finishedPage);
            await this.showSaved(ret);
        };
        /*
        async getStateSheets(state:string, pageStart:number, pageSize:number):Promise<void> {
            this.curState = state;
            //this.stateSheets.clear();
            this.pageStateItems.items.clear();
            let ret = await this.entity.getStateSheets(state, pageStart, pageSize);
            //this.stateSheets.spliceWithArray(0, 0, ret);
            this.pageStateItems.items.spliceWithArray(0, 0, ret);
        }*/
    }
    async internalStart() {
        this.pageStateItems = this.entity.createPageStateItems();
        await this.showVPage(this.VSheetMain);
    }
    async onMessage(msg) {
        let { type, body, from, to, push } = msg;
        if (type === 'sheet')
            this.onSheet(from, to, body);
    }
    onSheet(from, to, sheetData) {
        /*
        app:69
        date:"2018-10-18T21:59:15.000Z"
        discription:"订单 北京大学 金额99元"
        flow:0
        id:95
        name:"order"
        no:"181018000010"
        processing:0
        sheet:8
        state:"$"
        to:"[10]"
        user:10
        usq:58
        version:5
        */
        let me = this.user.id;
        let { id, preState, state } = sheetData;
        console.log({ $: 'onSheet', from: from, to: to.join(','), id: id, preState: preState, state: state, me: me });
        if (from === me) {
            this.sheetActPreState(id, preState);
        }
        if (to.find(v => v === me) !== undefined) {
            this.sheetActState(id, state, sheetData);
        }
    }
    sheetActPreState(id, preState) {
        this.changeStateCount(preState, -1);
        if (this.curState === undefined || this.curState !== preState)
            return;
        /*
        let index = this.stateSheets.findIndex(v => v.id === id);
        if (index>=0) {
            this.stateSheets.splice(index, 1);
        }*/
        let index = this.pageStateItems.items.findIndex(v => v.id === id);
        if (index >= 0) {
            this.pageStateItems.items.splice(index, 1);
        }
    }
    sheetActState(id, state, msg) {
        this.changeStateCount(state, 1);
        if (this.curState === undefined || this.curState !== state)
            return;
        /*
        if (this.stateSheets.findIndex(v => v.id === id) < 0) {
            this.stateSheets.push(msg);
        }
        */
        if (this.pageStateItems.items.findIndex(v => v.id === id) < 0) {
            this.pageStateItems.items.push(msg);
        }
    }
    changeStateCount(state, delta) {
        if (state === undefined)
            return;
        let index = this.statesCount.findIndex(v => v.state === state);
        console.log({ $: 'changeState', state: state, delta: delta, index: index });
        if (index < 0)
            return;
        let stateCount = this.statesCount[index];
        stateCount.count += delta;
        if (stateCount.count < 0)
            stateCount.count = 0;
    }
    get VSheetMain() { return (this.ui && this.ui.main) || VSheetMain; }
    get VSheetNew() { return this.ui.sheetNew || VSheetNew; }
    get VSheetSaved() { return this.ui.sheetSaved || VSheetSaved; }
    get VSheetEdit() { return this.ui.sheetEdit || VSheetEdit; }
    get VSheetSchema() { return VSheetSchema; }
    get VArchives() { return VArchives; }
    get VArchived() { return VArchived; }
    get VSheetList() { return VSheetList; }
    get VSheetAction() { return this.ui.sheetAction || VSheetAction; }
    async onEvent(type, value) {
        let c;
        switch (type) {
            default: return;
            case 'new':
                c = this.VSheetNew;
                break;
            case 'schema':
                c = this.VSheetSchema;
                break;
            case 'archives':
                c = this.VArchives;
                break;
            case 'state':
                this.curState = value.state;
                c = this.VSheetList;
                break;
            case 'archived':
                await this.showArchived(value);
                return;
            case 'action':
                await this.showAction(value);
                return;
        }
        await this.showVPage(c, value);
    }
    async startSheet(sheetId) {
        await super.beforeStart();
        await this.onEvent('action', sheetId);
    }
    async showAction(sheetId) {
        let sheetData = await this.getSheetData(sheetId);
        await this.showVPage(this.VSheetAction, sheetData);
    }
    async editSheet(sheetData) {
        //alert('修改单据：程序正在设计中');
        let values = await this.vCall(this.VSheetEdit, sheetData);
        return values;
    }
    async showArchived(inBrief) {
        let sheetData = await this.getArchived(inBrief.id);
        await this.showVPage(this.VArchived, sheetData);
    }
    async showSaved(sheetData) {
        await this.showVPage(this.VSheetSaved, sheetData);
    }
    getStateUI(stateName) {
        let { states } = this.res;
        if (states === undefined)
            return;
        return states[stateName];
    }
    getStateLabel(stateName) {
        let state = this.getStateUI(stateName);
        let ret = (state && state.label) || stateName;
        switch (ret) {
            default: return ret;
            case '$': return '新单';
        }
    }
    getActionLabel(stateName, actionName) {
        let state = this.getStateUI(stateName);
        if (state === undefined)
            return actionName;
        let actions = state.actions;
        if (actions === undefined)
            return actionName;
        let action = actions[actionName];
        return (action && action.label) || actionName;
    }
    async getStateSheetCount() {
        this.statesCount.clear();
        let statesCount = await this.entity.stateSheetCount();
        this.statesCount.splice(0, 0, ...statesCount);
    }
    async getSheetData(sheetId) {
        return await this.entity.getSheet(sheetId);
    }
    async getArchived(sheetId) {
        return await this.entity.getArchive(sheetId);
    }
    async saveSheet(values, valuesWithBox) {
        let { sheetTitle } = this.ui;
        let disc = sheetTitle === undefined ? this.label : sheetTitle(valuesWithBox, this.x);
        let ret = await this.entity.save(disc, values);
        //let {id, state} = ret;
        //if (id > 0) this.changeStateCount(state, 1);
        return ret;
    }
    async action(id, flow, state, actionName) {
        return await this.entity.action(id, flow, state, actionName);
    }
}
//# sourceMappingURL=cSheet.js.map