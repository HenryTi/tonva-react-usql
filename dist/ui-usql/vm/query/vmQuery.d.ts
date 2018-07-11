import { Query } from '../../entities';
import { VmEntity } from '../vmEntity';
import { VmApi } from '../vmApi';
export declare abstract class VmQuery extends VmEntity {
    entity: Query;
    constructor(vmApi: VmApi, query: Query);
    readonly icon: JSX.Element;
}
