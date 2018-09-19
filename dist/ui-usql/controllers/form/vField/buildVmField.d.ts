import { FieldUI, Compute } from '../../formUI';
import { FormValues } from '..';
import { VField } from './vField';
import { Field } from '../../../entities';
export declare function buildVmField(field: Field, fieldUI: FieldUI, formValues: FormValues, formCompute: Compute, readOnly: boolean): VField;
