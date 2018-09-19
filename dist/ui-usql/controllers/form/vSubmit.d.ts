/// <reference types="react" />
import { ViewModel } from "../viewModel";
import { VForm } from './vForm';
export declare class VSubmit extends ViewModel {
    private vmForm;
    constructor(vmForm: VForm);
    caption: string;
    className: string;
    protected view: () => JSX.Element;
}
