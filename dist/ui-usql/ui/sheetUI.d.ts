import { DetailFace, SheetUIComponent, SheetViewComponent, EntitiesUIComponent } from './mapper';
import { Sheet } from '../entities';
import { EntityUI } from './entityUI';
export declare class SheetUI extends EntityUI<Sheet> {
    view: SheetViewComponent;
    archivedList?: SheetUIComponent;
    archivedSheet?: SheetUIComponent;
    sheetAction?: SheetUIComponent;
    sheetNew?: SheetUIComponent;
    stateSheetList?: SheetUIComponent;
    detialFaces?: {
        [detail: string]: DetailFace;
    };
    mapDetail(name: string, schemaFields: any, detailRow: EntitiesUIComponent): any;
    mapMainDetails(detailViews?: {
        [name: string]: EntitiesUIComponent;
    }): any;
}
