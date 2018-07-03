import { VmTuid } from './vmTuid';
export declare type TypeVmTuidEdit = typeof VmTuidEdit;
export declare class VmTuidEdit extends VmTuid {
    id: number;
    loadId(id: number): Promise<void>;
    protected initValues(): void;
    protected next: () => Promise<void>;
    protected finish: () => void;
    protected resetForm(): void;
    submit(): Promise<void>;
    protected view: ({ vm }: {
        vm: VmTuidEdit;
    }) => JSX.Element;
}
