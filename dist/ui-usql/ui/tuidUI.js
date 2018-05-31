import * as React from 'react';
import { EntityUI } from './entityUI';
export class TuidUIListPage {
}
export class TuidUI extends EntityUI {
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
    click(slave) {
        alert(slave + ' ' + 'test');
    }
    slaveField(slave) {
        return React.createElement("div", { onClick: () => this.click(slave) },
            "\u67E5\u770B",
            slave);
    }
}
//# sourceMappingURL=tuidUI.js.map