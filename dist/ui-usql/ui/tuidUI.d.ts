import { Tuid } from '../entities';
import { TuidUIComponent, TuidInput, TuidUISlaveComponent, TuidUIBindSlaveComponent } from './mapper';
import { EntitySet } from './entitiesUI';
import { EntityUI } from './entityUI';
import { BookUI } from './bookUI';
import { ActionUI } from './actionUI';
import { QueryUI } from './queryUI';
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
    tuid: TuidUI;
    book: BookUI;
    page: QueryUI;
    pageSlave: QueryUI;
    all: QueryUI;
    add: ActionUI;
    del: ActionUI;
}
