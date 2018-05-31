import { Tuid } from '../entities';
import { TuidUIComponent, TuidInput, TuidUISlaveComponent } from './mapper';
import { EntitySet } from './entitiesUI';
import { EntityUI } from './entityUI';
export declare class TuidUIListPage {
    page: TuidUIComponent;
    row?: TuidUIComponent;
}
export declare class TuidUI extends EntityUI<Tuid> {
    entitySet: EntitySet<Tuid, TuidUI>;
    editPage?: TuidUIComponent;
    listPage?: TuidUIListPage;
    input?: TuidInput;
    slaveInput?: TuidUISlaveComponent;
    autoLoadAllData?: boolean;
    private click(slave);
    private slaveField(slave);
}
