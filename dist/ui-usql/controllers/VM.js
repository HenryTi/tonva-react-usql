var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Controller, VPage } from 'tonva-tools';
import { VForm } from './form';
export class ControllerUsq extends Controller {
    constructor(cUsq) {
        super();
        this.cUsq = cUsq;
    }
}
export class CEntity extends ControllerUsq {
    constructor(cUsq, entity, ui, res) {
        super(cUsq);
        this.entity = entity;
        this.ui = ui;
        this.res = res;
        this.label = (res && res.label) || entity.name;
    }
    beforeStart() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("beforeStart").call(this);
            yield this.entity.loadSchema();
        });
    }
    createForm(onSubmit, values) {
        let ret = new VForm(this.buildFormOptions(), onSubmit);
        ret.setValues(values);
        return ret;
    }
    buildFormOptions() {
        let { fields, arrFields } = this.entity;
        let submitCaption, arrNewCaption, arrEditCaption;
        if (this.res !== undefined) {
            submitCaption = this.res['submit'];
            arrNewCaption = this.res['arrNew'];
            arrEditCaption = this.res['arrEdit'];
        }
        if (submitCaption === undefined)
            submitCaption = this.cUsq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.cUsq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.cUsq.res['arrEdit'] || 'Edit';
        let ret = {
            fields: fields,
            arrs: arrFields,
            ui: this.ui && this.ui.form,
            res: this.res || {},
            inputs: this.buildInputs(),
            submitCaption: submitCaption,
            arrNewCaption: arrNewCaption,
            arrEditCaption: arrEditCaption,
        };
        return ret;
    }
    buildInputs() {
        let { fields, arrFields } = this.entity;
        let ret = {};
        this.buildFieldsInputs(ret, fields, undefined);
        if (arrFields !== undefined) {
            for (let arr of arrFields) {
                let { name, fields } = arr;
                this.buildFieldsInputs(ret, fields, name);
            }
        }
        return ret;
    }
    buildFieldsInputs(ret, fields, arr) {
        if (arr !== undefined) {
            let arrFieldInputs = ret[arr];
            if (arrFieldInputs === undefined) {
                ret[arr] = arrFieldInputs = {};
                ret = arrFieldInputs;
            }
        }
        for (let field of fields) {
            let { name, tuid, _tuid } = field;
            if (tuid === undefined)
                continue;
            //let fn = arr === undefined? name : arr+'.'+name;
            ret[name] = {
                call: this.buildCall(field, arr),
                content: this.buildContent(field, arr),
                nullCaption: this.cUsq.getTuidNullCaption(_tuid),
            };
        }
    }
    buildCall(field, arr) {
        let { _tuid } = field;
        return (form, field, values) => __awaiter(this, void 0, void 0, function* () {
            let cTuidSelect = this.cUsq.cTuidSelect(_tuid);
            let ret = yield cTuidSelect.call();
            let id = ret.id;
            _tuid.useId(id);
            return id;
        });
    }
    buildContent(field, arr) {
        return;
    }
    getRes() {
        return this.res;
    }
    cQuerySelect(queryName) {
        return this.cUsq.cQuerySelect(queryName);
    }
}
export class VEntity extends VPage {
    constructor(controller) {
        super(controller);
        this.entity = controller.entity;
        this.ui = controller.ui;
        this.res = controller.res;
    }
    get label() { return this.controller.label; }
    createForm(onSubmit, values) {
        if (this._form_$ !== undefined)
            return this._form_$;
        return this.controller.createForm(onSubmit, values);
    }
}
//# sourceMappingURL=VM.js.map