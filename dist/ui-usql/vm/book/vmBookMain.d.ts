/// <reference types="react" />
import { Book } from '../../entities';
import { VEntity } from '../VM';
import { CrBook, BookUI } from './crBook';
export declare class VmBookMain extends VEntity<Book, BookUI, CrBook> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
