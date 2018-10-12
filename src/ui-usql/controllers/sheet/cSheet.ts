import { IObservableArray } from "mobx";
import { TypeVPage } from 'tonva-tools';
import { Sheet, StateCount } from "../../entities";
import { CEntity, EntityUI } from "../VM";
import { entitiesRes } from '../../res';
import { VSheetMain } from "./vMain";
import { VSheetNew } from "./vNew";
import { VSheetEdit } from "./vEdit";
import { VSheetAction } from "./vSheetAction";
import { VSheetSchema } from "./vSchema";
import { VArchives } from "./vArchives";
import { VSheetList } from "./vList";
import { VArchived } from "./vArchived";

export interface SheetActionUI {
    label: string;
}

export interface StateUI {
    label: string;
    actions: {[name:string]: SheetActionUI}
}

export interface SheetUI extends EntityUI {
    CSheet?: typeof CSheet;
    states?: {[name:string]: StateUI};
    main?: typeof VSheetMain;
    sheetNew?: typeof VSheetNew;
    sheetEdit?: typeof VSheetEdit;
    sheetAction?: typeof VSheetAction;
    listRow?: (row:any) => JSX.Element;
    sheetTitle?: (sheetValues:any) => string;      // 返回单据的描述
}

export interface SheetData {
    brief: any;
    data: any;
    flows: any[];
}

export class CSheet extends CEntity<Sheet, SheetUI> {
    get icon() {return entitiesRes['sheet'].icon}

    protected async internalStart() {
        await this.showVPage(this.VSheetMain);
    }

    protected get VSheetMain():typeof VSheetMain {
        return (this.ui&&this.ui.main) || VSheetMain;
    }

    protected async onMessage(msg: any):Promise<void> {
        //这个必须接上，否则没有websocket push
        this.entity.onMessage(msg);
    }

    protected get VSheetNew(): typeof VSheetNew {return this.ui.sheetNew || VSheetNew}
    protected get VSheetEdit(): typeof VSheetEdit {return this.ui.sheetEdit || VSheetEdit}
    protected get VSheetSchema(): typeof VSheetSchema {return VSheetSchema}
    protected get VArchives(): typeof VArchives {return VArchives}
    protected get VArchived(): typeof VArchived {return VArchived}
    protected get VSheetList(): typeof VSheetList {return VSheetList}
    protected get VSheetAction(): typeof VSheetAction {return this.ui.sheetAction || VSheetAction}
    protected async onEvent(type:string, value:any) {
        let c: TypeVPage<CSheet>;
        switch (type) {
            default: return;
            case 'new': c = this.VSheetNew; break;
            case 'schema': c = this.VSheetSchema; break;
            case 'archives': c = this.VArchives; break;
            case 'state': c = this.VSheetList; break;
            case 'archived': await this.showArchived(value); return;
            case 'action': await this.showAction(value); return;
        }
        await this.showVPage(c, value);
    }

    async startSheet(sheetId:number) {
        await super.beforeStart();
        await this.onEvent('action', sheetId);
    }

    async showAction(sheetId:number) {
        let sheetData:SheetData = await this.getSheetData(sheetId);
        await this.showVPage(this.VSheetAction, sheetData);
    }

    async editSheet(sheetData:SheetData):Promise<any> {
        //alert('修改单据：程序正在设计中');
        let values = await this.vCall(this.VSheetEdit, sheetData);
        return values;
    }

    async showArchived(inBrief:any) {
        let sheetData = await this.getArchived(inBrief.id);
        await this.showVPage(this.VArchived, sheetData);
    }

    private getStateUI(stateName:string) {
        let res = this.getRes();
        if (res === undefined) return;
        let {states} = res;
        if (states === undefined) return;
        return states[stateName];
    }
    getStateLabel(stateName:string) {
        let state = this.getStateUI(stateName);
        let ret = (state && state.label) || stateName;
        switch (ret) {
            default: return ret;
            case '$': return '新单';
        }
    }
    getActionLabel(stateName:string, actionName:string) {
        let state = this.getStateUI(stateName);
        if (state === undefined) return actionName;
        let actions = state.actions;
        if (actions === undefined) return actionName;
        let action = actions[actionName];
        return (action && action.label) || actionName;
    }

    async getStateSheetCount() {
        await this.entity.getStateSheetCount();
    }

    async getSheetData(sheetId:number):Promise<SheetData> {
        return await this.entity.getSheet(sheetId);
    }

    async getArchived(sheetId:number):Promise<SheetData> {
        return await this.entity.getArchive(sheetId);
    }

    async saveSheet(values:any, valuesWithBox:any):Promise<number> {
        let {sheetTitle} = this.ui;
        let disc = sheetTitle === undefined? this.label : sheetTitle(valuesWithBox);
        return await this.entity.save(disc, values);
    }

    async action(id:number, flow:number, state:string, actionName:string):Promise<any> {
        return await this.entity.action(id, flow, state, actionName);
    }

    get statesCount(): IObservableArray<StateCount> {
        return this.entity.statesCount;
    }
}
