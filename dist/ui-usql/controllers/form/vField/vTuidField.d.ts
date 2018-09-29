/// <reference types="react" />
import { Field, Tuid } from '../../../entities';
import { VField } from "./vField";
import { FieldUI } from '../../formUI';
import { VForm, FieldInput } from '../vForm';
import { FieldRes } from '../vBand';
export declare class VTuidField extends VField {
    protected vForm: VForm;
    protected input: FieldInput;
    protected tuid: Tuid;
    constructor(field: Field, fieldUI: FieldUI, fieldRes: FieldRes, vForm: VForm);
    onClick: () => Promise<void>;
    protected view: () => JSX.Element;
}
