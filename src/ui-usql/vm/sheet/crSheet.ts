import { Sheet } from "../../entities";
import { CrEntity, EntityUI, VM } from "../VM";
import { entitiesRes } from '../../res';
import { VmSheetMain } from "./vmMain";
import { VmSheetNew } from "./vmNew";
import { VmSheetEdit } from "./vmEdit";
import { VmSheetAction } from "./vmSheetAction";
import { VmSheetSchema } from "./vmSchema";
import { VmArchives } from "./vmArchives";
import { VmSheetList } from "./vmList";
import { VmArchived } from "./vmArchived";

export interface SheetActionUI {
    label: string;
}

export interface StateUI {
    label: string;
    actions: {[name:string]: SheetActionUI}
}

export interface SheetUI extends EntityUI {
    states: {[name:string]: StateUI};
    main: typeof VmSheetMain;
    new: typeof VmSheetNew;
    edit: typeof VmSheetEdit;
    action: typeof VmSheetAction;
}

export class CrSheet extends CrEntity<Sheet, SheetUI> {
    get icon() {return entitiesRes['sheet'].icon}

    protected async internalStart() {
        await this.showVm(this.VmSheetMain);
    }

    protected get VmSheetMain():typeof VmSheetMain {
        return (this.ui&&this.ui.main) || VmSheetMain;
    }

    protected async onReceive(msg: any) {
        //这个必须接上，否则没有websocket push
        //await super.onReceive(msg);
        this.entity.onReceive(msg);
    }

    protected get VmSheetNew(): typeof VmSheetNew {return VmSheetNew}
    protected get VmSheetEdit(): typeof VmSheetEdit {return VmSheetEdit}
    protected get VmSheetSchema(): typeof VmSheetSchema {return VmSheetSchema}
    protected get VmArchives(): typeof VmArchives {return VmArchives}
    protected get VmArchived(): typeof VmArchived {return VmArchived}
    protected get VmSheetList(): typeof VmSheetList {return VmSheetList}
    protected get VmSheetAction(): typeof VmSheetAction {return VmSheetAction}
    protected async onEvent(type:string, value:any) {
        let vm: VM;
        switch (type) {
            default: return;
            case 'new': vm = this.VmSheetNew; break;
            case 'schema': vm = this.VmSheetSchema; break;
            case 'archives': vm = this.VmArchives; break;
            case 'state': vm = this.VmSheetList; break;
            case 'action': vm = this.VmSheetAction; break;
            case 'archived': vm = this.VmArchived; break;
        }
        await this.showVm(vm, value);
    }

    async showSheet(sheetId:number) {
        this.onEvent('action', sheetId);
        //await this.run(new this.VmSheetAction(this));
        //let vmAction = (this.ui && this.ui.action) || VmSheetAction;
        //await this.navVm(vmAction, sheetId);
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

    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }*/
}
