import { VmTuid } from './vmTuid';
import { VmForm } from '../vmForm';
export declare type TypeVmTuidEdit = typeof VmTuidEdit;
export declare class VmTuidEdit extends VmTuid {
    vmForm: VmForm;
    id: number;
    protected beforeStart(param?: any): Promise<void>;
    loadId(id: number): Promise<void>;
    protected next: () => Promise<void>;
    protected finish: () => void;
    protected resetForm(): void;
    protected onSubmit: () => Promise<void>;
    protected view: ({ vm }: {
        vm: VmTuidEdit;
    }) => JSX.Element;
}
