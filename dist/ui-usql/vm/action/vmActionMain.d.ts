import { VmForm } from '../vmForm';
import { VmAction } from './vmAction';
export declare class VmActionMain extends VmAction {
    vmForm: VmForm;
    readonly icon: JSX.Element;
    protected beforeStart(): Promise<void>;
    onSubmit: () => Promise<void>;
    protected view: ({ vm }: {
        vm: VmActionMain;
    }) => JSX.Element;
}
