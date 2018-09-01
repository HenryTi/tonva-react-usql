import { CrEntity, EntityUI } from "../VM";
import { Book } from "../../entities";
import { VmBookMain } from "./vmBookMain";
import { entitiesRes } from '../../res';

export interface BookUI extends EntityUI {
    main: typeof VmBookMain,
}

export class CrBook extends CrEntity<Book, BookUI> {
    get icon() {return entitiesRes['action'].icon}

    protected async internalStart() {
        await this.showVm(this.VmBookMain);
    }

    protected get VmBookMain():typeof VmBookMain {return VmBookMain}
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }
    */
}
