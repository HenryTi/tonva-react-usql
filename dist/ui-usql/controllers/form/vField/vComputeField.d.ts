/// <reference types="react" />
import { FieldUI } from '../../formUI';
import { VField } from './vField';
import { Field } from '../../../entities';
import { FormValues } from '../vForm';
export declare class VComputeField extends VField {
    constructor(field: Field, fieldUI: FieldUI, formValues: FormValues);
    protected view: () => JSX.Element;
}
