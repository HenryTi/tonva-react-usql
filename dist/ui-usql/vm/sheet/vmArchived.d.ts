import { VmSheet } from './vmSheet';
import { VmView } from './vmView';
export interface State {
    flows: any;
    data: any;
}
export declare class VmArchived extends VmSheet {
    brief: any;
    vmView: VmView;
    protected beforeStart(inBrief: any): Promise<void>;
    protected view: ({ vm }: {
        vm: VmArchived;
    }) => JSX.Element;
}
