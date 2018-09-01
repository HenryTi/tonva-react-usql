import { Map } from '../../entities';
import { VmEntity } from '../VM';
import { CrMap, MapItem, MapUI } from './crMap';
export declare class VmMapMain extends VmEntity<Map, MapUI> {
    protected coordinator: CrMap;
    private mapKey;
    showEntry(param?: any): Promise<void>;
    itemRender: (item: MapItem, index: number) => JSX.Element;
    private ItemRow;
    protected readonly view: () => JSX.Element;
}
