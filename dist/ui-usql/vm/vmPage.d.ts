import { ViewModel } from './viewModel';
export declare abstract class VmPage extends ViewModel {
    start(param?: any): Promise<void>;
    beforeStart(param?: any): Promise<void>;
    show(): Promise<void>;
    end(): Promise<void>;
}
