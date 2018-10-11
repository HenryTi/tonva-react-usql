import { VField, VIntField, VDecField, VStringField, VTextField, VDateTimeField } from './vField';
import { Field } from '../../../entities';
import { FieldRes } from '../vBand';
import { VForm } from '../vForm';
import { FieldEdit } from '../../formUI';

export function buildVField(form:VForm, field: Field, fieldUI: FieldEdit, fieldRes:FieldRes): VField {
    let vField:new (form:VForm, field:Field, ui:FieldEdit, fieldRes:FieldRes) => VField;
    switch (field.type) {
        default: return;
        case 'tinyint':
        case 'smallint':
        case 'int':
            vField = VIntField;
            break;
        case 'bigint':
            let {_tuid} = field;
            if (_tuid !== undefined) return;
            vField = VIntField;
            break;
        case 'dec':
            vField = VDecField;
            break;
        case 'char':
            vField = VStringField;
            break;
        case 'text':
            vField = VTextField;
            break;
        case 'datetime':
            vField = VDateTimeField;
            break;
    }
    return new vField(form, field, fieldUI, fieldRes);
}

