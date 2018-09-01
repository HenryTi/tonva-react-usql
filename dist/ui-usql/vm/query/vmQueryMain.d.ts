import { Query } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { QueryUI } from './crQuery';
export declare class VmQueryMain extends VmEntity<Query, QueryUI> {
    protected vmForm: VmForm;
    private row;
    showEntry(param?: any): Promise<void>;
    onSubmit: () => Promise<void>;
    again: () => void;
    renderExtra(): void;
    renderRow: (item: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
    protected pageResult: () => JSX.Element;
    protected queryResult: (result: any) => JSX.Element;
}
