var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Coordinator, VmPage } from 'tonva-tools';
import { VmForm } from './form';
export class CoordinatorUsq extends Coordinator {
    constructor(crUsq) {
        super();
        this.crUsq = crUsq;
    }
}
export class CrEntity extends CoordinatorUsq {
    constructor(crUsq, entity, ui, res) {
        super(crUsq);
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
        let ret = new VmForm(this.buildFormOptions(), onSubmit);
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
            submitCaption = this.crUsq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.crUsq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.crUsq.res['arrEdit'] || 'Edit';
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
                nullCaption: this.crUsq.getTuidNullCaption(_tuid),
            };
        }
    }
    buildCall(field, arr) {
        let { _tuid } = field;
        return (form, field, values) => __awaiter(this, void 0, void 0, function* () {
            let crTuidSelect = this.crUsq.crTuidSelect(_tuid);
            let ret = yield crTuidSelect.call();
            let id = ret.id;
            _tuid.useId(id);
            return id;
        });
    }
    buildContent(field, arr) {
        //return this.crUsq.getTuidContent(field._tuid);
        //return JSONContent;
        return;
    }
    getRes() {
        return this.res;
    }
    crQuerySelect(queryName) {
        return this.crUsq.crQuerySelect(queryName);
    }
}
export class VmEntity extends VmPage {
    constructor(coordinator) {
        super(coordinator);
        this.entity = coordinator.entity;
        this.ui = coordinator.ui;
        this.res = coordinator.res;
    }
    get label() { return this.coordinator.label; }
    createForm(onSubmit, values) {
        if (this._form_$ !== undefined)
            return this._form_$;
        return this.coordinator.createForm(onSubmit, values);
    }
}
//# sourceMappingURL=VM.js.map