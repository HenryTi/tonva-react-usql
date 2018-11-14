import { Map } from '../../entities';
import { VEntity } from '../VM';
import { CMap, MapItem, MapUI } from './cMap';
export declare class VMapMain extends VEntity<Map, MapUI, CMap> {
    showEntry(param?: any): Promise<void>;
    itemRender: (item: MapItem, index: number) => JSX.Element;
    private ItemRow;
    protected readonly view: () => JSX.Element;
}
