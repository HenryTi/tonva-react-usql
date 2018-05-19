import { Tuid } from '../entities';
import { TuidUIComponent, TuidInput, TuidUISlaveComponent } from './mapper';
import { EntitySet } from './entitiesUI';
import { EntityUI } from './entityUI';
export declare class TuidUI extends EntityUI<Tuid> {
    entitySet: EntitySet<Tuid, TuidUI>;
    editPage?: TuidUIComponent;
    listPage?: TuidUIComponent;
    input?: TuidInput;
    slaveInput?: TuidUISlaveComponent;
    private click(slave);
    private slaveField(slave);
}
