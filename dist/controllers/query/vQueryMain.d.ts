import { Query } from '../../entities';
import { VForm } from '../form';
import { VEntity } from '../CVEntity';
import { QueryUI, CQuery } from './cQuery';
export declare class VQueryMain extends VEntity<Query, QueryUI, CQuery> {
    protected vForm: VForm;
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
