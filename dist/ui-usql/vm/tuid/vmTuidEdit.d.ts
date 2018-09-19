/// <reference types="react" />
import { VEntity } from '../VM';
import { CrTuidMain, TuidUI } from './crTuid';
import { Tuid } from '../../entities';
export declare type TypeVmTuidEdit = typeof VmTuidEdit;
export declare class VmTuidEdit extends VEntity<Tuid, TuidUI, CrTuidMain> {
    private vmForm;
    private id;
    showEntry(param?: any): Promise<void>;
    protected readonly editView: () => JSX.Element;
    protected next: () => Promise<void>;
    protected finish: () => void;
    protected resetForm(): void;
    protected onSubmit: () => Promise<void>;
}
