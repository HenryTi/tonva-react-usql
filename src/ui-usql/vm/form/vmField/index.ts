import { FieldUI } from '../formUI';
import { FieldInputs, FormValues } from '..';
import { VmField, VmIntField, VmDecField, VmStringField, VmTextField, VmDateTimeField } from './vmField';
import { VmTuidField } from './vmTuidField';
import { Field } from '../../../entities';

export * from './vmField';

export function buildVmField(field: Field, fieldUI: FieldUI, formValues:FormValues, readOnly:boolean): VmField {
    let vmField:new (field:Field, ui:FieldUI, formValues:FormValues, readOnly:boolean) => VmField;
    /*
    switch (fieldUI.type) {
        default: ctrl = new VmUnknownField(field, fieldUI, formValues, readOnly); break;
        case 'string': ctrl = new VmStringField(field, fieldUI, formValues, readOnly); break;
        case 'dec': ctrl = new VmDecField(field, fieldUI, formValues, readOnly); break;
        case 'int': ctrl = new VmIntField(field, fieldUI, formValues, readOnly); break;
    }*/
    switch (field.type) {
        default: return;
        case 'tinyint':
        case 'smallint':
        case 'int':
            vmField = VmIntField;
            break;
        case 'bigint':
            let tuid = field.tuid;
            if (tuid !== undefined) return;// new VmTuidField(field, fieldUI, calls, formValues, readOnly);
            vmField = VmIntField;
            break;
        case 'dec':
            vmField = VmDecField;
            break;
        case 'char':
            vmField = VmStringField;
            break;
        case 'text':
            vmField = VmTextField;
            break;
        case 'datetime':
            vmField = VmDateTimeField;
            break;
    }
    return new vmField(field, fieldUI, formValues, readOnly);
    //return ctrl;
}

