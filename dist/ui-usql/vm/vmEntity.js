var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observable } from 'mobx';
import { FA } from 'tonva-react-form';
import { VmForm } from './vmForm';
import { VmPage } from './vmPage';
export class VmEntity extends VmPage {
    constructor(vmApi, entity, ui) {
        super();
        this.nav = (vmType, param) => __awaiter(this, void 0, void 0, function* () {
            yield this.vmApi.nav(vmType, this.entity, this.ui, param);
        });
        this.renderForm = (className) => React.createElement("div", null, "old VMForm");
        this.vmApi = vmApi;
        this.entity = entity;
        this.ui = ui;
        this.label = this.getLabel();
        this.init();
    }
    init() { }
    getRes() {
        return this.ui && this.ui.res;
    }
    getLabel() {
        let res = this.getRes();
        return (res && res.label) || this.entity.name;
    }
    createVmFieldsForm() {
        let ret = this.newVmFieldsForm();
        ret.init(this.fieldsFormOptions);
        return ret;
    }
    newVmFieldsForm() {
        return new VmForm();
    }
    get fieldsFormOptions() {
        let { schema } = this.entity;
        let { fields, arrs } = schema;
        return {
            fields: fields,
            arrs: arrs,
            vmApi: this.vmApi,
            ui: this.ui && this.ui.res,
        };
    }
    start(param) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSchema();
            yield _super("start").call(this, param);
        });
    }
    get icon() { return vmLinkIcon('text-info', 'circle-thin'); }
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
            this.buildValuesFromSchema();
        });
    }
    buildValuesFromSchema() { }
    buildObservableValues(fields) {
        let len = fields.length;
        let v = {};
        for (let i = 0; i < len; i++) {
            v[fields[i].name] = null;
        }
        return observable(v);
    }
    resetValues() {
        for (let i in this.values) {
            this.values[i] = null;
        }
    }
    typeVmTuidControl(field, tuid) {
        return this.vmApi.typeVmTuidControl(tuid);
    }
    typeTuidContent(field, tuid) {
        return this.vmApi.typeTuidContent(tuid);
    }
    pickerConfig(field, tuid) {
        return this.vmApi.pickerConfig(tuid);
    }
}
export function vmLinkIcon(cls, faName) {
    return React.createElement(FA, { className: cls, size: "lg", name: faName, fixWidth: true });
}
//# sourceMappingURL=vmEntity.js.map