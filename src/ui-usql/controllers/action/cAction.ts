import { CEntity, EntityUI } from "../VM";
import { Action } from "../../entities";
import { VActionMain } from "./vActionMain";
import { entitiesRes } from '../../res';

export interface ActionUI extends EntityUI {
    //main: typeof VmActionMain,
}

export class CAction extends CEntity<Action, ActionUI> {
    get icon() {return entitiesRes['action'].icon}

    protected async internalStart() {
        await this.showVPage(this.VActionMain);
    }

    protected get VActionMain():typeof VActionMain {return VActionMain}

    async submit(values:any) {
        return this.entity.submit(values);
    }
}
