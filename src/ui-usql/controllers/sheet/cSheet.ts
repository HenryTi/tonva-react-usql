import { IObservableArray } from "mobx";
import { TypeVPage, VPage } from 'tonva-tools';
import { Sheet, StateCount } from "../../entities";
import { CEntity, EntityUI, VEntity } from "../VM";
import { VSheetMain } from "./vMain";
import { VSheetNew } from "./vNew";
import { VSheetEdit } from "./vEdit";
import { VSheetAction } from "./vSheetAction";
import { VSheetSchema } from "./vSchema";
import { VArchives } from "./vArchives";
import { VSheetList } from "./vList";
import { VArchived } from "./vArchived";
import { VSheetSaved } from "./vSaved";

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
    main?: TypeVPage<CSheet>;
    sheetNew?: TypeVPage<CSheet>;
    sheetSaved?: TypeVPage<CSheet>;
    sheetEdit?: TypeVPage<CSheet>;
    sheetAction?: TypeVPage<CSheet>;
    listRow?: (row:any) => JSX.Element;
    sheetTitle?: (sheetValues:any, x:any) => string;      // 返回单据的描述
}

export interface SheetData {
    brief: any;
    data: any;
    flows: any[];
}

export class CSheet extends CEntity<Sheet, SheetUI> {
    protected async internalStart() {
        await this.showVPage(this.VSheetMain);
    }

    protected async onMessage(msg: any):Promise<void> {
        //这个必须接上，否则没有websocket push
        this.entity.onMessage(msg);
    }

    protected get VSheetMain():TypeVPage<CSheet> {return (this.ui&&this.ui.main) || VSheetMain}
    protected get VSheetNew(): TypeVPage<CSheet> {return this.ui.sheetNew || VSheetNew}
    protected get VSheetSaved(): TypeVPage<CSheet> {return this.ui.sheetSaved || VSheetSaved}
    protected get VSheetEdit(): TypeVPage<CSheet> {return this.ui.sheetEdit || VSheetEdit}
    protected get VSheetSchema(): TypeVPage<CSheet> {return VSheetSchema}
    protected get VArchives(): TypeVPage<CSheet> {return VArchives}
    protected get VArchived(): TypeVPage<CSheet> {return VArchived}
    protected get VSheetList(): TypeVPage<CSheet> {return VSheetList}
    protected get VSheetAction(): TypeVPage<CSheet> {return this.ui.sheetAction || VSheetAction}
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

    onSave = async (values:any, valuesWithBox:any):Promise<void> => {
        //let values = this.vForm.getValues();
        //let ret = await this.controller.saveSheet(values, this.vForm.values);
        let ret = await this.saveSheet(values, valuesWithBox);
        this.ceasePage();
        //this.openPage(this.finishedPage);
        await this.showSaved(ret);
    }

    async showSaved(sheetData:any) {
        await this.showVPage(this.VSheetSaved, sheetData);
    }

    private getStateUI(stateName:string) {
        let {states} = this.res;
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
        let disc = sheetTitle === undefined? this.label : sheetTitle(valuesWithBox, this.x);
        return await this.entity.save(disc, values);
    }

    async action(id:number, flow:number, state:string, actionName:string):Promise<any> {
        return await this.entity.action(id, flow, state, actionName);
    }

    get statesCount(): IObservableArray<StateCount> {
        return this.entity.statesCount;
    }
}
