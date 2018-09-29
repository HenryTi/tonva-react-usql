import { FieldUI, Compute } from '../../formUI';
import { FieldInputs, FormValues } from '..';
import { VField, VIntField, VDecField, VStringField, VTextField, VDateTimeField } from './vField';
import { VTuidField } from './vTuidField';
import { Field } from '../../../entities';
import { FieldRes } from '../vBand';

export function buildVField(field: Field, fieldUI: FieldUI, fieldRes:FieldRes, formValues:FormValues, formCompute:Compute, readOnly:boolean): VField {
    let vField:new (field:Field, ui:FieldUI, fieldRes:FieldRes, formValues:FormValues, formCompute:Compute, readOnly:boolean) => VField;
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
    return new vField(field, fieldUI, fieldRes, formValues, formCompute, readOnly);
    //return ctrl;
}

