import * as React from 'react';
import { Tuid } from '../../entities';
import { PagedItems } from 'tonva-tools';
import { VmTuid } from './vmTuid';
export declare type TypeVmTuidList = typeof VmTuidList;
export declare class VmTuidList extends VmTuid {
    pagedItems: TuidPagedItems;
    protected init(): void;
    beforeStart(param?: any): Promise<void>;
    onSearch: (key: string) => Promise<void>;
    renderRow: (item: any, index: number) => JSX.Element;
    rowClick: (item: any) => Promise<void>;
    render(): JSX.Element;
}
export declare class TuidListPage extends React.Component<{
    vm: VmTuidList;
}> {
    render(): JSX.Element;
}
declare class TuidPagedItems extends PagedItems<any> {
    private tuid;
    constructor(tuid: Tuid);
    protected load(): Promise<any[]>;
    protected setPageStart(item: any): void;
}
export {};
