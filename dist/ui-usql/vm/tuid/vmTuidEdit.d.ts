import { VmEntity } from '../VM';
import { CrTuidMain, TuidUI } from './crTuid';
import { Tuid } from '../../entities';
export declare type TypeVmTuidEdit = typeof VmTuidEdit;
export declare class VmTuidEdit extends VmEntity<Tuid, TuidUI> {
    private vmForm;
    private id;
    protected coordinator: CrTuidMain;
    showEntry(param?: any): Promise<void>;
    protected readonly editView: () => JSX.Element;
    protected next: () => Promise<void>;
    protected finish: () => void;
    protected resetForm(): void;
    protected onSubmit: () => Promise<void>;
}
