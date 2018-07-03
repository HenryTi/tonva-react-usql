import * as React from 'react';
import { Tuid, Book, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmBook } from './vmBook';

export class VmBookMain extends VmBook {
    renderView() {
        return <Page header={this.caption}>
            Book
        </Page>
    }
}
