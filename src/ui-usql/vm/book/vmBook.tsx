import * as React from 'react';
import { Tuid, Book, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';

export abstract class VmBook extends VmEntity {
    entity: Book;

    get icon() {return vmLinkIcon('text-muted', 'book')}
}
