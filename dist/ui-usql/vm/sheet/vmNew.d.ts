import { VmSheet } from './vmSheet';
import { VmForm } from '../vmForm';
export declare class VmSheetNew extends VmSheet {
    vmForm: VmForm;
    protected beforeStart(param?: any): Promise<void>;
    onSubmit: (values: any) => Promise<void>;
    protected view: ({ vm }: {
        vm: VmSheetNew;
    }) => JSX.Element;
}
