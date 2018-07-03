import { VmSheet } from './vmSheet';
import { VmFieldsForm } from '../vmFieldsForm';
export declare class VmEdit extends VmSheet {
    vmFieldsForm: VmFieldsForm;
    load(): Promise<void>;
    showField1: () => void;
    showField2: () => void;
    showAll: () => void;
    protected view: ({ vm }: {
        vm: VmEdit;
    }) => JSX.Element;
}
