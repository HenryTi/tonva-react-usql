import { Action } from '../../entities';
import { VmEntity } from '../vmEntity';
export declare class VmAction extends VmEntity {
    protected entity: Action;
    readonly icon: JSX.Element;
}
