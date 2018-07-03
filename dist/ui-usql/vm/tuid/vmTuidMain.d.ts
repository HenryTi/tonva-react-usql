import { VmTuid } from './vmTuid';
import { VmEntityLinkBase } from '../link';
export declare class VmTuidMain extends VmTuid {
    onNew: () => Promise<void>;
    onList: () => Promise<void>;
    protected view: ({ vm }: {
        vm: VmTuidMain;
    }) => JSX.Element;
}
export declare class LinkButton<T extends VmTuid> extends VmEntityLinkBase<T> {
    constructor(vmEntity: T, caption: string);
    caption: string;
}
