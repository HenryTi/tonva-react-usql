import { VmQuery } from './vmQuery';
import { VmForm } from '../vmForm';
export declare class VmQueryMain extends VmQuery {
    vmForm: VmForm;
    beforeStart(param?: any): Promise<void>;
    onSubmit: () => Promise<void>;
    again: () => void;
    renderExtra(): void;
    protected view: ({ vm }: {
        vm: VmQueryMain;
    }) => JSX.Element;
}
export declare const QueryPage: ({ vm }: {
    vm: VmQueryMain;
}) => JSX.Element;
