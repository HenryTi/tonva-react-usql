import { StatelessComponent } from "react";
import { CrEntity, EntityUI } from "../VM";
import { Query } from "../../entities";
import { VmQueryMain } from "./vmQueryMain";
import { VmQuerySelect } from "./vmQuerySelect";
import { entitiesRes } from '../../res';

export interface QueryUI extends EntityUI {
    CrQuery?: typeof CrQuery;
    CrQuerySelect?: typeof CrQuerySelect;
    main?: typeof VmQueryMain;
    row?: StatelessComponent;
    queryRow?: StatelessComponent;
    selectRow?: StatelessComponent;
}

export abstract class CrQueryBase extends CrEntity<Query, QueryUI> {
    get icon() {return entitiesRes['query'].icon}
}

export class CrQuery extends CrQueryBase {
    protected async internalStart() {
        await this.showVm(this.VmQueryMain);
    }

    protected get VmQueryMain():typeof VmQueryMain {return this.ui && this.ui.main || VmQueryMain}
}

export class CrQuerySelect extends CrQueryBase {
    protected async internalStart(param?:any) {
        await this.showVm(this.VmQuerySelect, param);
    }

    protected get VmQuerySelect():typeof VmQuerySelect {return VmQuerySelect}
}
