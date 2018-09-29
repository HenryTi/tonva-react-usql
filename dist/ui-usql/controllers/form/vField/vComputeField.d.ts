import { FieldUI } from '../../formUI';
import { VField } from './vField';
import { Field } from '../../../entities';
import { FormValues } from '../vForm';
import { FieldRes } from '../vBand';
export declare class VComputeField extends VField {
    constructor(field: Field, fieldUI: FieldUI, fieldRes: FieldRes, formValues: FormValues);
    protected view: () => any;
}
