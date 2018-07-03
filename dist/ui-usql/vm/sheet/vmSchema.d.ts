import { VmSheet } from './vmSheet';
export declare class VmSchema extends VmSheet {
    protected view: ({ vm }: {
        vm: VmSchema;
    }) => JSX.Element;
}
