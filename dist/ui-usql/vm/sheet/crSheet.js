var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CrEntity } from "../VM";
import { entitiesRes } from '../../res';
import { VmSheetMain } from "./vmMain";
import { VmSheetNew } from "./vmNew";
import { VmSheetEdit } from "./vmEdit";
import { VmSheetAction } from "./vmSheetAction";
import { VmSheetSchema } from "./vmSchema";
import { VmArchives } from "./vmArchives";
import { VmSheetList } from "./vmList";
import { VmArchived } from "./vmArchived";
export class CrSheet extends CrEntity {
    get icon() { return entitiesRes['sheet'].icon; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmSheetMain);
        });
    }
    get VmSheetMain() {
        return (this.ui && this.ui.main) || VmSheetMain;
    }
    onMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            //这个必须接上，否则没有websocket push
            this.entity.onMessage(msg);
        });
    }
    get VmSheetNew() { return VmSheetNew; }
    get VmSheetEdit() { return VmSheetEdit; }
    get VmSheetSchema() { return VmSheetSchema; }
    get VmArchives() { return VmArchives; }
    get VmArchived() { return VmArchived; }
    get VmSheetList() { return VmSheetList; }
    get VmSheetAction() { return VmSheetAction; }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let vm;
            switch (type) {
                default: return;
                case 'new':
                    vm = this.VmSheetNew;
                    break;
                case 'schema':
                    vm = this.VmSheetSchema;
                    break;
                case 'archives':
                    vm = this.VmArchives;
                    break;
                case 'state':
                    vm = this.VmSheetList;
                    break;
                case 'action':
                    vm = this.VmSheetAction;
                    break;
                case 'archived':
                    vm = this.VmArchived;
                    break;
            }
            yield this.showVm(vm, value);
        });
    }
    startSheet(sheetId) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            _super("beforeStart").call(this);
            this.onEvent('action', sheetId);
            //await this.run(new this.VmSheetAction(this));
            //let vmAction = (this.ui && this.ui.action) || VmSheetAction;
            //await this.navVm(vmAction, sheetId);
        });
    }
    getStateUI(stateName) {
        let res = this.getRes();
        if (res === undefined)
            return;
        let { states } = res;
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
    getStateSheetCount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.getStateSheetCount();
        });
    }
    getSheetData(sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity.getSheet(sheetId);
        });
    }
    getArchived(sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity.getArchive(sheetId);
        });
    }
    saveSheet(values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity.save(this.label, values);
        });
    }
    action(id, flow, state, actionName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity.action(id, flow, state, actionName);
        });
    }
    get statesCount() {
        return this.entity.statesCount;
    }
}
//# sourceMappingURL=crSheet.js.map