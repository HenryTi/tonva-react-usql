import { PageItems } from 'tonva-tools';
import { Query } from '../../entities';
import { VEntity } from '../CVEntity';
import { QueryUI, CQuerySelect } from './cQuery';
export declare class VQuerySelect extends VEntity<Query, QueryUI, CQuerySelect> {
    private row;
    PageItems: QueryPageItems;
    ownerId: number;
    open(param?: any): Promise<void>;
    onSearch: (key: string) => Promise<void>;
    renderRow: (item: any, index: number) => JSX.Element;
    private callOnSelected;
    clickRow: (item: any) => void;
    view: () => JSX.Element;
}
export declare class QueryPageItems extends PageItems<any> {
    private query;
    constructor(query: Query);
    protected load(): Promise<any[]>;
    protected setPageStart(item: any): void;
}
