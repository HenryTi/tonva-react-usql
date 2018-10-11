var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CEntity } from "../VM";
import { entitiesRes } from '../../res';
import { VSheetMain } from "./vMain";
import { VSheetNew } from "./vNew";
import { VSheetEdit } from "./vEdit";
import { VSheetAction } from "./vSheetAction";
import { VSheetSchema } from "./vSchema";
import { VArchives } from "./vArchives";
import { VSheetList } from "./vList";
import { VArchived } from "./vArchived";
export class CSheet extends CEntity {
    get icon() { return entitiesRes['sheet'].icon; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VSheetMain);
        });
    }
    get VSheetMain() {
        return (this.ui && this.ui.main) || VSheetMain;
    }
    onMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            //这个必须接上，否则没有websocket push
            this.entity.onMessage(msg);
        });
    }
    get VSheetNew() { return this.ui.sheetNew || VSheetNew; }
    get VSheetEdit() { return this.ui.sheetEdit || VSheetEdit; }
    get VSheetSchema() { return VSheetSchema; }
    get VArchives() { return VArchives; }
    get VArchived() { return VArchived; }
    get VSheetList() { return VSheetList; }
    get VSheetAction() { return this.ui.sheetAction || VSheetAction; }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    yield this.showArchived(value);
                    return;
                case 'action':
                    yield this.showAction(value);
                    return;
            }
            yield this.showVPage(c, value);
        });
    }
    startSheet(sheetId) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            _super("beforeStart").call(this);
            this.onEvent('action', sheetId);
        });
    }
    showAction(sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let sheetData = yield this.getSheetData(sheetId);
            yield this.showVPage(this.VSheetAction, sheetData);
        });
    }
    editSheet(sheetData) {
        return __awaiter(this, void 0, void 0, function* () {
            //alert('修改单据：程序正在设计中');
            let values = yield this.vCall(this.VSheetEdit, sheetData);
            return values;
        });
    }
    showArchived(inBrief) {
        return __awaiter(this, void 0, void 0, function* () {
            let sheetData = yield this.getArchived(inBrief.id);
            yield this.showVPage(this.VArchived, sheetData);
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
    saveSheet(values, valuesWithBox) {
        return __awaiter(this, void 0, void 0, function* () {
            let { sheetTitle } = this.ui;
            let disc = sheetTitle === undefined ? this.label : sheetTitle(valuesWithBox);
            return yield this.entity.save(disc, values);
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
//# sourceMappingURL=cSheet.js.map