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
import { nav } from 'tonva-tools';
import { ViewModel } from '../viewModel';
export class VmEntity extends ViewModel {
    constructor(vmApi, entity, ui) {
        super();
        this.nav = (vmType) => __awaiter(this, void 0, void 0, function* () {
            let vm = new vmType(this.vmApi, this.entity);
            yield vm.load();
            nav.push(vm.renderView());
        });
        /*
            protected newFormRowBuilder(): FormRowBuilder {
                return new VmEntityFormRowBuilder(this.vmApi, this);
            }
        
            get VmForm(): TypeVmFieldsForm {
                return this.vmApi.VmForm;
            }
        
            async submit() {}
        
            onSubmitClick = async () => {
                await this.submit();
            }
        
            newSubmitButton():JSX.Element {
                return <SubmitButton onSubmitClick={this.onSubmitClick} />;
            }
        */
        /*
        newVmForm(fields:Field[], fieldUIs:any[], className:string):VmForm {
            return new this.VmForm(this.values, fields, this.newSubmitButton(), fieldUIs, className, this.newFormRowBuilder());
        }
        renderForm = (className) => {
            let fieldUIs:any[] = undefined;
            this.vmForm = this.newVmForm(
                this.entity.schema.fields, fieldUIs, className);
            return this.vmForm.renderView();
        }
        */
        this.renderForm = (className) => React.createElement("div", null, "old VMForm");
        this.vmApi = vmApi;
        this.entity = entity;
        this.ui = ui;
        this.init();
    }
    init() { }
    get icon() { return vmLinkIcon('text-info', 'circle-thin'); }
    get caption() { return this.entity.name; }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
            this.initValues();
        });
    }
    initValues() { }
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
    /*
        protected fieldFaces: FieldUIs;
        protected mapFields(schemaFields: any[]): any[] {
            if (schemaFields === undefined) return;
            let nfc = this.fieldFaces;
            return schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined && nfc[sf.name]));
        }
    
        protected tfmMap(sf: any, ff: FieldUI) {
            let ret: any;
            let { type, tuid, url } = sf;
            //let tuidInput: TuidInput = {};
            //let tfm = this.typeFieldMappers;
            let face;
            if (ff === undefined) {
                let fm = undefined; //tfm[type];
                if (fm === undefined) {
                    console.log('type field mapper not defined');
                    return;
                }
                ret = fm(sf);
                face = ret.face;
                if (face === undefined) ret.face = face = {};
            }
            else {
                let fm = undefined; //ff.mapper || tfm[type];
                if (fm === undefined) {
                    console.log('type field mapper not defined');
                    return;
                }
                ret = fm(sf);
                let { label, notes, placeholder, input } = ff;
                if (label !== undefined) ret.label = label;
                face = ret.face;
                if (face !== undefined) {
                    if (notes !== undefined) face.notes = notes;
                    if (placeholder !== undefined) face.placeholder = placeholder;
                    //if (input !== undefined) _.merge(tuidInput, input);
                }
            }
            if (tuid !== undefined) {
                return;
            }
            if (sf.null === false) {
                ret.field.required = true;
            }
            return ret;
        }
    */
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
const SubmitButton = ({ onSubmitClick }) => React.createElement("button", { className: "btn btn-primary", type: "button", onClick: onSubmitClick }, "\u63D0\u4EA4");
//# sourceMappingURL=vmEnity.js.map