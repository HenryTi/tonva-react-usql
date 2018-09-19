import React from 'react';
import { CEntity, EntityUI } from "../VM";
import { Map, Tuid, IdBox, Field } from "../../entities";
import { VMapMain } from "./vMain";
export interface MapKey {
    content: React.StatelessComponent;
    none?: () => string;
}
export interface MapUI extends EntityUI {
    CrMap?: typeof CMap;
    keys?: MapKey[];
}
export declare class MapItem {
    parent: MapItem;
    tuid: Tuid;
    box: IdBox;
    isLeaf: boolean;
    keyIndex: number;
    children: MapItem[];
    values: any;
    constructor(parent: MapItem, tuid: Tuid, box: IdBox, keyIndex: number);
}
export declare class CMap extends CEntity<Map, MapUI> {
    items: MapItem[];
    keyFields: Field[];
    keyUIs: MapKey[];
    readonly icon: JSX.Element;
    protected internalStart(): Promise<void>;
    private createItem;
    addItem(item: MapItem, row: any): MapItem;
    searchOnKey(keyField: Field, param: any): Promise<number>;
    addClick: (item: MapItem) => Promise<void>;
    removeClick: (item: MapItem) => Promise<void>;
    protected readonly VmMapMain: typeof VMapMain;
}
