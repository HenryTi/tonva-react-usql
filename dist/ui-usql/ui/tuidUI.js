import * as React from 'react';
import { EntityUIO } from './entityUI';
export class TuidUIListPage {
}
export class TuidUIO extends EntityUIO {
    get slaves() {
        if (this._slaves !== undefined)
            return this._slaves;
        if (this._slaves === null)
            return;
        return this._slaves = this.buildSlaves();
    }
    buildSlaves() {
        let { slaves } = this.entity;
        if (slaves === undefined)
            return null;
        let slavesUI = {};
        let { tuid: tuidColl, book: bookColl, query: queryColl, action: actionColl } = this.entitiesUI;
        for (let i in slaves) {
            let { tuid, book, page, pageSlave, all, add, del } = slaves[i];
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
    click(slave) {
        alert(slave + ' ' + 'test');
    }
    slaveField(bindSlave) {
        return React.createElement("div", { onClick: () => this.click(bindSlave) },
            "\u67E5\u770B",
            bindSlave);
    }
}
//# sourceMappingURL=tuidUI.js.map