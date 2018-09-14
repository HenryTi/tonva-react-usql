var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { nav, Page } from 'tonva-tools';
import { VmForm } from './form';
export class Coordinator {
    constructor() {
        this.disposer = () => {
            // message listener的清理
            nav.unregisterReceiveHandler(this.receiveHandlerId);
        };
        this.onMessageReceive = (message) => __awaiter(this, void 0, void 0, function* () {
            yield this.onMessage(message);
        });
    }
    showVm(vm, param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (new vm(this)).showEntry(param);
        });
    }
    renderVm(vm, param) {
        return (new vm(this)).render(param);
    }
    event(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onEvent(type, value);
        });
    }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    msg(text) {
        alert(text);
    }
    errorPage(header, err) {
        this.openPage(React.createElement(Page, { header: "App error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    }
    onMessage(message) {
        return;
    }
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
        });
    }
    start(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.beforeStart();
            yield this.internalStart(param);
        });
    }
    call(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._resolve_$ = resolve;
                yield this.start(param);
            }));
        });
    }
    return(value) {
        if (this._resolve_$ === undefined) {
            alert('the Coordinator call already returned, or not called');
            return;
        }
        this._resolve_$(value);
        this._resolve_$ = undefined;
    }
    openPage(page) {
        nav.push(page, this.disposer);
        this.disposer = undefined;
    }
    replacePage(page) {
        nav.replace(page, this.disposer);
        this.disposer = undefined;
    }
    backPage() {
        nav.back();
    }
    closePage(level) {
        nav.pop(level);
    }
    regConfirmClose(confirmClose) {
        nav.regConfirmClose(confirmClose);
    }
}
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
export class VmView {
    constructor(coordinator) {
        this.coordinator = coordinator;
    }
    event(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            if (this._resolve_$_ !== undefined) {
                await this._resolve_$_({type:type, value:value});
                return;
            }*/
            yield this.coordinator.event(type, value);
        });
    }
    return(value) {
        this.coordinator.return(value);
    }
    openPage(view, param) {
        this.coordinator.openPage(React.createElement(view, param));
    }
    replacePage(view, param) {
        this.coordinator.replacePage(React.createElement(view, param));
    }
    openPageElement(page) {
        this.coordinator.openPage(page);
    }
    replacePageElement(page) {
        this.coordinator.replacePage(page);
    }
    backPage() {
        this.coordinator.backPage();
    }
    closePage(level) {
        this.coordinator.closePage(level);
    }
    regConfirmClose(confirmClose) {
        this.coordinator.regConfirmClose(confirmClose);
    }
}
export class VmPage extends VmView {
    constructor(coordinator) {
        super(coordinator);
    }
    render(param) { return null; }
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