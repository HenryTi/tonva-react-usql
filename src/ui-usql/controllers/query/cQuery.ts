import { StatelessComponent } from "react";
import { CEntity, EntityUI } from "../VM";
import { Query } from "../../entities";
import { VQueryMain } from "./vQueryMain";
import { VQuerySelect } from "./vQuerySelect";
import { entitiesRes } from '../../res';

export interface QueryUI extends EntityUI {
    CrQuery?: typeof CQuery;
    CrQuerySelect?: typeof CQuerySelect;
    main?: typeof VQueryMain;
    row?: StatelessComponent;
    queryRow?: StatelessComponent;
    selectRow?: StatelessComponent;
}

export abstract class CQueryBase extends CEntity<Query, QueryUI> {
    get icon() {return entitiesRes['query'].icon}
}

export class CQuery extends CQueryBase {
    protected async internalStart() {
        await this.showVPage(this.VmQueryMain);
    }

    protected get VmQueryMain():typeof VQueryMain {return this.ui && this.ui.main || VQueryMain}
}

export class CQuerySelect extends CQueryBase {
    protected async internalStart(param?:any) {
        await this.showVPage(this.VmQuerySelect, param);
    }

    protected get VmQuerySelect():typeof VQuerySelect {return VQuerySelect}
}
