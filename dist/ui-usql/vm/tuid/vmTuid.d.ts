import { Tuid } from '../../entities';
import { VmEntity } from '../vmEntity';
import { VmApi } from '../vmApi';
export declare abstract class VmTuid extends VmEntity {
    entity: Tuid;
    constructor(vmApi: VmApi, tuid: Tuid);
    readonly icon: JSX.Element;
}
