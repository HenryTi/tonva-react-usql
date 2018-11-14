import { Book } from '../../entities';
import { VEntity } from '../VM';
import { CBook, BookUI } from './cBook';
export declare class VBookMain extends VEntity<Book, BookUI, CBook> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
