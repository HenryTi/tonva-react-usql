import { VmSheet } from './vmSheet';
import { VmForm } from '../vmForm';
export declare class VmSheetEdit extends VmSheet {
    vmForm: VmForm;
    protected beforeStart(param?: any): Promise<void>;
    protected view: ({ vm }: {
        vm: VmSheetEdit;
    }) => JSX.Element;
}
