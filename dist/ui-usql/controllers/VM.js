import { Controller, VPage } from 'tonva-tools';
import { VForm, FormMode } from './form';
import { entityIcons } from './icons';
export class ControllerUsq extends Controller {
    constructor(cUsq, res) {
        super(res);
        this.cUsq = cUsq;
    }
}
export class CEntity extends ControllerUsq {
    constructor(cUsq, entity, ui, res) {
        super(cUsq, res);
        Object.setPrototypeOf(this.x, cUsq.x);
        let { name, typeName } = entity;
        this.entity = entity;
        //let entityUI = cUsq.getUI<T, UI>(entity);
        //let {ui, res} = entityUI;
        this.ui = ui; // || entityUI.ui;
        this.label = this.res.label || name;
        this.icon = entityIcons[typeName];
    }
    async beforeStart() {
        await super.beforeStart();
        await this.entity.loadSchema();
    }
    createForm(onSubmit, values, mode) {
        let options = this.buildFormOptions(mode);
        let ret = new VForm(options, onSubmit);
        ret.setValues(values);
        return ret;
    }
    buildFormOptions(mode) {
        let { fields, arrFields } = this.entity;
        let none, submitCaption, arrNewCaption, arrEditCaption, arrTitleNewButton;
        if (this.res !== undefined) {
            none = this.res['none'];
            submitCaption = this.res['submit'];
            arrNewCaption = this.res['arrNew'];
            arrEditCaption = this.res['arrEdit'];
            arrTitleNewButton = this.res['arrTitleNewButton'];
        }
        if (none === undefined) {
            none = this.cUsq.res['none'] || 'none';
        }
        if (submitCaption === undefined)
            submitCaption = this.cUsq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.cUsq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.cUsq.res['arrEdit'] || 'Edit';
        if (arrTitleNewButton === undefined)
            arrTitleNewButton = this.cUsq.res['arrTitleNewButton'];
        if (mode === undefined)
            mode = FormMode.new;
        let ret = {
            fields: fields,
            arrs: arrFields,
            ui: this.ui && this.ui.form,
            res: this.res || {},
            inputs: this.buildInputs(),
            none: none,
            submitCaption: submitCaption,
            arrNewCaption: arrNewCaption,
            arrEditCaption: arrEditCaption,
            arrTitleNewButton: arrTitleNewButton,
            mode: mode,
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
            let { name, _tuid } = field;
            if (_tuid === undefined)
                continue;
            ret[name] = {
                select: this.buildSelect(field, arr),
                content: this.buildContent(field, arr),
                placeHolder: this.cUsq.getTuidPlaceHolder(_tuid),
            };
        }
    }
    buildSelect(field, arr) {
        return async (form, field, values) => {
            let { _tuid, _ownerField } = field;
            let cTuidSelect = this.cUsq.cTuidSelect(_tuid);
            let ownerValue = undefined;
            if (_ownerField !== undefined)
                ownerValue = form.getValue(_ownerField.name);
            let ret = await cTuidSelect.call(ownerValue);
            if (ret === undefined)
                return undefined;
            let id = cTuidSelect.idFromItem(ret);
            _tuid.useId(id);
            return id;
        };
    }
    buildContent(field, arr) {
        return;
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
    }
    get label() { return this.controller.label; }
    //private _form_$: VForm;
    createForm(onSubmit, values, mode) {
        //if (this._form_$ !== undefined) return this._form_$;
        return this.controller.createForm(onSubmit, values, mode);
    }
}
//# sourceMappingURL=VM.js.map