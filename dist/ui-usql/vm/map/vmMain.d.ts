/// <reference types="react" />
import { Map } from '../../entities';
import { VEntity } from '../VM';
import { CrMap, MapItem, MapUI } from './crMap';
export declare class VmMapMain extends VEntity<Map, MapUI, CrMap> {
    private mapKey;
    showEntry(param?: any): Promise<void>;
    itemRender: (item: MapItem, index: number) => JSX.Element;
    private ItemRow;
    protected readonly view: () => JSX.Element;
}
