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
        this.onSave = async (values, valuesWithBox) => {
            //let values = this.vForm.getValues();
            //let ret = await this.controller.saveSheet(values, this.vForm.values);
            let ret = await this.saveSheet(values, valuesWithBox);
            this.ceasePage();
            //this.openPage(this.finishedPage);
            await this.showSaved(ret);
        };
    }
    async internalStart() {
        await this.showVPage(this.VSheetMain);
    }
    async onMessage(msg) {
        //这个必须接上，否则没有websocket push
        this.entity.onMessage(msg);
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
        await this.entity.getStateSheetCount();
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
        return await this.entity.save(disc, values);
    }
    async action(id, flow, state, actionName) {
        return await this.entity.action(id, flow, state, actionName);
    }
    get statesCount() {
        return this.entity.statesCount;
    }
}
//# sourceMappingURL=cSheet.js.map