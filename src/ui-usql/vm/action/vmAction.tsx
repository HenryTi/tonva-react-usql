import * as React from 'react';
import { observer } from 'mobx-react';
import { Tuid, Action, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { Page, nav, } from 'tonva-tools';
import { VmForm } from '../vmForm';

export class VmAction extends VmEntity {
    protected entity: Action;

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}
}
