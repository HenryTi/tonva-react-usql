import { History } from '../entities';
import { EntityUI } from './entityUI';
export declare class HistoryUI extends EntityUI<History> {
    mapKeys(): any[];
    listRow?: new (props: {
        item: any;
        index: number;
    }) => React.Component<any>;
}
