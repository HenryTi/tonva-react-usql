import { VForm } from '../form';
import { VEntity } from '../VM';
import { TuidMain } from '../../entities';
import { TuidUI, CTuidMain } from './cTuid';
export declare type TypeVTuidView = typeof VTuidView;
export declare class VTuidView extends VEntity<TuidMain, TuidUI, CTuidMain> {
    vmForm: VForm;
    id: number;
    showEntry(param?: any): Promise<void>;
    loadId(id: number): Promise<void>;
    protected next: () => Promise<void>;
    protected finish: () => void;
    protected resetForm(): void;
    protected onSubmit: () => Promise<void>;
    protected view: any;
}
