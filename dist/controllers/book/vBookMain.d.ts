import { Book } from '../../entities';
import { VEntity } from '../CVEntity';
import { CBook, BookUI } from './cBook';
export declare class VBookMain extends VEntity<Book, BookUI, CBook> {
    open(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
