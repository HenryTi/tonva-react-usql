import { VmSheet } from './vmSheet';
import { VmForm } from '../vmForm';
export declare class VmSheetNew extends VmSheet {
    vmForm: VmForm;
    beforeStart(param?: any): Promise<void>;
    protected view: ({ vm }: {
        vm: VmSheetNew;
    }) => JSX.Element;
}
