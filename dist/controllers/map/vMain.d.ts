import { Map } from '../../entities';
import { VEntity } from '../CVEntity';
import { CMap, MapItem, MapUI } from './cMap';
export declare class VMapMain extends VEntity<Map, MapUI, CMap> {
    private isFrom;
    open(param?: any): Promise<void>;
    itemRender: (item: MapItem, index: number) => JSX.Element;
    private ItemRow;
    protected readonly view: () => JSX.Element;
}
