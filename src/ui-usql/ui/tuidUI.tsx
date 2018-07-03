import * as React from 'react';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {TuidUIComponent, TuidInputComponent, TuidInput, 
    TuidUISlaveComponent, TuidUIBindSlaveComponent} from './mapper';
import {EntitiesUI, EntitySet} from './entitiesUI';
import {EntityUI} from './entityUI';
import {BookUI} from './bookUI';
import {ActionUI} from './actionUI';
import {QueryUI} from './queryUI';

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
    bindSlaveInput?: TuidUIBindSlaveComponent;

    private _slaves: {[name:string]: SlaveUI};
    get slaves(): {[name:string]: SlaveUI} {
        if (this._slaves !== undefined) return this._slaves;
        if (this._slaves === null) return;
        return this._slaves = this.buildSlaves();
    }

    private buildSlaves(): {[name:string]: SlaveUI} {
        let {slaves} = this.entity;
        if (slaves === undefined) return null;
        let slavesUI:{[name:string]: SlaveUI} = {};
        let {tuid:tuidColl, book:bookColl, query:queryColl, action:actionColl} = this.entitiesUI;
        for (let i in slaves) {
            let {tuid, book, page, pageSlave, all, add, del} = slaves[i];
            slavesUI[i] = {
                name: book.name,
                tuid: tuidColl.coll[tuid.name],
                book: bookColl.coll[book.name],
                page: queryColl.coll[page.name],
                pageSlave: queryColl.coll[pageSlave.name],
                all: queryColl.coll[all.name],
                add: actionColl.coll[add.name],
                del: actionColl.coll[del.name],
            };
        }
        return slavesUI;
    }
/*
    mapMain(): any[] {
        let ret =  super.mapMain();
        let {bindSlaves} = this.entity.schema;
        if (bindSlaves !== undefined) {
            for (let s of bindSlaves) {
                ret.push(this.slaveField(s));
            }
        }
        return ret;
    }
*/
    private click(slave:string) {
        alert(slave + ' ' + 'test');
    }

    private slaveField(bindSlave:string) {
        return <div onClick={() => this.click(bindSlave)}>查看{bindSlave}</div>;
    }
}

export interface SlaveUI {
    name: string;
    tuid: TuidUI,
    book: BookUI;
    page: QueryUI;
    pageSlave: QueryUI;
    all: QueryUI;
    add: ActionUI;
    del: ActionUI;
}
