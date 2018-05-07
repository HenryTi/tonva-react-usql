import { Tuid } from '../entities';
import { TuidUIComponent, TuidInput } from './mapper';
import { EntityUI } from './entityUI';
export declare class TuidUI extends EntityUI<Tuid> {
    editPage?: TuidUIComponent;
    listPage?: TuidUIComponent;
    input?: TuidInput;
}
