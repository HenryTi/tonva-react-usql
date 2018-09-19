/// <reference types="react" />
import { Book } from '../../entities';
import { VmEntity } from '../VM';
import { CrBook, BookUI } from './crBook';
export declare class VmBookMain extends VmEntity<Book, BookUI, CrBook> {
    showEntry(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
