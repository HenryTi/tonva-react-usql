/// <reference types="react" />
import { Field, Tuid } from '../../../entities';
import { VField } from "./vField";
import { FieldUI } from '../../formUI';
import { VForm, FieldInput } from '../vForm';
export declare class VTuidField extends VField {
    protected vmForm: VForm;
    protected input: FieldInput;
    protected tuid: Tuid;
    constructor(field: Field, fieldUI: FieldUI, vmForm: VForm);
    onClick: () => Promise<void>;
    protected view: () => JSX.Element;
}
