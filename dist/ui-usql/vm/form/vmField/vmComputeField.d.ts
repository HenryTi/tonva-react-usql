/// <reference types="react" />
import { FieldUI } from '../../formUI';
import { VmField } from './vmField';
import { Field } from '../../../entities';
import { FormValues } from '../vmForm';
export declare class VmComputeField extends VmField {
    constructor(field: Field, fieldUI: FieldUI, formValues: FormValues);
    protected view: () => JSX.Element;
}
