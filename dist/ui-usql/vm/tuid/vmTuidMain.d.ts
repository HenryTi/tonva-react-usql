import { VmEntity } from '../vmEntity';
import { VmTuid } from './vmTuid';
import { VmEntityLink } from '../link';
export declare class VmTuidMain extends VmTuid {
    onNew: () => Promise<void>;
    onList: () => Promise<void>;
    protected view: ({ vm }: {
        vm: VmTuidMain;
    }) => JSX.Element;
}
export declare class LinkButton extends VmEntityLink {
    constructor(vmEntity: VmEntity, caption: string);
    caption: string;
    protected view: ({ vm }: {
        vm: LinkButton;
    }) => JSX.Element;
}
