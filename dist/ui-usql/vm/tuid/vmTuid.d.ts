import { Tuid } from '../../entities';
import { VmEntity, EntityUI } from '../vmEntity';
import { VmApi } from '../vmApi';
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidView } from './vmView';
export interface TuidUI extends EntityUI {
    main: typeof VmTuidMain;
    edit: typeof VmTuidEdit;
    view: typeof VmTuidView;
}
export declare abstract class VmTuid extends VmEntity {
    entity: Tuid;
    constructor(vmApi: VmApi, tuid: Tuid, ui?: TuidUI);
    readonly icon: JSX.Element;
}
