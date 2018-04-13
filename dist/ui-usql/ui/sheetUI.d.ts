import { DetailFace, EntitiesUIComponent } from './mapper';
import { Sheet } from '../entities';
import { EntityUI } from './entityUI';
export declare class SheetUI extends EntityUI<Sheet> {
    detialFaces?: {
        [detail: string]: DetailFace;
    };
    mapDetail(name: string, schemaFields: any, detailRow: EntitiesUIComponent): any;
    mapMainDetails(detailViews?: {
        [name: string]: EntitiesUIComponent;
    }): any;
}
