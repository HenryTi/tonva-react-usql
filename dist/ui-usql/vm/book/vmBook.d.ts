import { Book } from '../../entities';
import { VmEntity } from '../vmEntity';
export declare abstract class VmBook extends VmEntity {
    entity: Book;
    readonly icon: JSX.Element;
}
