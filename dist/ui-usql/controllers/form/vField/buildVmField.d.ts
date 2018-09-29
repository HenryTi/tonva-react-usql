import { FieldUI, Compute } from '../../formUI';
import { FormValues } from '..';
import { VField } from './vField';
import { Field } from '../../../entities';
import { FieldRes } from '../vBand';
export declare function buildVField(field: Field, fieldUI: FieldUI, fieldRes: FieldRes, formValues: FormValues, formCompute: Compute, readOnly: boolean): VField;
