import { Book } from '../../entities';
import { VmEntity } from '../VM';
import { CrBook, BookUI } from './crBook';
export declare class VmBookMain extends VmEntity<Book, BookUI> {
    protected coordinator: CrBook;
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
