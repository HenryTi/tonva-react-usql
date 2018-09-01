import { FieldUI } from '../formUI';
import { FormValues } from '..';
import { VmField } from './vmField';
import { Field } from '../../../entities';
export * from './vmField';
export declare function buildVmField(field: Field, fieldUI: FieldUI, formValues: FormValues, readOnly: boolean): VmField;
