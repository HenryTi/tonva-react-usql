import { CEntity, EntityUI } from "../CVEntity";
import { Map, Tuid, BoxId, Field } from "../../entities";
import { VMapMain } from "./vMain";
export interface MapKey {
    content: (values: any, x?: any) => JSX.Element;
    valuesContent?: (values: any, x?: any) => JSX.Element;
    none?: (x: any) => string;
}
export interface MapUI extends EntityUI {
    CMap?: typeof CMap;
    keys?: MapKey[];
}
export declare class MapItem {
    parent: MapItem;
    tuid: Tuid;
    box: BoxId;
    isLeaf: boolean;
    keyIndex: number;
    children: MapItem[];
    values: any;
    constructor(parent: MapItem, tuid: Tuid, box: BoxId, keyIndex: number);
}
export declare class CMap extends CEntity<Map, MapUI> {
    items: MapItem[];
    keyFields: Field[];
    keyUIs: MapKey[];
    protected internalStart(): Promise<void>;
    private createItem;
    addItem(item: MapItem, row: any): MapItem;
    searchOnKey(keyField: Field, param: any): Promise<number>;
    addClick: (item: MapItem) => Promise<void>;
    removeClick: (item: MapItem) => Promise<void>;
    protected readonly VMapMain: typeof VMapMain;
}
