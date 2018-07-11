import { IReactionPublic } from 'mobx';
import { IAutorunOptions } from 'mobx/lib/api/autorun';
import { ViewModel } from './viewModel';
export declare abstract class VmPage extends ViewModel {
    private reactionDisposers;
    private wsId;
    regAutorun(view: (r: IReactionPublic) => any, opts?: IAutorunOptions): void;
    start(param?: any): Promise<void>;
    protected beforeStart(param?: any): Promise<void>;
    pushPage(page: JSX.Element): void;
    popPage(level?: number): void;
    replacePage(page: JSX.Element): void;
    show(): Promise<void>;
    private disposer;
    end(): Promise<void>;
    protected onReceive(msg: any): Promise<void>;
}
