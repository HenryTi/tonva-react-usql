import { History } from '../entities';
import { EntityUIO } from './entityUI';
export declare class HistoryUI extends EntityUIO<History> {
    mapKeys(): any[];
    listRow?: new (props: {
        item: any;
        index: number;
    }) => React.Component<any>;
}
