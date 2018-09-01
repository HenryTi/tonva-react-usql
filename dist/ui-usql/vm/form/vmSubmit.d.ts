import { ViewModel } from "../viewModel";
import { VmForm } from './vmForm';
export declare class VmSubmit extends ViewModel {
    private vmForm;
    constructor(vmForm: VmForm);
    caption: string;
    className: string;
    protected view: () => JSX.Element;
}
