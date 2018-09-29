import { VEntity } from "../VM";
import { MapUI, CMap } from "./cMap";
import { Map } from "../../entities";
export declare class VInputValues extends VEntity<Map, MapUI, CMap> {
    showEntry(param?: any): Promise<void>;
    private view;
}
