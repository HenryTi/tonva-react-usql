import { VmQuery } from './vmQuery';
export declare class VmQueryMain extends VmQuery {
    protected buildValuesFromSchema(): void;
    submit(): Promise<void>;
    close: () => void;
    renderExtra(): void;
    resultPage: ({ vm }: {
        vm: VmQueryMain;
    }) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmQueryMain;
    }) => JSX.Element;
}
export declare const QueryPage: ({ vm }: {
    vm: VmQueryMain;
}) => JSX.Element;
