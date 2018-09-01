import { Field, Tuid } from '../../../entities';
import { VmField } from "./vmField";
import { FieldUI } from '../formUI';
import { VmForm, FieldInput } from '../vmForm';
export declare class VmTuidField extends VmField {
    protected vmForm: VmForm;
    protected input: FieldInput;
    protected tuid: Tuid;
    constructor(field: Field, fieldUI: FieldUI, vmForm: VmForm);
    onClick: () => Promise<void>;
    protected view: () => JSX.Element;
}
