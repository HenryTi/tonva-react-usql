import { Book } from '../../entities';
import { VmEntity } from '../entity';
export declare abstract class VmBook extends VmEntity {
    entity: Book;
    readonly icon: JSX.Element;
}
