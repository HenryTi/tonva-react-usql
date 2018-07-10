import * as React from 'react';
import { Tuid, Book, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmBook } from './vmBook';

export class VmBookMain extends VmBook {
    render() {
        return <Page header={this.label}>
            Book
        </Page>
    }
}
