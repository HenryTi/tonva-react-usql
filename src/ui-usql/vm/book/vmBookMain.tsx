import * as React from 'react';
import { TuidMain, Book, Entity } from '../../entities';
import { Page } from 'tonva-tools';
import { VmEntity } from '../VM';
import { CrBook, BookUI } from './crBook';

export class VmBookMain extends VmEntity<Book, BookUI> {
    protected coordinator: CrBook;

    async showEntry(param?:any):Promise<void> {
        this.open(this.view);
    }

    protected view = () => <Page header={this.label}>
        Book
    </Page>;
}
