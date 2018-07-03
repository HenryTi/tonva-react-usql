import { Query } from '../../entities';
import { VmEntity } from '../entity';
import { VmApi } from '../vmApi';
export declare abstract class VmQuery extends VmEntity {
    constructor(vmApi: VmApi, query: Query);
    entity: Query;
    readonly icon: JSX.Element;
}
