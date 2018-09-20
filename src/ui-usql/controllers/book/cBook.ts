import { CEntity, EntityUI } from "../VM";
import { Book } from "../../entities";
import { VBookMain } from "./vBookMain";
import { entitiesRes } from '../../res';

export interface BookUI extends EntityUI {
    main: typeof VBookMain,
}

export class CBook extends CEntity<Book, BookUI> {
    get icon() {return entitiesRes['action'].icon}

    protected async internalStart() {
        await this.showVPage(this.VBookMain);
    }

    protected get VBookMain():typeof VBookMain {return VBookMain}
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }
    */
}
