import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity';
import { VmApi } from '../vmApi';

export abstract class VmQuery extends VmEntity {
    constructor(vmApi:VmApi, query:Query) {
        super(vmApi, query);
    }

    entity: Query;

    get icon() {return vmLinkIcon('text-warning', 'search')}
}
