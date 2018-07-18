import * as React from 'react';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidView } from './vmView';

export interface TuidUI extends EntityUI {
    main: typeof VmTuidMain;
    edit: typeof VmTuidEdit;
    view: typeof VmTuidView;
}

export abstract class VmTuid extends VmEntity {
    entity: Tuid;

    constructor(vmApi: VmApi, tuid: Tuid, ui?:TuidUI) {
        super(vmApi, tuid, ui);
    }

    get icon() {return vmLinkIcon('text-info', 'list-alt')}
}
