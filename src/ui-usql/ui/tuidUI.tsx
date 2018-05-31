import * as React from 'react';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {TuidUIComponent, TuidInputComponent, TuidInput, TuidUISlaveComponent} from './mapper';
import {EntitiesUI, EntitySet} from './entitiesUI';
import {EntityUI} from './entityUI';

export class TuidUIListPage {
    page: TuidUIComponent;
    row?:TuidUIComponent
}
export class TuidUI extends EntityUI<Tuid> {
    entitySet: EntitySet<Tuid, TuidUI>;

    editPage?: TuidUIComponent;
    listPage?: TuidUIListPage;
    input?: TuidInput;

    slaveInput?: TuidUISlaveComponent;
/*
    mapMain(): any[] {
        let ret =  super.mapMain();
        let {slaves} = this.entity.schema;
        if (slaves !== undefined) {
            for (let s of slaves) {
                ret.push(this.slaveField(s));
            }
        }
        return ret;
    }
*/


    private click(slave:string) {
        alert(slave + ' ' + 'test');
    }

    private slaveField(slave:string) {
        return <div onClick={() => this.click(slave)}>查看{slave}</div>;
    }
}
