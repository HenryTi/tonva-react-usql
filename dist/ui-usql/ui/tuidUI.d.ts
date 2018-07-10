import { Tuid } from '../entities';
import { TuidUIComponent, TuidInput, TuidUISlaveComponent, TuidUIBindSlaveComponent } from './mapper';
import { EntitySet } from './entitiesUI';
import { EntityUIO } from './entityUI';
import { BookUI } from './bookUI';
import { ActionUIO } from './actionUI';
import { QueryUI } from './queryUI';
export declare class TuidUIListPage {
    page: TuidUIComponent;
    row?: TuidUIComponent;
}
export declare class TuidUIO extends EntityUIO<Tuid> {
    entitySet: EntitySet<Tuid, TuidUIO>;
    editPage?: TuidUIComponent;
    listPage?: TuidUIListPage;
    input?: TuidInput;
    slaveInput?: TuidUISlaveComponent;
    bindSlaveInput?: TuidUIBindSlaveComponent;
    private _slaves;
    readonly slaves: {
        [name: string]: SlaveUI;
    };
    private buildSlaves;
    private click;
    private slaveField;
}
export interface SlaveUI {
    name: string;
    tuid: TuidUIO;
    book: BookUI;
    page: QueryUI;
    pageSlave: QueryUI;
    all: QueryUI;
    add: ActionUIO;
    del: ActionUIO;
}
